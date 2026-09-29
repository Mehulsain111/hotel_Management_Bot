import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";
export const revalidate = 0;

/**
 * Server-Side Proxy Route for live n8n AI Agent (/api/chat)
 * - Target: https://marryjeen.app.n8n.cloud/webhook/hotel-booking-agent
 * - Exact Payload: { "session_id": "...", "message": "..." } with random UUID generation
 * - Secure Server-Side Auth: Injects process.env.N8N_AUTH_KEY without exposing it to client
 * - 60s Extended Timeout: Catches AbortError and returns clean 504 Gateway Timeout JSON
 * - Exact JSON Passthrough: Returns exact JSON received from n8n
 */
export async function POST(req) {
  const controller = new AbortController();
  // 60,000ms (60s) timeout for database queries and LLM reasoning
  const timeoutId = setTimeout(() => controller.abort(), 60000);

  try {
    const body = await req.json().catch(() => ({}));
    const message = body.message || "";

    // Generate a random UUID for session_id if one is not provided by the client
    const sessionId =
      body.session_id && String(body.session_id).trim().length >= 8
        ? String(body.session_id).trim()
        : crypto.randomUUID();

    // Exact payload required by the n8n webhook
    const payload = {
      session_id: sessionId,
      message: message,
    };

    // Live n8n webhook URL
    const n8nWebhookUrl =
      process.env.N8N_WEBHOOK_URL ||
      "https://marryjeen.app.n8n.cloud/webhook/hotel-booking-agent";

    // Server-side authentication key
    const authKey = process.env.N8N_AUTH_KEY || "hotel123";

    // Securely inject authentication headers
    const headers = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authKey}`,
      "X-N8N-API-Key": authKey,
      "Mypass": authKey,
      "X-Api-Key": authKey,
    };

    // Forward request from server to n8n webhook
    const n8nRes = await fetch(n8nWebhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const responseText = await n8nRes.text();

    let parsedJson;
    try {
      parsedJson = JSON.parse(responseText);
    } catch {
      // In case n8n returned plain text, normalize to the expected schema
      parsedJson = {
        success: n8nRes.ok,
        reply: responseText,
        booking_data: null,
        qr_url: "",
      };
    }

    // Return the exact JSON response received from n8n back to the client
    return NextResponse.json(parsedJson, {
      status: n8nRes.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    clearTimeout(timeoutId);

    // Specifically catch AbortError when the 60s timeout is reached
    if (error.name === "AbortError" || error.code === 20) {
      console.error("[Chat API Proxy] 60-second timeout exceeded for n8n request");
      return NextResponse.json(
        {
          success: false,
          error: "Gateway Timeout",
          reply:
            "The AI agent took longer than 60 seconds to process database queries and formulate a response. Please try again.",
          booking_data: null,
          qr_url: "",
        },
        { status: 504 }
      );
    }

    // Network or server error fallback
    console.error("[Chat API Proxy] Request error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Internal Server Error",
        reply: error.message || "Failed to communicate with n8n backend.",
        booking_data: null,
        qr_url: "",
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization, X-N8N-API-Key, X-Api-Key, Mypass",
    },
  });
}

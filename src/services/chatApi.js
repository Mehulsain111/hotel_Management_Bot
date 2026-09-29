/**
 * Chat API Service for Hotel Management Demo - Simple AI Chatbot
 * Sends clean JSON payload: { "message": userText, "session_id": "123" }
 * Detects and attaches rich interactive UI cards (Rooms, Tables, Events, QR Code).
 */

export const DEFAULT_SESSION_ID = "123";

/**
 * Helper to detect which card to render based on backend response & user intent
 */
export function detectCardType(data, userText = "") {
  // 1. Explicit card indicator in backend JSON
  if (data?.card_type) return data.card_type.toLowerCase();
  if (data?.card) return data.card.toLowerCase();

  // 2. Structured objects
  if (data?.payment?.qr_url || data?.qr_url || data?.upi_string) return "qr";
  if (data?.booking) return "room";

  const combinedText = `${userText} ${data?.reply || data?.message || data?.text || ""}`.toLowerCase();

  // 3. QR / Payment
  if (
    combinedText.includes("qr") ||
    combinedText.includes("payment") ||
    combinedText.includes("upi") ||
    combinedText.includes("settle") ||
    combinedText.includes("invoice") ||
    combinedText.includes("pay now")
  ) {
    return "qr";
  }

  // 4. Tables / Dining
  if (
    combinedText.includes("table") ||
    combinedText.includes("dining") ||
    combinedText.includes("restaurant") ||
    combinedText.includes("dinner") ||
    combinedText.includes("lunch") ||
    combinedText.includes("michelin") ||
    combinedText.includes("cabana")
  ) {
    return "table";
  }

  // 5. Events / Banquet
  if (
    combinedText.includes("event") ||
    combinedText.includes("banquet") ||
    combinedText.includes("wedding") ||
    combinedText.includes("anniversary") ||
    combinedText.includes("conference") ||
    combinedText.includes("party") ||
    combinedText.includes("gala")
  ) {
    return "event";
  }

  // 6. Rooms / Suites
  if (
    combinedText.includes("room") ||
    combinedText.includes("suite") ||
    combinedText.includes("penthouse") ||
    combinedText.includes("stay") ||
    combinedText.includes("book") ||
    combinedText.includes("villa")
  ) {
    return "room";
  }

  return null;
}

/**
 * Sends message to backend proxy (/api/chat) which forwards to n8n webhook
 * Payload: { "message": "...", "session_id": "123" }
 */
export async function sendMessageToBackend(userText, sessionId = DEFAULT_SESSION_ID) {
  const payload = {
    message: userText,
    session_id: sessionId || DEFAULT_SESSION_ID,
  };

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => null);

    if (!data) {
      return {
        text: "I am pleased to assist you with our luxury hotel suites, rooftop dining, or gala banquets. Please select an option below.",
        cardType: detectCardType({}, userText),
      };
    }

    const replyText =
      data.reply ||
      data.message ||
      data.text ||
      (typeof data === "string" ? data : "");

    const cardType = detectCardType(data, userText);

    return {
      text: replyText || "Here are the details you requested:",
      cardType,
      cardData: data.cardData || data.booking || data.payment || null,
      raw: data,
    };
  } catch (error) {
    // Graceful concierge fallback on offline/network errors
    const cardType = detectCardType({}, userText);
    return {
      text: "Welcome to Aura Grand Palace. Here are the curated options available for you:",
      cardType: cardType || "room",
    };
  }
}

"use client";

import React, { useState } from "react";
import { QrCode, ShieldCheck, CheckCircle2, Loader2, Sparkles, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

export default function QRCodeWidget({ qrUrl, amount = "₹13,500", shortRef = "AURA-PAY" }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const handleVerify = () => {
    if (isProcessing || isPaid) return;
    setIsProcessing(true);

    try {
      confetti({
        particleCount: 65,
        spread: 75,
        origin: { y: 0.7 },
        colors: ["#d4af37", "#f5d061", "#ffffff", "#10b981"],
      });
    } catch (e) {}

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 700);
  };

  if (!qrUrl) return null;

  return (
    <div className="w-full max-w-sm mt-3 rounded-2xl bg-midnight-950/90 border border-gold-500/40 p-4 shadow-glass-card backdrop-blur-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2.5">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-amber-500/20 to-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">
              Instant UPI Payment
            </h4>
            <p className="text-[10px] text-gray-400">Scan &amp; Settle Booking</p>
          </div>
        </div>

        <span
          className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full font-semibold flex items-center space-x-1 ${
            isPaid
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "bg-gold-500/15 text-gold-300 border border-gold-500/30"
          }`}
        >
          {isPaid ? (
            <>
              <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
              <span>Paid</span>
            </>
          ) : (
            <>
              <Sparkles className="w-2.5 h-2.5 text-gold-400" />
              <span>UPI Verified</span>
            </>
          )}
        </span>
      </div>

      {/* QR Code Container */}
      <div className="mt-3 flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
        <div className="p-2.5 rounded-xl bg-white shadow-xl relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl}
            alt="Payment QR Code"
            width={160}
            height={160}
            className="w-40 h-40 object-contain rounded-lg transition-transform group-hover:scale-105 duration-200"
          />
        </div>

        <p className="text-[10px] text-gray-400 mt-2 text-center">
          Open any UPI app (Google Pay, PhonePe, Paytm) and scan
        </p>
      </div>

      {/* Mock Button: "Payment Verified" */}
      <div className="mt-3">
        <button
          type="button"
          onClick={handleVerify}
          disabled={isPaid || isProcessing}
          className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs shadow-gold-glow flex items-center justify-center space-x-2 transition-all active:scale-[0.99] cursor-pointer ${
            isPaid
              ? "bg-emerald-600 text-white cursor-default"
              : "bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-midnight-950 hover:brightness-110"
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Verifying Settlement...</span>
            </>
          ) : isPaid ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Payment Verified ✓</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>Payment Verified (Simulate)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

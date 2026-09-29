"use client";

import React, { useState } from "react";
import { CreditCard, Lock, Sparkles, Loader2, ShieldCheck, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

export default function PaymentQRCodeCard({ data, onAction }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const {
    itemTitle = "Luxury Hotel Reservation",
    itemType = "Room Booking",
    subtotal = 1450,
    taxes = 174,
    total = 1624,
    bookingReference = "HOLD-2026",
    qr_data = null,
  } = data || {};

  const qrUrl =
    qr_data ||
    `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=AURA_PAY_${bookingReference}_AMT_${total}&color=f5d061&bgcolor=070d1e`;

  const handleSimulatePayment = () => {
    if (isProcessing || isPaid) return;

    setIsProcessing(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#d4af37", "#f5d061", "#ffffff"],
      });
    } catch (e) {}

    // Dispatch { intent: "simulate_payment", data: { ... } } to backend webhook
    if (onAction) {
      onAction("simulate_payment", {
        booking_reference: bookingReference,
        item_title: itemTitle,
        item_type: itemType,
        subtotal: subtotal,
        taxes: taxes,
        total: total,
        payment_method: "QR_SIMULATION",
        status: "settled",
      });
    }

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
    }, 800);
  };

  return (
    <div className="w-full max-w-md my-2 rounded-2xl bg-midnight-900/95 border border-gold-500/40 p-4 shadow-glass-card backdrop-blur-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400">
            <CreditCard className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              QR Code Payment Component
            </h4>
            <p className="text-[11px] text-gray-400">Payload: intent = &quot;simulate_payment&quot;</p>
          </div>
        </div>
        <div className="flex items-center space-x-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
          <Lock className="w-3 h-3" />
          <span>Encrypted</span>
        </div>
      </div>

      {/* Item Summary */}
      <div className="mt-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-gold-400 font-semibold block">
            {itemType}
          </span>
          <h5 className="text-xs font-semibold text-white truncate max-w-[210px]">
            {itemTitle}
          </h5>
        </div>
        <div className="text-right">
          <span className="text-[10px] text-gray-400 block">Ref #</span>
          <span className="text-xs font-mono font-bold text-gray-300">
            {bookingReference}
          </span>
        </div>
      </div>

      {/* QR Code Presentation */}
      <div className="mt-3.5 flex flex-col items-center justify-center p-3 rounded-xl bg-midnight-950/70 border border-gold-500/25">
        <div className="relative p-2 rounded-xl bg-midnight-900 border border-gold-500/40 shadow-gold-glow">
          <img
            src={qrUrl}
            alt="Payment QR Code"
            className="w-36 h-36 rounded-lg object-contain"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-midnight-950 border border-gold-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-4 h-4 text-gold-400" />
            </div>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 mt-2 text-center">
          Scan QR with your mobile payment or banking application
        </p>
      </div>

      {/* Total Price */}
      <div className="mt-3 pt-2 border-t border-white/10 flex justify-between items-baseline font-bold text-sm text-white">
        <span className="text-xs uppercase tracking-wider text-gray-300">Total Price:</span>
        <span className="text-base text-gold-400 font-serif">
          ${total.toLocaleString()}
        </span>
      </div>

      {/* Action Button: Simulate Payment */}
      <div className="mt-3 pt-1">
        {isPaid ? (
          <div className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold text-xs animate-pulse">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Payment Dispatched to Backend!</span>
          </div>
        ) : (
          <button
            type="button"
            disabled={isProcessing}
            onClick={handleSimulatePayment}
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-midnight-950 font-bold text-xs shadow-gold-glow hover:brightness-110 active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-midnight-950" />
                <span>Contacting Webhook...</span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-midnight-950" />
                <span>Simulate Payment (${total.toLocaleString()})</span>
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

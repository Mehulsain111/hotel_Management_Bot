"use client";

import React, { useState } from "react";
import { QrCode, ShieldCheck, CheckCircle2, Loader2, Sparkles, ExternalLink } from "lucide-react";
import confetti from "canvas-confetti";

export default function QrCodeCard({ data, onSelect }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  const amount = data?.amount || data?.total || "₹16,500";
  const bookingRef = data?.booking_reference || data?.short_ref || "AURA-7829";
  const payee = data?.vpa || "aurapalace@upi";
  const qrUrl =
    data?.qr_url ||
    data?.qr_data ||
    `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=${payee}%26pn=AuraGrandHotel%26am=16500%26cu=INR%26tr=${bookingRef}&color=070d1e&bgcolor=ffffff`;

  const handleSimulatePayment = () => {
    if (isProcessing || isPaid) return;
    setIsProcessing(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.7 },
        colors: ["#d4af37", "#f5d061", "#ffffff", "#10b981"],
      });
    } catch (e) {}

    setTimeout(() => {
      setIsProcessing(false);
      setIsPaid(true);
      if (onSelect) {
        onSelect(`Payment of ${amount} for booking reference #${bookingRef} confirmed successfully.`);
      }
    }, 900);
  };

  return (
    <div className="w-full my-3 rounded-2xl bg-midnight-950/90 border border-gold-500/40 p-4 shadow-glass-card backdrop-blur-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/20 to-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <QrCode className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">
              Instant UPI Payment
            </h4>
            <p className="text-[10px] text-gray-400">Ref: #{bookingRef}</p>
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
              <span>Verified Pass</span>
            </>
          )}
        </span>
      </div>

      {/* QR Display Card */}
      <div className="mt-3 flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/5">
        <div className="p-2 rounded-xl bg-white shadow-md relative group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrUrl}
            alt="Payment QR Code"
            width={160}
            height={160}
            className="w-36 h-36 object-contain rounded-lg"
          />
        </div>

        <div className="mt-3 text-center">
          <div className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
            Amount Payable
          </div>
          <div className="text-lg font-bold text-gold-400 tracking-tight">
            {amount}
          </div>
          <div className="text-[10px] text-gray-400 font-mono mt-0.5">
            VPA: {payee}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 space-y-2">
        <button
          type="button"
          onClick={handleSimulatePayment}
          disabled={isPaid || isProcessing}
          className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs shadow-gold-glow flex items-center justify-center space-x-2 transition-all active:scale-[0.99] ${
            isPaid
              ? "bg-emerald-600 text-white cursor-default"
              : "bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-midnight-950 hover:brightness-110"
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Confirming Settlement...</span>
            </>
          ) : isPaid ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
              <span>Payment Settled ✓</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Simulate Instant Payment</span>
            </>
          )}
        </button>

        <p className="text-[9px] text-center text-gray-400">
          Scan using any UPI app (GPay, PhonePe, Paytm)
        </p>
      </div>
    </div>
  );
}

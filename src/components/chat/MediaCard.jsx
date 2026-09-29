"use client";

import React, { useState } from "react";
import { QrCode, ExternalLink, Download, Sparkles, Check, CreditCard, ShieldCheck } from "lucide-react";

export default function MediaCard({ mediaUrl, isQrCode, payment }) {
  const [copied, setCopied] = useState(false);

  const qrSrc = payment?.qr_url || mediaUrl;
  const isUpi = isQrCode || !!payment;

  const handleCopyLink = () => {
    const textToCopy = payment?.upi_link || qrSrc;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-3 w-full max-w-sm rounded-2xl bg-midnight-950/90 border border-gold-500/40 p-3.5 shadow-glass-card backdrop-blur-xl transition-all duration-300 hover:border-gold-500/60 hover:shadow-gold-glow">
      {/* Header Badge */}
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-xs">
        <div className="flex items-center space-x-1.5 text-gold-400">
          <QrCode className="w-3.5 h-3.5" />
          <span className="font-bold tracking-wide text-[11px]">
            {isUpi ? "Verified UPI Payment QR" : "Attached Media"}
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-semibold flex items-center space-x-1">
          <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
          <span>Amount Verified</span>
        </span>
      </div>

      {/* Payment details summary if provided */}
      {payment && (
        <div className="mb-2.5 p-2 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] text-gray-400 block">Total Payable</span>
            <span className="text-sm font-bold text-gold-400 font-serif">
              {payment.currency === "INR" ? "₹" : ""}{Number(payment.amount).toLocaleString()} {payment.currency}
            </span>
          </div>
          {payment.short_ref && (
            <div className="text-right">
              <span className="text-[10px] text-gray-400 block">Ref #</span>
              <span className="text-xs font-mono font-bold text-gray-200">
                {payment.short_ref}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Image Preview Container */}
      <div className="relative group rounded-xl bg-midnight-900/90 border border-white/10 p-2 flex flex-col items-center justify-center overflow-hidden">
        <img
          src={qrSrc}
          alt={isUpi ? "UPI Payment QR Code" : "Shared media"}
          className={`rounded-lg object-contain transition-transform duration-500 group-hover:scale-105 ${
            isUpi ? "w-48 h-48 bg-white p-2" : "w-full max-h-56 object-cover"
          }`}
        />

        {isUpi && (
          <p className="text-[10px] text-gray-400 mt-2 text-center">
            Scan using Google Pay, PhonePe, Paytm, or any UPI app
          </p>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-2.5 pt-2 flex items-center justify-between text-[11px] gap-2">
        <button
          type="button"
          onClick={handleCopyLink}
          className="flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all border border-white/10"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-300">Copied UPI</span>
            </>
          ) : (
            <>
              <Download className="w-3 h-3 text-gold-400" />
              <span>Copy Link</span>
            </>
          )}
        </button>

        {payment?.upi_link ? (
          <a
            href={payment.upi_link}
            className="flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg bg-gradient-to-r from-gold-500 to-amber-500 text-midnight-950 font-bold transition-all shadow-gold-glow hover:brightness-110"
          >
            <CreditCard className="w-3 h-3" />
            <span>Pay in App</span>
          </a>
        ) : (
          <a
            href={qrSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-lg bg-gold-500/15 hover:bg-gold-500/25 text-gold-300 font-semibold transition-all border border-gold-500/30"
          >
            <span>Open QR</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}

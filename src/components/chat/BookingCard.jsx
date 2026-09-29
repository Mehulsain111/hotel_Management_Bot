"use client";

import React, { useState } from "react";
import { CheckCircle2, Copy, Check, Calendar, Bed, MapPin, Sparkles } from "lucide-react";

export default function BookingCard({ booking }) {
  const [copied, setCopied] = useState(false);

  if (!booking) return null;

  const {
    short_ref = "CONFIRMED",
    guest_name = "Valued Guest",
    hotel_name = "Aura Grand Palace",
    hotel_city = "",
    room_type = "Luxury Residence",
    check_in = "",
    check_out = "",
    nights = 1,
    total_price = 0,
    status = "CONFIRMED",
  } = booking;

  const handleCopyRef = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(short_ref);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-3 w-full max-w-sm rounded-2xl bg-midnight-950/95 border border-emerald-500/40 shadow-glass-card backdrop-blur-xl overflow-hidden">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 flex items-center justify-between text-midnight-950 font-bold">
        <div className="flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-midnight-950" />
          <span className="text-xs uppercase tracking-wider">
            Booking {status}
          </span>
        </div>
        <span className="text-[10px] bg-midnight-950/20 px-2 py-0.5 rounded-full font-mono">
          Ref: {short_ref}
        </span>
      </div>

      {/* Details */}
      <div className="p-3.5 space-y-3 text-xs">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-bold text-white leading-tight">
              {hotel_name}
            </h4>
            {hotel_city && (
              <span className="text-[11px] text-gray-400 flex items-center mt-0.5">
                <MapPin className="w-3 h-3 mr-1 text-gold-400" />
                {hotel_city}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleCopyRef}
            className="flex items-center space-x-1 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] border border-white/10 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-400" />
                <span className="text-emerald-300">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy Ref</span>
              </>
            )}
          </button>
        </div>

        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-[11px] flex items-center">
              <Bed className="w-3.5 h-3.5 mr-1 text-gold-400" />
              Room:
            </span>
            <span className="font-semibold text-white truncate max-w-[180px]">
              {room_type}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-[11px]">Guest Name:</span>
            <span className="font-semibold text-gold-300">{guest_name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-[11px] flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-gold-400" />
              Dates:
            </span>
            <span className="text-white text-[11px]">
              {check_in} → {check_out} ({nights} nt)
            </span>
          </div>
        </div>

        <div className="pt-1 flex items-center justify-between font-bold">
          <span className="text-gray-300 text-xs">Total Amount:</span>
          <span className="text-gold-400 font-serif text-sm">
            ₹{Number(total_price).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

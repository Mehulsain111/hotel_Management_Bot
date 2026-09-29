"use client";

import React, { useState } from "react";
import { CheckCircle2, Bed, Calendar, MapPin, Sparkles, Copy, Check, Receipt } from "lucide-react";

export default function DigitalReceiptCard({ bookingData }) {
  const [copied, setCopied] = useState(false);

  if (!bookingData || typeof bookingData !== "object" || Object.keys(bookingData).length === 0) {
    return null;
  }

  const {
    hotel_name = bookingData.hotel || "Aura Grand Palace",
    hotel_city = bookingData.city || "",
    room_type = bookingData.room || "Luxury Suite",
    check_in = bookingData.checkIn || "2026-10-01",
    check_out = bookingData.checkOut || "2026-10-03",
    total_price = bookingData.price || bookingData.total || 0,
    nights = bookingData.nights || 2,
    guest_name = bookingData.guest || "Valued Guest",
    booking_id = bookingData.id || bookingData.short_ref || "CONFIRMED",
    status = bookingData.status || "CONFIRMED",
  } = bookingData;

  const handleCopyRef = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(String(booking_id));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formattedPrice =
    typeof total_price === "number"
      ? `₹${total_price.toLocaleString()}`
      : String(total_price).startsWith("₹")
      ? total_price
      : `₹${Number(total_price || 0).toLocaleString()}`;

  return (
    <div className="w-full max-w-sm mt-3 rounded-2xl bg-midnight-950/95 border border-gold-500/40 shadow-glass-card backdrop-blur-2xl overflow-hidden transition-all duration-300">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 px-4 py-2.5 flex items-center justify-between text-midnight-950 font-bold">
        <div className="flex items-center space-x-2">
          <Receipt className="w-4 h-4 text-midnight-950" />
          <span className="text-xs uppercase tracking-wider">
            Digital Receipt
          </span>
        </div>
        <span className="text-[10px] bg-midnight-950/20 px-2 py-0.5 rounded-full font-mono text-midnight-950 font-bold">
          Ref: {String(booking_id).slice(0, 10).toUpperCase()}
        </span>
      </div>

      {/* Main Details Body */}
      <div className="p-4 space-y-3 text-xs">
        {/* Hotel Name & City */}
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

        {/* Card Specs */}
        <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-[11px] flex items-center">
              <Bed className="w-3.5 h-3.5 mr-1.5 text-gold-400" />
              Room Type:
            </span>
            <span className="font-semibold text-white truncate max-w-[170px]">
              {room_type}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-[11px] flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-gold-400" />
              Dates:
            </span>
            <span className="text-gold-300 text-[11px] font-medium">
              {check_in} → {check_out} {nights ? `(${nights} nt)` : ""}
            </span>
          </div>

          {guest_name && (
            <div className="flex items-center justify-between pt-1 border-t border-white/5">
              <span className="text-gray-400 text-[11px]">Guest:</span>
              <span className="text-gray-200 text-[11px] font-medium">{guest_name}</span>
            </div>
          )}
        </div>

        {/* Total Price Section */}
        <div className="pt-1 flex items-center justify-between font-bold border-t border-white/10">
          <span className="text-gray-300 text-xs">Total Price:</span>
          <span className="text-gold-400 font-serif text-base tracking-wide">
            {formattedPrice}
          </span>
        </div>
      </div>
    </div>
  );
}

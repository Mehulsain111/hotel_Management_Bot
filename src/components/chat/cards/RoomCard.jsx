"use client";

import React, { useState } from "react";
import { BedDouble, Sparkles, Check, ChevronRight } from "lucide-react";

export const DEFAULT_ROOMS = [
  {
    id: "sky-penthouse",
    title: "Celestial Skyline Penthouse",
    tier: "Presidential",
    price: "₹24,500",
    rating: "4.99",
    features: ["Private Heated Jacuzzi", "Sky Balcony 42nd Fl", "24/7 Personal Butler"],
  },
  {
    id: "royal-suite",
    title: "Royal Oceanfront Suite",
    tier: "Premium",
    price: "₹15,000",
    rating: "4.95",
    features: ["Panoramic Sea Horizon", "King Canopy Bed", "Complimentary Lounge Access"],
  },
  {
    id: "deluxe-king",
    title: "Aura Deluxe King",
    tier: "Executive",
    price: "₹9,800",
    rating: "4.90",
    features: ["Smart Room Automation", "Rain Shower Spa", "Fine Marble Flooring"],
  },
];

export default function RoomCard({ data, onSelect }) {
  const rooms = data?.rooms || DEFAULT_ROOMS;
  const [selectedIdx, setSelectedIdx] = useState(0);

  const active = rooms[selectedIdx] || rooms[0];

  const handleBook = () => {
    if (onSelect) {
      onSelect(`I would like to reserve the ${active.title} (${active.tier}) at ${active.price}/night.`);
    }
  };

  return (
    <div className="w-full my-3 rounded-2xl bg-midnight-950/85 border border-gold-500/35 p-4 shadow-glass-card backdrop-blur-xl transition-all duration-300 hover:border-gold-500/50">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-gold-500/20 to-amber-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <BedDouble className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">
              Luxury Suite Selection
            </h4>
            <p className="text-[10px] text-gray-400">Curated available rooms</p>
          </div>
        </div>
        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30 font-semibold flex items-center space-x-1">
          <Sparkles className="w-2.5 h-2.5 text-gold-400" />
          <span>Available</span>
        </span>
      </div>

      {/* Room Tabs */}
      <div className="grid grid-cols-3 gap-1.5 mt-3 p-1 rounded-xl bg-midnight-900/90 border border-white/5">
        {rooms.map((room, idx) => (
          <button
            key={room.id || idx}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className={`py-1.5 px-2 rounded-lg text-[10px] font-medium transition-all text-center truncate ${
              selectedIdx === idx
                ? "bg-gold-500 text-midnight-950 font-bold shadow-gold-glow"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {room.tier || room.title}
          </button>
        ))}
      </div>

      {/* Selected Room Details */}
      <div className="mt-3.5 space-y-2.5 bg-white/[0.02] p-3 rounded-xl border border-white/5">
        <div className="flex items-start justify-between">
          <div>
            <h5 className="text-xs font-bold text-white">{active.title}</h5>
            <span className="text-[10px] text-gold-400/90 font-medium">
              ★ {active.rating} • {active.tier} Tier
            </span>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-gold-400">{active.price}</div>
            <div className="text-[9px] text-gray-400">per night + taxes</div>
          </div>
        </div>

        {/* Feature bullets */}
        <div className="space-y-1 pt-1 border-t border-white/5">
          {active.features?.map((feat, i) => (
            <div key={i} className="flex items-center space-x-2 text-[10px] text-gray-300">
              <Check className="w-3 h-3 text-gold-400 flex-shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Select Button */}
      <button
        type="button"
        onClick={handleBook}
        className="w-full mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-midnight-950 font-bold text-xs shadow-gold-glow hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
      >
        <span>Select {active.tier} Suite</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

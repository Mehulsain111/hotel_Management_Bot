"use client";

import React, { useState } from "react";
import { GlassWater, Users, Sparkles, ChevronRight, Check, Award } from "lucide-react";

export const DEFAULT_EVENTS = [
  {
    id: "ballroom-wedding",
    type: "Wedding & Reception",
    venue: "Grand Crystal Ballroom",
    guests: "150 - 500 Guests",
    highlights: ["Champagne Cascade Fountain", "7-Course Imperial Feast", "Bridal Luxury Suite Included"],
    basePrice: "₹4,50,000",
  },
  {
    id: "gala-anniversary",
    type: "Anniversary & Private Party",
    venue: "Starlight Sky Deck",
    guests: "40 - 120 Guests",
    highlights: ["Private Sommelier & Bar", "Acoustic Live Quartet", "Personalized Decor"],
    basePrice: "₹1,80,000",
  },
  {
    id: "corporate-summit",
    type: "Corporate Gala Summit",
    venue: "Sovereign Executive Hall",
    guests: "50 - 200 Guests",
    highlights: ["Ultra-HD LED Wall", "High-Speed Fiber Connectivity", "Gourmet High-Tea & Dinner"],
    basePrice: "₹2,20,000",
  },
];

export default function EventCard({ data, onSelect }) {
  const events = data?.events || DEFAULT_EVENTS;
  const [selectedIdx, setSelectedIdx] = useState(0);

  const active = events[selectedIdx] || events[0];

  const handleBook = () => {
    if (onSelect) {
      onSelect(`I would like to inquire about booking the ${active.type} package at ${active.venue}.`);
    }
  };

  return (
    <div className="w-full my-3 rounded-2xl bg-midnight-950/85 border border-gold-500/35 p-4 shadow-glass-card backdrop-blur-xl transition-all duration-300 hover:border-gold-500/50">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/20 to-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <GlassWater className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">
              Banquet & Event Planning
            </h4>
            <p className="text-[10px] text-gray-400">Luxury event spaces</p>
          </div>
        </div>
        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30 font-semibold flex items-center space-x-1">
          <Award className="w-2.5 h-2.5 text-gold-400" />
          <span>Curated Gala</span>
        </span>
      </div>

      {/* Event Tabs */}
      <div className="grid grid-cols-3 gap-1 mt-3 p-1 rounded-xl bg-midnight-900/90 border border-white/5">
        {events.map((ev, idx) => (
          <button
            key={ev.id || idx}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className={`py-1.5 px-1.5 rounded-lg text-[10px] font-medium transition-all text-center truncate ${
              selectedIdx === idx
                ? "bg-gold-500 text-midnight-950 font-bold shadow-gold-glow"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            {ev.type.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Selected Event Details */}
      <div className="mt-3.5 space-y-2 bg-white/[0.02] p-3 rounded-xl border border-white/5">
        <div className="flex items-start justify-between">
          <div>
            <h5 className="text-xs font-bold text-white">{active.type}</h5>
            <p className="text-[10px] text-gold-400/90 font-medium">
              {active.venue} • {active.guests}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-gold-400">{active.basePrice}</div>
            <div className="text-[9px] text-gray-400">package start</div>
          </div>
        </div>

        <div className="space-y-1 pt-1 border-t border-white/5">
          {active.highlights?.map((h, i) => (
            <div key={i} className="flex items-center space-x-2 text-[10px] text-gray-300">
              <Check className="w-3 h-3 text-gold-400 flex-shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Action Button */}
      <button
        type="button"
        onClick={handleBook}
        className="w-full mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-midnight-950 font-bold text-xs shadow-gold-glow hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
      >
        <span>Plan {active.type}</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

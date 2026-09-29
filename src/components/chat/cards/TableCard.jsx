"use client";

import React, { useState } from "react";
import { Utensils, Users, Clock, Sparkles, ChevronRight, Check } from "lucide-react";

export const DEFAULT_TABLES = [
  {
    id: "sky-rooftop",
    name: "Celestial Rooftop Skylounge",
    category: "Couple",
    capacity: "2 Guests",
    view: "360° City & Bay Skyline",
    tasting: "5-Course Michelin Experience",
    pricePerPerson: "₹4,200",
  },
  {
    id: "garden-cabana",
    name: "Imperial Garden Private Cabana",
    category: "Family",
    capacity: "4 - 8 Guests",
    view: "Illuminated Lotus Pool",
    tasting: "Royal Mughal & Continental Feast",
    pricePerPerson: "₹3,500",
  },
];

export default function TableCard({ data, onSelect }) {
  const tables = data?.tables || DEFAULT_TABLES;
  const [partyType, setPartyType] = useState("Couple");
  const [selectedSlot, setSelectedSlot] = useState("07:30 PM");

  const filtered = tables.find((t) => t.category === partyType) || tables[0];

  const handleReserve = () => {
    if (onSelect) {
      onSelect(`I would like to reserve a ${partyType} table at the ${filtered.name} for ${selectedSlot}.`);
    }
  };

  return (
    <div className="w-full my-3 rounded-2xl bg-midnight-950/85 border border-gold-500/35 p-4 shadow-glass-card backdrop-blur-xl transition-all duration-300 hover:border-gold-500/50">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500/20 to-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white tracking-wide">
              Fine Dining Reservation
            </h4>
            <p className="text-[10px] text-gray-400">Michelin-starred culinary tables</p>
          </div>
        </div>
        <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-300 border border-gold-500/30 font-semibold flex items-center space-x-1">
          <Sparkles className="w-2.5 h-2.5 text-gold-400" />
          <span>Priority Table</span>
        </span>
      </div>

      {/* Arrangement Selector */}
      <div className="flex items-center justify-between mt-3 text-xs">
        <span className="text-gray-400 text-[10px] font-medium">Party Size:</span>
        <div className="flex space-x-1.5">
          {["Couple", "Family"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setPartyType(cat)}
              className={`px-3 py-1 rounded-lg text-[10px] font-medium transition-all ${
                partyType === cat
                  ? "bg-gold-500 text-midnight-950 font-bold shadow-gold-glow"
                  : "bg-white/5 text-gray-300 hover:bg-white/10"
              }`}
            >
              {cat === "Couple" ? "Couple (2p)" : "Family (4-8p)"}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Table Card Info */}
      <div className="mt-3 space-y-2 bg-white/[0.02] p-3 rounded-xl border border-white/5">
        <div className="flex items-start justify-between">
          <div>
            <h5 className="text-xs font-bold text-white">{filtered.name}</h5>
            <p className="text-[10px] text-gold-400/90 font-medium">
              {filtered.view}
            </p>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-gold-400">
              {filtered.pricePerPerson}
            </div>
            <div className="text-[9px] text-gray-400">per cover</div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-[10px] text-gray-300 pt-1 border-t border-white/5">
          <Check className="w-3 h-3 text-gold-400 flex-shrink-0" />
          <span>{filtered.tasting}</span>
        </div>
      </div>

      {/* Time Slot Selector */}
      <div className="mt-3 flex items-center justify-between">
        <span className="text-gray-400 text-[10px] flex items-center space-x-1">
          <Clock className="w-3 h-3 text-gold-400" />
          <span>Seating Slot:</span>
        </span>
        <div className="flex space-x-1.5">
          {["07:30 PM", "09:00 PM"].map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSelectedSlot(slot)}
              className={`px-2.5 py-1 rounded-lg text-[10px] transition-all ${
                selectedSlot === slot
                  ? "border border-gold-500 text-gold-300 bg-gold-500/10 font-bold"
                  : "border border-white/10 text-gray-400 hover:text-white"
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Reserve Button */}
      <button
        type="button"
        onClick={handleReserve}
        className="w-full mt-3 py-2 px-3 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-midnight-950 font-bold text-xs shadow-gold-glow hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center space-x-2"
      >
        <span>Reserve Table ({selectedSlot})</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

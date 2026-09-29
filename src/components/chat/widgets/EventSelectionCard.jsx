"use client";

import React, { useState } from "react";
import { GlassWater, ChefHat, Users, ChevronRight, Sparkles } from "lucide-react";
import { EVENT_PACKAGES } from "@/data/hotelData";

export default function EventSelectionCard({ data, onAction }) {
  const packages = data?.packages || EVENT_PACKAGES;
  // Options strictly: Birthday, Anniversary, Wedding, Party (Exclude Date!)
  const eventTypes = ["Birthday", "Anniversary", "Wedding", "Party"];
  const [selectedType, setSelectedType] = useState("Birthday");
  const [foodPreference, setFoodPreference] = useState("Michelin 7-Course");
  const [totalGuests, setTotalGuests] = useState(50);

  const foodOptions = [
    "Michelin 7-Course Gourmet",
    "Gourmet Multi-Cuisine Buffet",
    "Champagne & Caviar Lounge",
    "Vegetarian / Vegan Banquet",
  ];

  const activePackage =
    packages.find((p) => p.type.toLowerCase().includes(selectedType.toLowerCase())) ||
    packages[0];

  const handleConfirm = () => {
    if (onAction) {
      onAction("book_event", {
        event_type: selectedType,
        food_preference: foodPreference,
        total_guests: totalGuests,
        base_price: activePackage?.basePrice || 3800,
        package_title: activePackage?.title || `${selectedType} Celebration`,
      });
    }
  };

  return (
    <div className="w-full max-w-md my-2 rounded-2xl bg-midnight-900/95 border border-gold-500/40 p-4 shadow-glass-card backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400">
            <GlassWater className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Event Booking Card
            </h4>
            <p className="text-[11px] text-gray-400">Payload: intent = &quot;book_event&quot;</p>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20 font-semibold">
          Dynamic Input
        </span>
      </div>

      {/* Event Types: Birthday, Anniversary, Wedding, Party (NO DATE) */}
      <div className="mt-3">
        <span className="text-gray-400 text-[11px] font-medium block mb-1.5">
          Select Event Type:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
          {eventTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all text-center ${
                selectedType === type
                  ? "bg-gradient-to-r from-gold-500 to-amber-500 text-midnight-950 shadow-gold-glow"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Food Preferences Selection */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <span className="text-gray-400 text-[11px] font-medium flex items-center mb-1.5">
          <ChefHat className="w-3.5 h-3.5 mr-1 text-gold-400" />
          Food Preference:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {foodOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setFoodPreference(opt)}
              className={`p-2 rounded-lg text-[10px] font-medium text-left transition-all border ${
                foodPreference === opt
                  ? "bg-gold-500/20 text-gold-300 border-gold-500/60 font-semibold shadow-sm"
                  : "bg-white/[0.03] text-gray-300 border-white/15 hover:border-white/20"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Total Guests Input */}
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs p-2 rounded-xl bg-white/[0.03] border border-white/10">
        <span className="text-gray-300 text-[11px] font-medium flex items-center">
          <Users className="w-3.5 h-3.5 mr-1.5 text-gold-400" />
          Estimated Guests:
        </span>
        <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-2.5 py-1 border border-white/10">
          <button
            type="button"
            onClick={() => setTotalGuests(Math.max(10, totalGuests - 10))}
            className="text-sm font-bold text-gold-400 hover:text-white px-1"
          >
            -
          </button>
          <span className="text-xs font-bold text-white min-w-[3ch] text-center font-mono">
            {totalGuests}
          </span>
          <button
            type="button"
            onClick={() => setTotalGuests(Math.min(300, totalGuests + 10))}
            className="text-sm font-bold text-gold-400 hover:text-white px-1"
          >
            +
          </button>
          <span className="text-[10px] text-gray-400">guests</span>
        </div>
      </div>

      {/* Action Button: Dispatches webhook payload */}
      <div className="mt-3 pt-2">
        <button
          type="button"
          onClick={handleConfirm}
          className="w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-midnight-950 text-xs font-bold shadow-gold-glow hover:brightness-110 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Book Event via Backend ({selectedType}, {totalGuests} Guests)</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { BedDouble, Users, Baby, ChevronRight, Sparkles } from "lucide-react";
import { ROOM_TIERS } from "@/data/hotelData";

export default function RoomSelectionCard({ data, onAction }) {
  const tiers = data?.tiers || ROOM_TIERS;
  const [selectedCategory, setSelectedCategory] = useState("Premium");
  const [selectedType, setSelectedType] = useState("Couple");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [nights, setNights] = useState(2);
  const [activeRoomId, setActiveRoomId] = useState(tiers[0]?.id || "sky-villa");

  const filteredRooms = tiers.filter((room) => {
    const matchesCategory =
      selectedCategory === "All" || room.category === selectedCategory;
    const matchesType =
      selectedType === "All" || room.type.toLowerCase().includes(selectedType.toLowerCase());
    return matchesCategory && matchesType;
  });

  const activeRoom =
    tiers.find((r) => r.id === activeRoomId) || filteredRooms[0] || tiers[0];

  const handleConfirm = () => {
    if (onAction && activeRoom) {
      onAction("book_room", {
        room_type: activeRoom.tier,
        category: selectedCategory,
        occupancy: selectedType,
        adults: adults,
        children: children,
        nights: nights,
        price_per_night: activeRoom.pricePerNight,
      });
    }
  };

  return (
    <div className="w-full max-w-md my-2 rounded-2xl bg-midnight-900/95 border border-gold-500/40 p-4 shadow-glass-card backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400">
            <BedDouble className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Room Booking Card
            </h4>
            <p className="text-[11px] text-gray-400">Payload: intent = &quot;book_room&quot;</p>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20 font-semibold">
          Dynamic Input
        </span>
      </div>

      {/* Selectors: Category & Occupancy */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 text-[11px] font-medium">Category:</span>
          <div className="flex space-x-1.5">
            {["Premium", "Normal"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-gold-500 text-midnight-950 shadow-gold-glow"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-400 text-[11px] font-medium">Arrangement:</span>
          <div className="flex space-x-1.5">
            {["Couple", "Family"].map((typ) => (
              <button
                key={typ}
                type="button"
                onClick={() => setSelectedType(typ)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  selectedType === typ
                    ? "bg-amber-400 text-midnight-950 shadow-gold-glow"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
                }`}
              >
                {typ}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Room Carousel / List */}
      <div className="mt-3 space-y-2 max-h-40 overflow-y-auto pr-1 chat-scroll">
        {filteredRooms.map((room) => {
          const isSelected = room.id === activeRoom?.id;
          return (
            <div
              key={room.id}
              onClick={() => setActiveRoomId(room.id)}
              className={`cursor-pointer rounded-xl p-2 transition-all border ${
                isSelected
                  ? "bg-gradient-to-r from-gold-500/20 to-transparent border-gold-500/60 shadow-gold-glow"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-semibold text-white">{room.tier}</h5>
                  <span className="text-[10px] text-gray-400">{room.view}</span>
                </div>
                <span className="text-xs font-bold text-gold-400">
                  ${room.pricePerNight}
                  <span className="text-[9px] text-gray-400 font-normal">/nt</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Adults & Children Inputs */}
      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs">
        {/* Number of Adults */}
        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between text-gray-300 mb-1.5">
            <span className="text-[11px] font-medium flex items-center">
              <Users className="w-3 h-3 mr-1 text-gold-400" />
              Adults:
            </span>
            <span className="text-xs font-bold text-white font-mono">{adults}</span>
          </div>
          <div className="flex items-center justify-between bg-white/5 rounded-lg px-2 py-0.5 border border-white/10">
            <button
              type="button"
              onClick={() => setAdults(Math.max(1, adults - 1))}
              className="text-sm font-bold text-gold-400 hover:text-white px-1"
            >
              -
            </button>
            <span className="text-xs text-gray-400">Age 13+</span>
            <button
              type="button"
              onClick={() => setAdults(Math.min(6, adults + 1))}
              className="text-sm font-bold text-gold-400 hover:text-white px-1"
            >
              +
            </button>
          </div>
        </div>

        {/* Number of Children (NEW) */}
        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
          <div className="flex items-center justify-between text-gray-300 mb-1.5">
            <span className="text-[11px] font-medium flex items-center">
              <Baby className="w-3 h-3 mr-1 text-amber-400" />
              Children:
            </span>
            <span className="text-xs font-bold text-white font-mono">{children}</span>
          </div>
          <div className="flex items-center justify-between bg-white/5 rounded-lg px-2 py-0.5 border border-white/10">
            <button
              type="button"
              onClick={() => setChildren(Math.max(0, children - 1))}
              className="text-sm font-bold text-gold-400 hover:text-white px-1"
            >
              -
            </button>
            <span className="text-xs text-gray-400">Age 0-12</span>
            <button
              type="button"
              onClick={() => setChildren(Math.min(4, children + 1))}
              className="text-sm font-bold text-gold-400 hover:text-white px-1"
            >
              +
            </button>
          </div>
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
          <span>Send Booking to Backend (Adults: {adults}, Children: {children})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

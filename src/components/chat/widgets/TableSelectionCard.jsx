"use client";

import React, { useState } from "react";
import { Utensils, Users, ChevronRight, Sparkles } from "lucide-react";
import { DINING_TABLES } from "@/data/hotelData";

export default function TableSelectionCard({ data, onAction }) {
  const tables = data?.tables || DINING_TABLES;
  const [selectedType, setSelectedType] = useState("Couple");
  const [totalMembers, setTotalMembers] = useState(2);
  const [activeTableId, setActiveTableId] = useState(tables[0]?.id || "celestial-rooftop");

  const filteredTables = tables.filter((t) => {
    return t.type.toLowerCase().includes(selectedType.toLowerCase());
  });

  const activeTable =
    tables.find((t) => t.id === activeTableId) || filteredTables[0] || tables[0];

  const handleConfirm = () => {
    if (onAction && activeTable) {
      onAction("book_table", {
        table_type: activeTable.name,
        arrangement: selectedType,
        total_members: totalMembers,
        price_per_person: activeTable.pricePerPerson,
      });
    }
  };

  return (
    <div className="w-full max-w-md my-2 rounded-2xl bg-midnight-900/95 border border-gold-500/40 p-4 shadow-glass-card backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 rounded-lg bg-gold-500/20 text-gold-400">
            <Utensils className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wide">
              Table Booking Card
            </h4>
            <p className="text-[11px] text-gray-400">Payload: intent = &quot;book_table&quot;</p>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20 font-semibold">
          Dynamic Input
        </span>
      </div>

      {/* Options: Family / Couple */}
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="text-gray-400 text-[11px] font-medium">Arrangement:</span>
        <div className="flex space-x-1.5">
          {["Couple", "Family"].map((typ) => (
            <button
              key={typ}
              type="button"
              onClick={() => setSelectedType(typ)}
              className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                selectedType === typ
                  ? "bg-gold-500 text-midnight-950 shadow-gold-glow"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/5"
              }`}
            >
              {typ}
            </button>
          ))}
        </div>
      </div>

      {/* Dining Venue Selection */}
      <div className="mt-3 space-y-1.5 max-h-36 overflow-y-auto pr-1 chat-scroll">
        {tables.map((t) => {
          const isSelected = t.id === activeTable?.id;
          return (
            <div
              key={t.id}
              onClick={() => setActiveTableId(t.id)}
              className={`cursor-pointer rounded-xl p-2 transition-all border ${
                isSelected
                  ? "bg-gold-500/20 border-gold-500/60 shadow-gold-glow"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-semibold text-white">{t.name}</h5>
                  <span className="text-[10px] text-gray-400">{t.ambiance}</span>
                </div>
                <span className="text-xs font-bold text-gold-400">
                  ${t.pricePerPerson}
                  <span className="text-[9px] text-gray-400 font-normal">/person</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Members Input */}
      <div className="mt-3 pt-3 border-t border-white/10">
        <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-white/[0.03] border border-white/10">
          <span className="text-gray-300 text-[11px] font-medium flex items-center">
            <Users className="w-3.5 h-3.5 mr-1.5 text-gold-400" />
            Total Members:
          </span>
          <div className="flex items-center space-x-2 bg-white/5 rounded-lg px-2.5 py-1 border border-white/10">
            <button
              type="button"
              onClick={() => setTotalMembers(Math.max(1, totalMembers - 1))}
              className="text-sm font-bold text-gold-400 hover:text-white px-1"
            >
              -
            </button>
            <span className="text-xs font-bold text-white min-w-[2ch] text-center font-mono">
              {totalMembers}
            </span>
            <button
              type="button"
              onClick={() => setTotalMembers(Math.min(16, totalMembers + 1))}
              className="text-sm font-bold text-gold-400 hover:text-white px-1"
            >
              +
            </button>
            <span className="text-[10px] text-gray-400">guests</span>
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
          <span>Book Table via Backend ({selectedType}, {totalMembers} Members)</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

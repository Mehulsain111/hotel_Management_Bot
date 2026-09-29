"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Bot, PhoneCall, Compass, Shield } from "lucide-react";

export default function Navbar({ onOpenChat }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-midnight-950/80 backdrop-blur-xl border-b border-gold-500/20 py-3 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Logo & Monogram */}
        <div className="flex items-center space-x-3 cursor-pointer group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 via-amber-500 to-amber-700 p-[1.5px] shadow-gold-glow group-hover:scale-105 transition-transform">
            <div className="w-full h-full rounded-[10px] bg-midnight-950 flex items-center justify-center font-serif text-lg font-bold text-gold-400">
              A
            </div>
          </div>
          <div>
            <span className="font-serif tracking-[0.25em] text-sm md:text-base font-bold gold-gradient-text block leading-tight">
              AURA GRAND
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-medium block">
              Dynamic Agent Hospitality
            </span>
          </div>
        </div>

        {/* Minimal Navigation Links */}
        <div className="hidden lg:flex items-center space-x-8 text-xs font-medium tracking-widest uppercase text-gray-300">
          <a
            href="#suites"
            className="hover:text-gold-400 transition-colors"
          >
            Suites
          </a>
          <a
            href="#dining"
            className="hover:text-gold-400 transition-colors"
          >
            Dining
          </a>
          <a
            href="#events"
            className="hover:text-gold-400 transition-colors"
          >
            Galas & Events
          </a>
          <a
            href="#experience"
            className="hover:text-gold-400 transition-colors"
          >
            Experience
          </a>
        </div>

        {/* Concierge Agent CTA & Status */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-[11px] text-gray-300 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gray-400">Concierge:</span>
            <span className="text-gold-300 font-semibold">Live 24/7</span>
          </div>

          <button
            type="button"
            onClick={onOpenChat}
            className="relative group flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-midnight-950 font-bold text-xs shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-110 active:scale-95 transition-all"
          >
            <Bot className="w-4 h-4 text-midnight-950" />
            <span>AI Concierge</span>
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-midnight-950 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-midnight-950" />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

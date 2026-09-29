"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Bed, Utensils, ShieldCheck, Compass, Eye, ArrowUpRight } from "lucide-react";

export default function Hero3DVisual({ onOpenChatWithPrompt }) {
  const containerRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-12deg to +12deg)
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-sm sm:max-w-lg lg:max-w-xl mx-auto h-[420px] xs:h-[460px] sm:h-[540px] perspective-1200 preserve-3d cursor-grab active:cursor-grabbing select-none"
    >
      {/* Background Volumetric Glowing Orbs */}
      <div className="absolute -top-6 -left-6 sm:-top-10 sm:-left-10 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-gold-500/15 blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute -bottom-6 -right-6 sm:-bottom-10 sm:-right-10 w-52 sm:w-80 h-52 sm:h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

      {/* Floating 3D Main Container */}
      <div
        className="relative w-full h-full rounded-2xl sm:rounded-3xl transition-transform duration-200 ease-out preserve-3d"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) ${
            isHovered ? "scale3d(1.02, 1.02, 1.02)" : "scale3d(1, 1, 1)"
          }`,
        }}
      >
        {/* Core Hotel Architecture Canvas / Showcase Image */}
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden border border-gold-500/30 shadow-glass-card bg-midnight-950/80 backdrop-blur-md">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85"
            alt="Aura Grand Palace 3D Architecture"
            className="w-full h-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
          />

          {/* Luxury Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight-950 via-midnight-950/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-tr from-gold-500/10 via-transparent to-blue-500/10" />

          {/* Holographic Architecture Grid / Scanlines */}
          <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px] sm:[background-size:24px_24px] opacity-15 pointer-events-none" />

          {/* Top Status Bar on Card */}
          <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between text-[11px] sm:text-xs">
            <div className="flex items-center space-x-1.5 sm:space-x-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-midnight-950/80 backdrop-blur-md border border-gold-500/30 text-white font-medium">
              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-gold-400 animate-ping" />
              <span className="text-gold-300 text-[10px] sm:text-xs truncate max-w-[130px] sm:max-w-none">Level 88 Celestial Spire</span>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-midnight-950/80 backdrop-blur-md border border-white/15 text-gray-300 text-[10px] sm:text-xs">
              <Compass className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gold-400" />
              <span>Spatial 3D</span>
            </div>
          </div>

          {/* Bottom Card Information */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.2em] sm:tracking-[0.25em] text-gold-400 block mb-1">
              Zero-Gravity Hospitality
            </span>
            <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white leading-tight">
              Aura Grand Spire & Sky Villas
            </h3>
            <p className="text-[11px] sm:text-xs text-gray-300 mt-1 line-clamp-2 max-w-sm">
              Suspended in a perpetual state of architectural levitation. 120 luxury residences, private cloud terraces, and 3-Michelin star culinary theatre.
            </p>
          </div>
        </div>

        {/* Levitating Layer 1: Presidential Sky Villa Badge (TranslateZ: 50px) */}
        <div
          onClick={() => onOpenChatWithPrompt && onOpenChatWithPrompt("Book a Luxury Suite")}
          className="absolute -top-3 left-2 sm:-top-4 sm:-left-6 lg:-left-8 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl glass-panel shadow-glass-hover border-gold-400/40 cursor-pointer animate-float-slow transition-all group max-w-[200px] sm:max-w-none"
          style={{ transform: "translateZ(55px)" }}
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 group-hover:bg-gold-500 group-hover:text-midnight-950 transition-colors flex-shrink-0">
              <Bed className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gold-400 font-bold truncate">
                  Presidential Tier
                </span>
                <ArrowUpRight className="w-3 h-3 text-gold-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
              </div>
              <h5 className="text-[11px] sm:text-xs font-bold text-white truncate">Sky Villa 77A</h5>
              <p className="text-[9px] sm:text-[10px] text-gray-300 truncate">$1,450/nt · Cloudline</p>
            </div>
          </div>
        </div>

        {/* Levitating Layer 2: Celestial Dining Badge (TranslateZ: 70px) */}
        <div
          onClick={() => onOpenChatWithPrompt && onOpenChatWithPrompt("Reserve a Dining Table")}
          className="absolute -bottom-4 right-2 sm:-bottom-5 sm:-right-6 lg:-right-8 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl glass-panel shadow-glass-hover border-gold-400/40 cursor-pointer animate-float-reverse transition-all group max-w-[200px] sm:max-w-none"
          style={{ transform: "translateZ(75px)" }}
        >
          <div className="flex items-center space-x-2.5 sm:space-x-3">
            <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 group-hover:bg-gold-500 group-hover:text-midnight-950 transition-colors flex-shrink-0">
              <Utensils className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center space-x-1">
                <span className="text-[9px] sm:text-[10px] uppercase tracking-wider text-amber-300 font-bold truncate">
                  Michelin 2-Star
                </span>
                <ArrowUpRight className="w-3 h-3 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform flex-shrink-0" />
              </div>
              <h5 className="text-[11px] sm:text-xs font-bold text-white truncate">Celestial Rooftop</h5>
              <p className="text-[9px] sm:text-[10px] text-gray-300 truncate">Sommelier Cellar</p>
            </div>
          </div>
        </div>

        {/* Levitating Layer 3: Antigravity Rating Badge (TranslateZ: 90px) */}
        <div
          className="absolute top-1/2 -right-3 sm:-right-8 -translate-y-1/2 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl glass-panel-subtle border-white/20 shadow-xl hidden md:flex items-center space-x-2 animate-float-medium"
          style={{ transform: "translateZ(90px)" }}
        >
          <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <ShieldCheck className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-1">
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span className="text-[10px] font-bold text-white">5-Star Diamond</span>
            </div>
            <span className="text-[9px] text-gray-400 block">World Luxury 2026</span>
          </div>
        </div>
      </div>

      {/* Floating 3D Depth Rings */}
      <div className="absolute -inset-2 sm:-inset-4 border border-gold-500/10 rounded-2xl sm:rounded-[34px] pointer-events-none -z-10 animate-pulse" />
      <div className="absolute -inset-4 sm:-inset-8 border border-white/5 rounded-3xl sm:rounded-[40px] pointer-events-none -z-20 hidden xs:block" />
    </div>
  );
}

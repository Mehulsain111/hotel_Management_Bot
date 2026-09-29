"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero3DVisual from "@/components/Hero3DVisual";
import ChatModal from "@/components/chat/ChatModal";
import { ROOM_TIERS, DINING_TABLES, EVENT_PACKAGES, HOTEL_INFO } from "@/data/hotelData";
import {
  Sparkles,
  Bot,
  Shield,
  Star,
  Compass,
  ArrowRight,
  BedDouble,
  Utensils,
  GlassWater,
  CreditCard,
  QrCode,
  FileCheck,
  CheckCircle,
  Clock,
  MapPin,
  ChevronRight,
} from "lucide-react";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatPrompt, setChatPrompt] = useState("");

  const handleOpenChatWithPrompt = (prompt) => {
    setChatPrompt(prompt);
    setIsChatOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-midnight-950 text-white overflow-hidden">
      {/* Top Navbar */}
      <Navbar onOpenChat={() => setIsChatOpen(true)} />

      {/* Hero Section with Antigravity 3D Floating Visual */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-medium tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Antigravity 3D Luxury Hospitality</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-extrabold tracking-tight leading-[1.15]">
              Elevate Your Stay to{" "}
              <span className="gold-gradient-text drop-shadow-sm">
                Zero-Gravity
              </span>{" "}
              Opulence.
            </h1>

            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Welcome to Aura Grand Palace. An architectural spire suspended in the clouds,
              curated by our intelligent 24/7 AI Concierge. Select presidential suites,
              reserve Michelin dining, and settle reservations via instant QR pass.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                type="button"
                onClick={() => setIsChatOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-midnight-950 font-bold text-sm shadow-gold-glow hover:shadow-gold-glow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center space-x-3 cursor-pointer group"
              >
                <Bot className="w-5 h-5 text-midnight-950 group-hover:rotate-12 transition-transform" />
                <span>Launch AI Concierge</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#suites"
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/[0.05] hover:bg-white/10 text-white font-semibold text-sm border border-white/15 transition-all flex items-center justify-center space-x-2"
              >
                <span>Browse Suites</span>
              </a>
            </div>

            {/* Quick Interactive Prompt Chips */}
            <div className="pt-4 border-t border-white/10">
              <span className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold block mb-2.5">
                Quick AI Concierge Prompts:
              </span>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {[
                  { label: "Check Available Suites", prompt: "Hello! What luxury suites are available for booking?" },
                  { label: "Reserve Dinner Table", prompt: "I would like to reserve a fine dining table for tonight." },
                  { label: "Plan a Private Event", prompt: "What options do you have for hosting a private wedding or celebration?" },
                  { label: "Payment & Check-in Pass", prompt: "Can you provide the QR code payment and check-in pass?" },
                ].map((chip, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOpenChatWithPrompt(chip.prompt)}
                    className="px-3 py-1.5 rounded-xl bg-midnight-900/80 hover:bg-gold-500/20 text-gray-300 hover:text-gold-200 border border-gold-500/20 text-xs transition-all flex items-center space-x-1.5 group"
                  >
                    <span className="text-gold-400 group-hover:scale-110 transition-transform">✦</span>
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Stats Banner */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              <div>
                <span className="text-xl md:text-2xl font-serif font-bold text-white block">
                  1,200 ft
                </span>
                <span className="text-[11px] text-gray-400">Cloudline Elevation</span>
              </div>
              <div>
                <span className="text-xl md:text-2xl font-serif font-bold text-gold-400 block">
                  99.8%
                </span>
                <span className="text-[11px] text-gray-400">Guest Serenity</span>
              </div>
              <div>
                <span className="text-xl md:text-2xl font-serif font-bold text-white block">
                  3-Star
                </span>
                <span className="text-[11px] text-gray-400">Michelin Guide</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Floating Visual */}
          <div className="lg:col-span-6 flex justify-center">
            <Hero3DVisual onOpenChatWithPrompt={handleOpenChatWithPrompt} />
          </div>
        </div>
      </section>

      {/* Core Architectural Pillars */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold block mb-2">
            The Antigravity Standard
          </span>
          <h2 className="text-3xl font-serif font-bold text-white">
            Integrated AI & Spatial Hospitality
          </h2>
          <p className="text-xs md:text-sm text-gray-400 mt-2">
            Every booking, dining arrangement, and transaction flows directly through our reactive concierge agent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl glass-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-gold-500/20 text-gold-400 flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Conversational UI Engine</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              No static booking forms. Simply talk with the AI agent to filter room classes (Premium/Normal) and guest arrangements (Couple/Family).
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Instant QR Settlement</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Interactive in-feed QR payment widget with simulated bank verification and one-click hold confirmations.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-card space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <FileCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Verified Digital Pass</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Automated high-security digital receipt ticket with encrypted front-desk QR for instant check-in at the celestial gates.
            </p>
          </div>
        </div>
      </section>

      {/* Suites Showcase Section */}
      <section id="suites" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold block mb-2">
              Celestial Living
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Curated Luxury Suites
            </h2>
          </div>
          <button
            type="button"
            onClick={() => handleOpenChatWithPrompt("Book a Luxury Suite")}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>Ask Concierge to Compare All Suites</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ROOM_TIERS.map((room) => (
            <div
              key={room.id}
              className="group rounded-3xl overflow-hidden glass-card flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.tier}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-midnight-950/80 backdrop-blur-md text-[10px] font-bold text-gold-400 border border-gold-500/30">
                    {room.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-lg bg-midnight-950/80 text-[11px] font-bold text-white">
                    ${room.pricePerNight} <span className="text-[9px] text-gray-400">/nt</span>
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span>{room.type}</span>
                    <span>{room.sqft}</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-gold-300 transition-colors">
                    {room.tier}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2">
                    {room.view}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {room.amenities.slice(0, 2).map((a, i) => (
                      <span
                        key={i}
                        className="text-[9px] px-2 py-0.5 rounded-full bg-white/5 text-gray-300"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => handleOpenChatWithPrompt(`Book ${room.tier}`)}
                  className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-gold-500 hover:text-midnight-950 text-gold-300 text-xs font-bold transition-all border border-gold-500/30 flex items-center justify-center space-x-1.5"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Reserve via AI</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dining & Cellar Section */}
      <section id="dining" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold block mb-2">
              Culinary Artistry
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Starlit Gastronomy
            </h2>
          </div>
          <button
            type="button"
            onClick={() => handleOpenChatWithPrompt("Reserve a Dining Table")}
            className="mt-4 md:mt-0 flex items-center space-x-2 text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors"
          >
            <span>Reserve Table via Concierge</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DINING_TABLES.map((table) => (
            <div
              key={table.id}
              className="group rounded-3xl overflow-hidden glass-card flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={table.image}
                    alt={table.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-midnight-950/80 backdrop-blur-md text-[10px] font-bold text-amber-300 border border-amber-500/30">
                    {table.badge}
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gold-400 font-medium">{table.type}</span>
                    <span className="font-bold text-white">${table.pricePerPerson}/guest</span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-gold-300 transition-colors">
                    {table.name}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {table.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => handleOpenChatWithPrompt(`Reserve table at ${table.name}`)}
                  className="w-full py-2.5 rounded-xl bg-white/[0.06] hover:bg-gold-500 hover:text-midnight-950 text-gold-300 text-xs font-bold transition-all border border-gold-500/30 flex items-center justify-center space-x-1.5"
                >
                  <Utensils className="w-3.5 h-3.5" />
                  <span>Reserve Seating</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Events & Galas Section */}
      <section id="events" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="rounded-3xl bg-gradient-to-br from-midnight-900 via-midnight-850 to-midnight-900 border border-gold-500/30 p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-bold block">
              Private Curations
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">
              Host Your Legend at Aura Grand
            </h2>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
              From sky-terrace wedding galas to exclusive VIP birthdays and corporate luminary summits.
              Our AI Concierge instantly calculates guest seating, catering options, and locks your date.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleOpenChatWithPrompt("Plan an Exclusive Event")}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-amber-500 text-midnight-950 font-bold text-xs shadow-gold-glow hover:brightness-110 active:scale-95 transition-all flex items-center space-x-2"
              >
                <GlassWater className="w-4 h-4" />
                <span>Configure Event Package</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 md:px-12 border-t border-white/10 bg-midnight-950 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-500/40 flex items-center justify-center font-serif font-bold text-gold-400">
              A
            </div>
            <div>
              <span className="text-sm font-bold text-white font-serif tracking-wider">
                {HOTEL_INFO.name}
              </span>
              <p className="text-[10px] text-gray-500">{HOTEL_INFO.tagline}</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-[11px]">
            <span>Hotel Management Demo - Dynamic Agent</span>
            <span>•</span>
            <span>n8n Webhook Ready</span>
            <span>•</span>
            <span>Antigravity 3D UI</span>
          </div>

          <div className="text-[11px] text-gray-500">
            © 2026 Aura Grand Palace. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Floating Persistent AI Concierge Launcher */}
      {!isChatOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={() => setIsChatOpen(true)}
            className="group relative flex items-center space-x-3 p-2 pr-5 rounded-full bg-midnight-900/90 hover:bg-midnight-900 border border-gold-500/50 shadow-gold-glow hover:shadow-gold-glow-lg transition-all active:scale-95 cursor-pointer backdrop-blur-xl"
          >
            {/* Glowing Bot Icon */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-gold-500 via-amber-500 to-gold-400 p-[1.5px] shadow-gold-glow">
              <div className="w-full h-full rounded-full bg-midnight-950 flex items-center justify-center">
                <Bot className="w-6 h-6 text-gold-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>

            <div className="text-left">
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-white">AI Concierge</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[10px] text-gold-300 font-medium block">
                Tap to Reserve & Pay
              </span>
            </div>
          </button>
        </div>
      )}

      {/* Mount ChatModal */}
      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        initialPrompt={chatPrompt}
        onClearInitialPrompt={() => setChatPrompt("")}
      />
    </div>
  );
}

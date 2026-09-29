"use client";

import React from "react";
import { Sparkles, Database, Loader2 } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex items-start space-x-2.5 my-3">
      {/* Glowing Agent Icon with Orbiting Glow */}
      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-gold-500 via-amber-500 to-gold-400 p-[1px] shadow-gold-glow flex-shrink-0 mt-0.5">
        <div className="w-full h-full rounded-[11px] bg-midnight-950 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-gold-400 animate-spin" style={{ animationDuration: "4s" }} />
        </div>
      </div>

      {/* Persistent Thinking State with Skeleton Shimmer */}
      <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-midnight-900/90 border border-gold-500/30 backdrop-blur-xl shadow-glass-card max-w-[85%] space-y-2">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-3.5 h-3.5 text-gold-400 animate-spin" />
          <span className="text-xs text-gold-300 font-semibold tracking-wide">
            Agent is typing...
          </span>
          <div className="flex space-x-1 items-center pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>

        {/* Skeleton Shimmer Bars representing database query / LLM reasoning */}
        <div className="space-y-1.5 pt-1">
          <div className="h-2 w-48 rounded bg-gradient-to-r from-white/5 via-gold-400/20 to-white/5 animate-pulse" />
          <div className="h-2 w-36 rounded bg-gradient-to-r from-white/5 via-gold-400/15 to-white/5 animate-pulse" style={{ animationDelay: "200ms" }} />
        </div>

        <div className="flex items-center space-x-1.5 text-[10px] text-gray-400 pt-0.5 font-mono">
          <Database className="w-3 h-3 text-gold-500/70" />
          <span>Processing database &amp; availability...</span>
        </div>
      </div>
    </div>
  );
}

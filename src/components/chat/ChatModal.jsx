"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles } from "lucide-react";
import ChatMessage from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

export default function ChatModal({ isOpen, onClose, initialPrompt, onClearInitialPrompt }) {
  // Generate or retrieve persistent session ID for the guest
  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      let saved = localStorage.getItem("aura_guest_session_id");
      if (!saved || saved.length < 8) {
        saved = `session_${Math.random().toString(36).substring(2, 10)}_${Date.now()}`;
        localStorage.setItem("aura_guest_session_id", saved);
      }
      return saved;
    }
    return `session_${Date.now()}`;
  });

  const [messages, setMessages] = useState([
    {
      id: "initial_welcome",
      sender: "agent",
      reply:
        "Greetings. I am your Aura AI Concierge. I can help you explore our luxury suites, check real-time availability, confirm a reservation, or generate instant payment QR passes. How may I assist your stay?",
      booking_data: null,
      qr_url: "",
      timestamp: "Just now",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, isTyping]);

  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSend(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt, isOpen]);

  // Client-Side Fetch & State Mapping Logic
  const handleSend = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isTyping) return;

    const userMsg = {
      id: `user_${Date.now()}`,
      sender: "user",
      message: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // 1. Immediately append user message & activate persistent "Agent is typing..." state
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // 2. Send message to local server proxy (/api/chat) to bypass CORS and handle long-polling
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text.trim(),
          session_id: sessionId,
        }),
      });

      // 3. Handle non-200 responses (e.g. 504 Gateway Timeout or 500)
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errorMessage =
          errorData.reply ||
          errorData.message ||
          errorData.error ||
          `Request failed with status ${res.status}`;

        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `agent_err_${Date.now()}`,
            sender: "agent",
            reply: `⚠️ ${errorMessage}`,
            booking_data: null,
            qr_url: "",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
        return;
      }

      // 4. Parse incoming JSON: { success, reply, booking_data, qr_url }
      const data = await res.json();
      console.log("Raw response from n8n backend:", data);

      setIsTyping(false);

      // 5. Append agent response to chat history
      const agentMsg = {
        id: `agent_${Date.now()}`,
        sender: "agent",
        reply: data.reply || data.message || "",
        booking_data: data.booking_data || data.booking || null,
        qr_url: data.qr_url || "",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      console.error("Chat client fetch error:", err);
      setIsTyping(false);

      setMessages((prev) => [
        ...prev,
        {
          id: `agent_err_${Date.now()}`,
          sender: "agent",
          reply: `⚠️ Connection Error: ${err.message}. Please check your connection.`,
          booking_data: null,
          qr_url: "",
          timestamp: "Just now",
        },
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end sm:p-6 pointer-events-none">
      {/* Mobile backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-midnight-950/60 backdrop-blur-sm sm:hidden pointer-events-auto transition-opacity"
      />

      {/* Floating Chat Window Overlay (Antigravity 3D Design) */}
      <div className="pointer-events-auto relative w-full sm:w-[450px] h-[660px] max-h-[90vh] rounded-t-3xl sm:rounded-3xl bg-midnight-950/90 border border-gold-500/30 shadow-2xl shadow-gold-glow/20 backdrop-blur-2xl flex flex-col overflow-hidden z-10 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-right-4">
        
        {/* ELEMENT 3: Top Bar with Title and Subtle Close/Minimize 'X' Button */}
        <div className="px-5 py-3.5 border-b border-white/10 bg-midnight-950/90 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-gold-500 to-amber-500 p-[1px] shadow-gold-glow">
              <div className="w-full h-full rounded-[11px] bg-midnight-950 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-gold-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-white tracking-wide">
                Aura AI Concierge
              </h3>
              <p className="text-[10px] text-emerald-400 flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live n8n Agent</span>
              </p>
            </div>
          </div>

          {/* Subtle Close 'X' Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="p-1.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ELEMENT 1: The Chat History Container (Displaying Messages, QR Widget & Digital Receipt) */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onSelectCardAction={(cardText) => handleSend(cardText)}
            />
          ))}

          {/* Persistent "Agent is typing..." Loading Animation */}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* ELEMENT 2: Simple, Floating Text Input Field with a Single "Send" Icon */}
        <div className="p-3.5 border-t border-white/10 bg-midnight-950/80 backdrop-blur-md flex-shrink-0">
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center rounded-2xl bg-midnight-900/90 border border-gold-500/30 p-1.5 shadow-glass-card focus-within:border-gold-500 focus-within:shadow-gold-glow transition-all"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about rooms, availability, booking, or payments..."
              className="flex-1 bg-transparent px-3 py-1.5 text-xs text-white placeholder-gray-400 focus:outline-none"
            />

            {/* Single Send Icon Button */}
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              className={`p-2 rounded-xl transition-all flex items-center justify-center flex-shrink-0 cursor-pointer ${
                inputValue.trim() && !isTyping
                  ? "bg-gradient-to-r from-gold-500 to-amber-500 text-midnight-950 shadow-gold-glow hover:brightness-110 active:scale-95"
                  : "bg-white/5 text-gray-500 cursor-not-allowed"
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

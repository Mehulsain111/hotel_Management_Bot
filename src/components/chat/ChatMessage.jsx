"use client";

import React from "react";
import { Sparkles, User } from "lucide-react";
import QRCodeWidget from "./widgets/QRCodeWidget";
import DigitalReceiptCard from "./widgets/DigitalReceiptCard";
import RoomCard from "./cards/RoomCard";
import TableCard from "./cards/TableCard";
import EventCard from "./cards/EventCard";

export default function ChatMessage({ message, onSelectCardAction }) {
  const isAgent = message.sender === "agent";

  // Text response from the agent
  const messageText = message.reply || message.message || message.text || "";

  // Dynamic widgets from n8n response contract
  const qrUrl = message.qr_url || "";
  const hasQrUrl = Boolean(qrUrl && typeof qrUrl === "string" && qrUrl.trim().length > 0);

  const bookingData = message.booking_data || message.booking || null;
  const hasBookingData = Boolean(
    bookingData &&
      typeof bookingData === "object" &&
      Object.keys(bookingData).length > 0 &&
      (bookingData.hotel_name || bookingData.room_type || bookingData.total_price || bookingData.booking_id)
  );

  const widgetType = (message.widget_type || message.card_type || message.card || "").toLowerCase();

  return (
    <div className={`flex flex-col my-3 ${isAgent ? "items-start" : "items-end"}`}>
      <div
        className={`flex items-start space-x-2.5 max-w-[95%] sm:max-w-[88%] ${
          isAgent ? "flex-row" : "flex-row-reverse space-x-reverse"
        }`}
      >
        {/* Avatar */}
        {isAgent ? (
          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-gold-500 via-amber-500 to-gold-400 p-[1px] shadow-gold-glow flex-shrink-0 mt-0.5">
            <div className="w-full h-full rounded-[11px] bg-midnight-950 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            </div>
          </div>
        ) : (
          <div className="w-7 h-7 rounded-xl bg-slate-800 border border-white/20 flex items-center justify-center flex-shrink-0 text-gray-300 mt-0.5 shadow-sm">
            <User className="w-3.5 h-3.5" />
          </div>
        )}

        {/* Message Content Container */}
        <div className="flex flex-col">
          {/* Agent Header Tag */}
          {isAgent && (
            <div className="flex items-center space-x-2 mb-1 px-1">
              <span className="text-[11px] font-semibold text-gold-400">
                Aura Concierge
              </span>
              <span className="text-[9px] text-gray-500 font-mono">
                {message.timestamp || "Just now"}
              </span>
            </div>
          )}

          {/* Standard Chat Bubble */}
          {messageText && (
            <div
              className={`rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed transition-all shadow-md ${
                isAgent
                  ? "rounded-tl-sm bg-midnight-900/90 text-gray-200 border border-gold-500/25 shadow-glass-card backdrop-blur-xl"
                  : "rounded-tr-sm bg-gradient-to-r from-gold-500 via-amber-500 to-gold-600 text-midnight-950 font-medium shadow-gold-glow"
              }`}
            >
              <p className="whitespace-pre-wrap">{messageText}</p>
            </div>
          )}

          {/* DYNAMIC UI RENDERING FOR AGENT RESPONSES */}
          {isAgent && (
            <div className="w-full space-y-2">
              {/* 1. Antigravity 3D Styled QR Code Widget immediately below text reply */}
              {hasQrUrl && (
                <QRCodeWidget
                  qrUrl={qrUrl}
                  amount={bookingData?.total_price ? `₹${bookingData.total_price}` : undefined}
                />
              )}

              {/* 2. Polished Digital Receipt Card showing hotel name, room type, dates, price */}
              {hasBookingData && (
                <DigitalReceiptCard bookingData={bookingData} />
              )}

              {/* 3. Interactive Selection Cards if triggered */}
              {(widgetType === "room" || widgetType === "room_selection") && !hasBookingData && (
                <RoomCard data={message.data} onSelect={onSelectCardAction} />
              )}
              {(widgetType === "table" || widgetType === "dining") && (
                <TableCard data={message.data} onSelect={onSelectCardAction} />
              )}
              {(widgetType === "event" || widgetType === "banquet") && (
                <EventCard data={message.data} onSelect={onSelectCardAction} />
              )}
            </div>
          )}

          {/* User Timestamp */}
          {!isAgent && (
            <div className="flex items-center justify-end space-x-1 mt-1 px-1">
              <span className="text-[9px] text-gray-500 font-mono">
                {message.timestamp || "Sent"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

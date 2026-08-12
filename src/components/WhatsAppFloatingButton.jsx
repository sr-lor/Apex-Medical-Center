"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-6 left-6 z-50 group">
      <a
        href="https://wa.me/96897031500"
        target="_blank"
        rel="noreferrer"
        aria-label="احجز موعدك"
        className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE57] text-white shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 border-2 border-white/20 relative"
      >
        <MessageCircle className="w-6 h-6 fill-current animate-pulse" />
      </a>
      {/* Tooltip on Hover */}
      <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap border border-white/10 pointer-events-none">
        احجز موعدك
      </div>
    </div>
  );
}

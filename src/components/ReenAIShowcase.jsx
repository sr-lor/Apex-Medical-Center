"use client";

import { Sparkles, Bot, ArrowLeft } from "lucide-react";

export default function ReenAIShowcase() {
  const triggerChat = (promptText = null) => {
    window.dispatchEvent(
      new CustomEvent("open_reen_chat", {
        detail: { prompt: promptText },
      })
    );
  };

  return (
    <section className="py-8 sm:py-10 bg-gradient-to-r from-[#120E10] via-[#1A1517] to-[#120E10] text-white border-y border-apex-gold/20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-apex-gold/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-right">
        
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-apex-gold/10 border border-apex-gold/30 px-3 py-1 rounded-full text-[11px] font-bold text-apex-gold">
            <Sparkles className="w-3.5 h-3.5 text-apex-gold animate-spin-slow" />
            <span>المساعد الذكي للمجمع • رين AI</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            استفسارات فورية عن الخدمات والمواعيد مع <span className="text-gradient-apex">رين AI</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
            إجابة فائقة السرعة والدقة لجميع استفسارات العيادات والفروع (العذيبة والعامرات) وأوقات العمل.
          </p>
        </div>

        {/* Clean Action Button */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={() => triggerChat()}
            className="px-7 py-3.5 bg-gradient-to-r from-apex-gold via-amber-400 to-apex-gold-dark text-slate-950 font-black rounded-2xl shadow-lg hover:shadow-apex-gold/20 hover:scale-105 transition-all inline-flex items-center justify-center gap-2.5 cursor-pointer text-xs sm:text-sm border border-amber-300"
          >
            <Bot className="w-5 h-5 text-slate-950" />
            <span>تحدث مع رين AI الآن</span>
            <ArrowLeft className="w-4 h-4 text-slate-950" />
          </button>
        </div>

      </div>
    </section>
  );
}

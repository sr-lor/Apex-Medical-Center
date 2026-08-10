"use client";

import { Building2, Sparkles, Award, ShieldCheck } from "lucide-react";

export default function StatsSection() {
  const branchHighlights = [
    {
      icon: Building2,
      title: "فرع العذيبة (الرئيسي)",
      subtitle: "كافة التخصصات الجراحية والتجميلية وطب الأسنان",
    },
    {
      icon: Sparkles,
      title: "فرع العامرات",
      subtitle: "عيادات التخسيس والسمنة • ليزر والبشرة • طب عام",
    },
    {
      icon: Award,
      title: "نخبة استشارية",
      subtitle: "خبرات طبية عالمية معتمدة ورعاية تخصصية",
    },
    {
      icon: ShieldCheck,
      title: "خدمة رين AI وحجز أونلاين",
      subtitle: "متابعة واستشارات فورية وحجز سريع على مدار الساعة",
    },
  ];

  return (
    <section className="py-8 bg-[#151112] text-white border-y border-apex-gold/20 relative">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {branchHighlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-apex-gold/40 transition-all text-right"
              >
                <div className="w-11 h-11 rounded-xl bg-apex-gold/20 flex items-center justify-center text-apex-gold flex-shrink-0 border border-apex-gold/30">
                  <Icon className="w-5 h-5 text-apex-gold" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-white mb-0.5">{item.title}</h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">{item.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

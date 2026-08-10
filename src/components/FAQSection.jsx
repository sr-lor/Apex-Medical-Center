"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      q: "كيف يمكنني حجز موعد في مجمع القمة الطبي؟",
      a: "يمكنك حجز الموعد مباشرة عبر النموذج الإلكتروني بموقعنا، أو من خلال الاتصال بالخط الساخن وتطبيق الواتساب (+968 97031500)، أو عبر محادثة مساعدنا الطبي الذكي رين AI.",
    },
    {
      q: "ما هي الخدمات المتاحة في فرع العامرات وفرع العذيبة؟",
      a: "يضم فرع العذيبة الرئيسي كافة التخصصات وجراحات الأسنان والتجميل والسمنة والعظام والنساء. بينما يضم فرع العامرات عيادة السمنة والتخسيس، عيادة الليزر والبشرة، وعيادة الطب العام.",
    },
    {
      q: "هل تتوفر تسهيلات الدفع أو خطط السداد للعمليات الكبرى؟",
      a: "نعم، يقدم مجمع القمة الطبي خيارات دفع مرنة وتسهيلات مخصصة لعمليات التجميل، زراعة الأسنان، وجراحات السمنة بالتنسيق مع الشركات والشركاء المعتمدين.",
    },
    {
      q: "ما هي أحدث تقنيات إزالة الشعر بالليزر المتوفرة في المركز؟",
      a: "نستخدم أحدث أجهزة الليزر الطبية المزدوجة التي تناسب مختلف درجات وأنواع البشرة العمانية بأعلى كفاءة وبدون ألم.",
    },
    {
      q: "هل يتم إجراء سحب عصب الأسنان في جلسة واحدة؟",
      a: "نعم، يتم علاج وتنظيف الجذور تحت المجهر الإلكتروني في جلسة واحدة مريحة وبدون ألم على يد استشاري علاج الجذور.",
    },
    {
      q: "أين يقع موقع مجمع القمة الطبي في عمان؟",
      a: "يقع فرع العذيبة في سلطنة عمان - مسقط، منطقة القرم الطبية شارع السلطان قابوس، ويقع فرع العامرات في الشارع العام بالعامرات مع سعة مواقف وسهولة وصول.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-20 bg-[#0B0A0C] text-white border-t border-white/10">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-apex-gold text-xs font-extrabold px-4 py-1.5 rounded-full border border-apex-gold/30">
            <HelpCircle className="w-4 h-4 text-apex-gold" />
            الأسئلة الشائعة
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            إجابات على أهم <span className="text-gradient-apex">استفسارات المراجعين</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-[#151112]/90 rounded-2xl border border-apex-gold/20 shadow-md overflow-hidden transition-all text-right"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="w-full p-5 text-right flex items-center justify-between font-bold text-white text-sm sm:text-base hover:text-apex-gold transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-apex-gold transition-transform duration-300 ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-3 font-light">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

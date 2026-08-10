import { Star, Quote, MessageSquare } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      treatment: "ابتسامة هوليود وتجميل الأسنان",
      content: "تجربة ممتازة جداً وحقيقية في مجمع القمة الطبي. التعامل راقٍ للغاية والنتائج طبيعية ومتقنة بدون أي ألم أثناء التركيب.",
      rating: 5,
      location: "فرع العذيبة - سلطنة عمان",
    },
    {
      id: 2,
      treatment: "عيادة السمنة وجلسات الليزر",
      content: "نتائج أجهزة الليزر الطبية ومتابعة برنامج السمنة والتخسيس ممتازة للغاية، وطاقم الاستقبال والتمريض يمنحك شعوراً بالراحة والاطمئنان.",
      rating: 5,
      location: "فرع العامرات - مسقط",
    },
    {
      id: 3,
      treatment: "علاج المفاصل وجراحة العظام",
      content: "عناية طبية تشخيصية متميزة واستشارة دقيقة أدت إلى زوال الآلام واستعادة الحركة الطبيعية بحمد الله. شكراً لمجمع القمة الطبي.",
      rating: 5,
      location: "سلطنة عمان - صحار",
    },
  ];

  return (
    <section className="py-20 bg-[#0B0A0C] text-white border-t border-white/10">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-apex-gold text-xs font-extrabold px-4 py-1.5 rounded-full border border-apex-gold/30">
            <MessageSquare className="w-4 h-4 text-apex-gold" />
            آراء وتجارب مراجعي المركز
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            ماذا يقول مراجعونا عن <span className="text-gradient-apex">مجمع القمة الطبي</span>
          </h2>
          <p className="text-slate-300 text-sm font-light">
            نعتز بتجارب مراجعينا الحقيقية وثقتهم الغالية في خدماتنا الطبية والتجميلية في فرعينا.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-[#151112]/90 rounded-3xl p-7 border border-apex-gold/20 shadow-2xl relative flex flex-col justify-between hover:border-apex-gold/50 hover:-translate-y-1 transition-all text-right"
            >
              <div>
                <Quote className="w-8 h-8 text-apex-gold/40 mb-4" />
                <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  "{t.content}"
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-white text-xs">{t.treatment}</h4>
                  <p className="text-[11px] text-apex-gold mt-0.5">{t.location}</p>
                </div>

                <div className="flex text-amber-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

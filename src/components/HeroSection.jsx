import { Phone, Shield, Sparkles, Calendar, Award, CheckCircle2, MessageCircle } from "lucide-react";

export default function HeroSection({ onOpenBooking }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-[#151112] via-[#1E1B1C] to-[#0A0A0C] text-white overflow-hidden border-b border-apex-gold/20">
      {/* Background Decorative Gold Glows */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-apex-gold/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-apex-gold-deep/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column: Hero Text Content */}
          <div className="lg:col-span-7 space-y-6 text-right">
            
            {/* Top Badge & Branch Highlights */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-apex-gold/30 px-4 py-1.5 rounded-full text-xs font-bold text-apex-gold shadow-lg">
                <Sparkles className="w-4 h-4 text-apex-gold animate-spin-slow" />
                <span>المركز الطبي الرائد في سلطنة عمان (فرع العذيبة & فرع العامرات)</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
              رعاية صحية وتجميلية متكاملة في{" "}
              <span className="text-gradient-apex">مجمع القمة الطبي</span>
            </h1>

            {/* Sub-headline / Paragraph */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-light">
              نجمع بين الخبرات الاستشارية العالمية وأحدث التقنيات الرقمية في طب وتجميل الأسنان، الجراحة التجميلية، عيادات الجلدية والليزر، وجراحات إدارة السمنة والوزن بأعلى مستويات الخصوصية والراحة في فرعينا (العذيبة والعامرات).
            </p>

            {/* Feature Checkmarks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-200 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-apex-gold flex-shrink-0" />
                <span>فرع العذيبة: كافة التخصصات والجراحات</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-apex-gold flex-shrink-0" />
                <span>فرع العامرات: عيادات السمنة والليزر والطب العام</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-apex-gold flex-shrink-0" />
                <span>رين AI: مساعد طبي ذكي للإجابة المباشرة 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-apex-gold flex-shrink-0" />
                <span>أجهزة رقمية حديثة وحجز موعد أونلاين سريع</span>
              </div>
            </div>

            {/* CTA Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href="https://wa.me/96897031500?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D8%AC%D9%85%D8%B9%20%D8%A7%D9%84%D9%82%D9%85%D8%A9%20%D8%A7%D9%84%D8%B7%D8%A8%D9%8A"
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-3 text-base hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>احجز موعدك الآن</span>
              </a>

              <a
                href="https://wa.me/96897031500"
                target="_blank"
                rel="noreferrer"
                className="bg-[#25D366] hover:bg-[#1EBE57] text-white font-extrabold px-7 py-4 rounded-2xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2.5 text-sm hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>محادثة واتساب مباشرة</span>
              </a>
            </div>

          </div>

          {/* Left Column: Image Showcase Grid */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              {/* Main Image Frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-apex-gold/30 group">
                <img
                  src="/wp-content/uploads/2026/04/Our-Cosmetic-Dentistry-Services.jpg"
                  alt="Apex Medical Center Cosmetic Services"
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 right-4 left-4 p-4 bg-[#151112]/90 backdrop-blur-md rounded-2xl border border-apex-gold/30">
                  <p className="text-apex-gold font-bold text-sm">قسم طب وتجميل الأسنان</p>
                  <p className="text-slate-300 text-xs mt-0.5">ابتسامة هوليود وزراعة الأسنان بأحدث التقنيات الرقمية</p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-6 -right-6 bg-[#151112]/95 backdrop-blur-md border border-apex-gold/40 p-4 rounded-2xl shadow-2xl hidden sm:flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-apex-gold/20 flex items-center justify-center text-apex-gold">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-white text-xs font-bold">خبرة تتجاوز 12 عاماً</p>
                  <p className="text-slate-400 text-[10px]">في سلطنة عمان</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

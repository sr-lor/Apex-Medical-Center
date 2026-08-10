import { ShieldCheck, Target, Heart, Award, CheckCircle, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-20 bg-[#0B0A0C] min-h-screen text-white">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-16">
        
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-apex-gold text-xs font-extrabold px-4 py-1.5 rounded-full border border-apex-gold/30">
            <Sparkles className="w-4 h-4 text-apex-gold" />
            عن مركز القمة الطبي
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            الريادة في التخصصات الطبية والتجميلية في <span className="text-gradient-apex">سلطنة عمان</span>
          </h1>

          <p className="text-slate-300 text-base leading-relaxed font-light">
            تأسس مركز القمة الطبي (Apex Medical Center) ليكون الصرح الطبي المتكامل المفضل لدى العائلات والمراجعين، مقدماً أفضل الرعايات بالاعتماد على أحدث التقنيات وأفضل الكوادر الطبية الدولية في فرعينا (العذيبة والعامرات).
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#151112] p-8 sm:p-12 rounded-3xl border border-apex-gold/20 shadow-2xl text-right">
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              رؤيتنا ورسالتنا لخدمة المجتمع العماني
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              في مركز القمة الطبي، نؤمن بأن الصحة والجمال يكتملان بالثقة والأمان. نكرس خبراتنا لتوفير بيئة تخصصية فائقة النظافة والخصوصية، مدعومة بأحدث التقنيات كطب الأسنان الرقمي، وجراحات المناظير، وأجهزة الليزر الطبية الأحدث من أوروبا والولايات المتحدة.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-slate-200 font-semibold text-sm">
                <CheckCircle className="w-5 h-5 text-apex-gold flex-shrink-0" />
                <span>كادر طبي مؤهل مع استشاريين عالميين في كل قسم.</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 font-semibold text-sm">
                <CheckCircle className="w-5 h-5 text-apex-gold flex-shrink-0" />
                <span>التزام مطلق بأعلى معايير التعقيم والسلامة الطبية.</span>
              </div>
              <div className="flex items-center gap-3 text-slate-200 font-semibold text-sm">
                <CheckCircle className="w-5 h-5 text-apex-gold flex-shrink-0" />
                <span>خطط علاجية مخصصة تناسب كل مراجع على حدة.</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-apex-gold/30">
            <img
              src="/wp-content/uploads/2026/02/Apex_Medical_center_about_section.jpg"
              alt="Apex Medical Team - مركز القمة الطبي"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#151112] p-8 rounded-3xl border border-apex-gold/20 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 bg-white/10 text-apex-gold rounded-2xl flex items-center justify-center mx-auto border border-apex-gold/30">
              <Target className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">الدقة والجودة</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              نلتزم باستخدام الأجهزة والتجهيزات الرقمية المعتمدة عالمياً لضمان أعلى نسب النجاح في التشخيص والعلاج.
            </p>
          </div>

          <div className="bg-[#151112] p-8 rounded-3xl border border-apex-gold/20 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 bg-white/10 text-apex-gold rounded-2xl flex items-center justify-center mx-auto border border-apex-gold/30">
              <Heart className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">الرعاية والاهتمام</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              نضع راحة المريض وخصوصيته في مقدمة أولوياتنا طوال رحلة العلاج والتعافي.
            </p>
          </div>

          <div className="bg-[#151112] p-8 rounded-3xl border border-apex-gold/20 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 bg-white/10 text-apex-gold rounded-2xl flex items-center justify-center mx-auto border border-apex-gold/30">
              <Award className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">الخبرة الاستشارية</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              نخبة ممتازة من الأطباء والاستشاريين الحاصلين على أرقى الشهادات والخبرات الطبية الدولية.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

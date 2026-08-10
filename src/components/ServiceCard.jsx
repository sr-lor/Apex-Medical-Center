import Link from "next/link";
import { Smile, Sparkles, UserCheck, Activity, Bone, HeartPulse, ChevronLeft, CheckCircle2 } from "lucide-react";

const iconMap = {
  Smile: Smile,
  Sparkles: Sparkles,
  UserCheck: UserCheck,
  Activity: Activity,
  Bone: Bone,
  HeartPulse: HeartPulse,
};

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.iconName] || Sparkles;

  return (
    <div className="bg-[#151112]/90 rounded-3xl border border-apex-gold/20 p-6 shadow-2xl hover:border-apex-gold/50 hover:bg-[#1A1517] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 text-right">
      <div>
        {/* Service Image Header */}
        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 bg-slate-900 border border-white/10">
          <img
            src={service.image}
            alt={service.titleAr}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0C] via-transparent to-transparent"></div>
          
          {/* Branch Badge */}
          <div className="absolute top-3 right-3 bg-[#0B0A0C]/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold text-apex-gold border border-apex-gold/30 shadow-md">
            {service.branchIds?.includes("azaiba") && service.branchIds?.includes("amerat")
              ? "فرع العذيبة والعامرات"
              : service.branchIds?.includes("amerat")
              ? "فرع العامرات"
              : "فرع العذيبة"}
          </div>

          <div className="absolute bottom-3 right-3 bg-[#151112]/95 backdrop-blur-md p-2.5 rounded-2xl shadow-md text-apex-gold border border-apex-gold/30">
            <IconComponent className="w-6 h-6" />
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-apex-gold transition-colors">
          {service.titleAr}
        </h3>
        <p className="text-slate-300 text-xs leading-relaxed mb-4 font-light">
          {service.descriptionAr}
        </p>

        {/* Key Features Bullet Points */}
        <div className="space-y-2 mb-6">
          {service.featuresAr.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-apex-gold flex-shrink-0" />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learn More link */}
      <Link
        href={`/services/${service.slug}`}
        className="w-full py-2.5 bg-white/5 hover:bg-apex-gold hover:text-slate-950 text-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-white/10 hover:border-apex-gold"
      >
        <span>عرض تفاصيل القسم</span>
        <ChevronLeft className="w-4 h-4" />
      </Link>
    </div>
  );
}

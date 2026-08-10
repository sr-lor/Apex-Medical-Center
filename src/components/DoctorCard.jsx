import { Calendar, Clock, Award, MapPin } from "lucide-react";

export default function DoctorCard({ doctor, onBook }) {
  const branchText = doctor.branchIds?.includes("amerat") && doctor.branchIds?.includes("azaiba")
    ? "فرع العذيبة والعامرات"
    : doctor.branchIds?.includes("amerat")
    ? "فرع العامرات"
    : "فرع العذيبة";

  return (
    <div className="bg-[#151112]/90 rounded-3xl border border-apex-gold/20 p-5 shadow-2xl hover:border-apex-gold/50 hover:bg-[#1A1517] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 text-right">
      <div>
        {/* Doctor Image */}
        <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-4 bg-slate-900 border border-white/10">
          <img
            src={doctor.image}
            alt={doctor.nameAr}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 bg-[#151112]/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-apex-gold shadow-sm flex items-center gap-1 border border-apex-gold/30">
            <Award className="w-3.5 h-3.5 text-apex-gold" />
            <span>{doctor.specialtyAr}</span>
          </div>

          <div className="absolute bottom-3 right-3 bg-[#0B0A0C]/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold text-slate-200 flex items-center gap-1 border border-white/10">
            <MapPin className="w-3 h-3 text-apex-gold" />
            <span>{branchText}</span>
          </div>
        </div>

        {/* Doctor Details */}
        <h3 className="text-xl font-extrabold text-white mb-1 group-hover:text-apex-gold transition-colors">
          {doctor.nameAr}
        </h3>
        <p className="text-apex-gold text-xs font-semibold mb-3 min-h-[32px]">
          {doctor.titleAr}
        </p>

        <p className="text-slate-300 text-xs leading-relaxed mb-4 line-clamp-2 font-light">
          {doctor.experienceAr}
        </p>

        {/* Availability */}
        <div className="bg-white/5 p-2.5 rounded-xl text-xs text-slate-300 flex items-center gap-2 mb-4 border border-white/10">
          <Clock className="w-4 h-4 text-apex-gold flex-shrink-0" />
          <span>دوام المركز: السبت - الخميس (09:00 ص - 09:00 م)</span>
        </div>
      </div>

      {/* Action CTA */}
      <button
        onClick={() => onBook(doctor.id)}
        className="w-full py-2.5 bg-gradient-to-r from-apex-gold to-apex-gold-dark hover:from-apex-gold-dark hover:to-apex-gold-deep text-slate-950 rounded-xl font-extrabold text-xs transition-colors flex items-center justify-center gap-2 shadow-gold"
      >
        <Calendar className="w-4 h-4 text-slate-950" />
        <span>حجز موعد مع الطبيب</span>
      </button>
    </div>
  );
}

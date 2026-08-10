"use client";

import { X, Calendar, Award, MapPin, CheckCircle2, UserCheck, ShieldCheck } from "lucide-react";

export default function DoctorDetailsModal({ doctor, isOpen, onClose, onBook }) {
  if (!isOpen || !doctor) return null;

  const branchText = doctor.branchIds?.includes("amerat") && doctor.branchIds?.includes("azaiba")
    ? "فرع العذيبة والعامرات"
    : doctor.branchIds?.includes("amerat")
    ? "فرع العامرات"
    : "فرع العذيبة";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-[#151112] border border-apex-gold/30 rounded-3xl shadow-2xl overflow-hidden text-right max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Modal */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-[#0B0A0C]">
          <div className="flex items-center gap-2 text-apex-gold">
            <UserCheck className="w-5 h-5 text-apex-gold" />
            <h3 className="text-lg font-extrabold text-white">الملف الشخصي والمؤهلات الطبية</h3>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-right">
          
          {/* Top Info Banner */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 bg-white/5 p-4 rounded-2xl border border-white/10">
            <div className="relative w-32 h-36 sm:w-36 sm:h-40 rounded-2xl overflow-hidden bg-slate-900 border border-apex-gold/30 flex-shrink-0">
              <img
                src={doctor.image}
                alt={doctor.nameAr}
                className="w-full h-full object-cover object-top"
              />
            </div>

            <div className="flex-1 space-y-2 text-center sm:text-right">
              <div className="inline-flex items-center gap-1.5 bg-apex-gold/20 text-apex-gold text-xs font-bold px-3 py-1 rounded-full border border-apex-gold/30">
                <Award className="w-3.5 h-3.5" />
                <span>{doctor.specialtyAr}</span>
              </div>

              <h2 className="text-2xl font-extrabold text-white">{doctor.nameAr}</h2>
              <p className="text-apex-gold text-sm font-semibold">{doctor.titleAr}</p>

              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-slate-300 pt-1">
                <MapPin className="w-3.5 h-3.5 text-apex-gold" />
                <span>المركز: {branchText}</span>
              </div>
            </div>
          </div>

          {/* Full Bio Section */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-apex-gold flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-apex-gold" />
              <span>النبذة السريرية والمؤهلات العلمية:</span>
            </h4>
            <p className="text-slate-200 text-sm leading-relaxed font-light bg-white/5 p-4 rounded-2xl border border-white/10 whitespace-pre-line">
              {doctor.experienceAr}
            </p>
          </div>

          {/* Specific Doctor Details */}
          {doctor.nameEn && (
            <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">الاسم بالإنجليزية:</span>
                <span className="font-semibold text-white">{doctor.nameEn}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">التخصص بالإنجليزية:</span>
                <span className="font-semibold text-white">{doctor.titleEn}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">حالة الاعتماد:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  طبيب مرخص ومعتمد لدى مجمع القمة الطبي
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        <div className="p-5 border-t border-white/10 bg-[#0B0A0C] flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={() => {
              onClose();
              onBook(doctor.id);
            }}
            className="w-full sm:flex-1 py-3 bg-gradient-to-r from-apex-gold to-apex-gold-dark hover:from-apex-gold-dark hover:to-apex-gold-deep text-slate-950 rounded-xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-gold"
          >
            <Calendar className="w-4 h-4 text-slate-950" />
            <span>حجز موعد مع الطبيب الآن</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 bg-white/10 hover:bg-white/20 text-slate-200 rounded-xl font-bold text-sm transition-colors border border-white/10"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}

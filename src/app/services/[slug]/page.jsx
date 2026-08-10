"use client";

import { useState } from "react";
import { initialServices, initialDoctors } from "@/lib/data-store";
import DoctorCard from "@/components/DoctorCard";
import BookingModal from "@/components/BookingModal";
import Link from "next/link";
import { CheckCircle2, ArrowRight, Phone, Calendar, ShieldCheck, Sparkles, UserCheck } from "lucide-react";

export default function ServiceDetailPage({ params }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState("");

  const service = initialServices.find((s) => s.slug === params.slug);

  if (!service) {
    return (
      <div className="pt-40 pb-20 text-center space-y-4 bg-slate-50 min-h-screen">
        <h1 className="text-3xl font-bold text-slate-900">القسم غير موجود</h1>
        <Link href="/services" className="text-apex-navy font-bold hover:underline">
          العودة لدليل الخدمات والإجراءات
        </Link>
      </div>
    );
  }

  const relatedDoctors = initialDoctors.filter((d) => d.specialtyId === service.id);

  const handleBookDoctor = (docId) => {
    setSelectedDocId(docId);
    setBookingOpen(true);
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-apex-navy">الرئيسية</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-apex-navy">إجراءاتنا وتخصصاتنا</Link>
          <span>/</span>
          <span className="text-apex-gold-deep font-bold">{service.titleAr}</span>
        </div>

        {/* Hero Header Banner */}
        <div className="bg-apex-navy text-white rounded-3xl p-8 sm:p-12 border border-apex-gold/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-apex-gold/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 bg-white/10 text-apex-gold text-xs font-bold px-4 py-1.5 rounded-full border border-apex-gold/30">
                <Sparkles className="w-4 h-4 text-apex-gold" />
                تخصصات مجمع القمة الطبي
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
                {service.titleAr}
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 font-mono">
                {service.titleEn}
              </p>

              <p className="text-slate-200 text-sm sm:text-base leading-relaxed pt-2">
                {service.shortDescriptionAr}
              </p>

              <div className="pt-4 flex flex-wrap gap-4">
                <button
                  onClick={() => handleBookDoctor("")}
                  className="bg-gradient-to-r from-apex-gold to-apex-gold-dark hover:from-apex-gold-dark hover:to-apex-gold-deep text-slate-950 px-8 py-3.5 rounded-2xl font-extrabold text-sm shadow-gold hover:shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-slate-950" />
                  <span>حجز موعد استشارة في هذا القسم</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20">
              <img src={service.image} alt={service.titleAr} className="w-full h-72 sm:h-80 object-cover" />
            </div>
          </div>
        </div>

        {/* Detailed Full Paragraphs Section (نسخ كامل النص من الموقع الأصلي) */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-card space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-2xl font-extrabold text-slate-900">
              تفاصيل ورعاية قسم <span className="text-gradient-apex">{service.titleAr}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">النص الكامل والمعتمد من مجمع القمة الطبي</p>
          </div>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            {service.fullParagraphsAr && service.fullParagraphsAr.map((para, idx) => (
              <p key={idx} className="bg-slate-50/70 p-5 rounded-2xl border border-slate-100 font-medium">
                {para}
              </p>
            ))}
          </div>

          {/* Sub-procedures list if available */}
          {service.subProcedures && service.subProcedures.length > 0 && (
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-lg">التخصصات والعلاجات التابعة لهذه العيادة:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.subProcedures.map((sub, idx) => (
                  <div key={idx} className="p-4 bg-apex-gold-light/40 rounded-2xl border border-apex-gold/30 text-xs sm:text-sm font-bold text-slate-900 flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-apex-gold-deep flex-shrink-0" />
                      <span>{sub.titleAr}</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">{sub.titleEn}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features List */}
          <div className="space-y-4 pt-6 border-t border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-lg">مميزات الخدمة والعناية:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.featuresAr.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-800 font-semibold p-3 bg-slate-50 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-apex-emerald flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Associated Doctors linked to this specialty */}
        {relatedDoctors.length > 0 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-2xl font-extrabold text-slate-900">
                  استشاريو وأطباء قسم <span className="text-gradient-apex">{service.titleAr}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">يمكنك حجز موعد مباشر مع الطبيب المختص بهذا الإجراء</p>
              </div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-apex-navy bg-apex-gold-light px-3 py-1.5 rounded-full border border-apex-gold/30">
                <UserCheck className="w-4 h-4 text-apex-gold-deep" />
                <span>{relatedDoctors.length} طبيب متاح</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedDoctors.map((doc) => (
                <DoctorCard key={doc.id} doctor={doc} onBook={handleBookDoctor} />
              ))}
            </div>
          </div>
        )}

      </div>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedDoctorId={selectedDocId}
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import { initialDoctors } from "@/lib/data-store";
import DoctorCard from "@/components/DoctorCard";
import { UserCheck, Sparkles, MapPin, Building2, Calendar, Phone } from "lucide-react";

export default function DoctorsPage() {
  const [activeBranch, setActiveBranch] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");

  const branchesList = [
    { id: "all", label: "جميع الفروع" },
    { id: "azaiba", label: "فرع العذيبة" },
    { id: "amerat", label: "فرع العامرات" },
  ];

  const categories = [
    { id: "all", nameAr: "جميع التخصصات" },
    { id: "cosmetic-dentistry", nameAr: "طب وتجميل الأسنان" },
    { id: "dermatology-cosmetology", nameAr: "الجلدية والتجميل" },
    { id: "plastic-surgery", nameAr: "الجراحة التجميلية" },
    { id: "weight-management", nameAr: "إدارة الوزن (سمنة)" },
    { id: "skin-care-laser-treatments", nameAr: "الليزر والبشرة" },
    { id: "general-medicine", nameAr: "طب عام" },
    { id: "orthopedic-surgery", nameAr: "جراحة العظام والمفاصل" },
    { id: "aesthetic-gynecology", nameAr: "الطب والتجميل النسائي" },
  ];

  let filteredDoctors = initialDoctors;

  if (activeBranch !== "all") {
    filteredDoctors = filteredDoctors.filter((d) => d.branchIds?.includes(activeBranch));
  }

  if (activeCategory !== "all") {
    filteredDoctors = filteredDoctors.filter((d) => d.specialtyId === activeCategory);
  }

  return (
    <div className="pt-32 pb-20 bg-[#0B0A0C] min-h-screen text-white">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-apex-gold text-xs font-extrabold px-4 py-1.5 rounded-full border border-apex-gold/30">
            <UserCheck className="w-4 h-4 text-apex-gold" />
            النخبة الطبية
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            أطباؤنا في <span className="text-gradient-apex">مجمع القمة الطبي</span>
          </h1>

          <p className="text-slate-300 text-base leading-relaxed font-light">
            نخبة من الاستشاريين والأخصائيين ذوي الخبرة العالمية لتقديم أفضل الرعاية الطبية والتجميلية.
          </p>
        </div>

        {/* Branch Filter Switcher Bar */}
        <div className="bg-[#151112] p-2 rounded-2xl border border-apex-gold/30 shadow-2xl max-w-md mx-auto flex items-center justify-center gap-1">
          <div className="hidden sm:flex items-center gap-1 text-apex-gold text-xs font-bold px-3">
            <Building2 className="w-4 h-4 text-apex-gold" />
            <span>الفرع:</span>
          </div>
          {branchesList.map((b) => (
            <button
              key={b.id}
              onClick={() => setActiveBranch(b.id)}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
                activeBranch === b.id
                  ? "bg-apex-gold text-slate-950 shadow-gold"
                  : "text-slate-200 hover:bg-white/10"
              }`}
            >
              {b.id !== "all" && <MapPin className="w-3.5 h-3.5 text-apex-gold" />}
              <span>{b.label}</span>
            </button>
          ))}
        </div>

        {/* Specialty Filter Tabs */}
        {activeBranch !== "amerat" && (
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all ${
                  activeCategory === cat.id
                    ? "bg-apex-gold text-slate-950 font-extrabold shadow-gold"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat.nameAr}
              </button>
            ))}
          </div>
        )}

        {/* Doctors Grid OR Empty State for Amerat */}
        {activeBranch === "amerat" ? (
          <div className="bg-[#151112] rounded-3xl p-10 border border-apex-gold/30 shadow-2xl text-center max-w-2xl mx-auto space-y-5 animate-fade-in my-8">
            <div className="w-20 h-20 rounded-full bg-apex-gold/20 text-apex-gold flex items-center justify-center mx-auto border border-apex-gold/40 shadow-inner">
              <UserCheck className="w-10 h-10 text-apex-gold" />
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-white">كادر الأطباء - فرع العامرات</h3>
              <div className="inline-block bg-apex-gold/20 text-apex-gold text-xs font-bold px-3.5 py-1 rounded-full border border-apex-gold/30">
                جاري تحديث القائمة - سيتوفر الأطباء قريباً
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed max-w-md mx-auto font-light">
              أطباء فرع العامرات سيتم إضافتهم قريباً جداً إلى المنصة. يمكنك حالياً حجز موعد استشارة عامة أو التواصل مباشرة لحجز مواعيد العيادات المتاحة (سمنة، ليزر، وطب عام).
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => handleBookDoctor("")}
                className="w-full sm:w-auto bg-gradient-to-r from-apex-gold to-apex-gold-dark text-slate-950 px-6 py-3 rounded-xl font-extrabold text-xs shadow-gold hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-slate-950" />
                <span>حجز موعد عام بفرع العامرات</span>
              </button>

              <a
                href="tel:96897031500"
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-slate-200 px-6 py-3 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-white/15"
              >
                <Phone className="w-4 h-4 text-apex-gold" />
                <span>اتصال مباشر: 97031500</span>
              </a>
            </div>
          </div>
        ) : filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDoctors.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-sm">
            لا يوجد أطباء متاحون في هذا التصنيف حالياً.
          </div>
        )}

      </div>
    </div>
  );
}

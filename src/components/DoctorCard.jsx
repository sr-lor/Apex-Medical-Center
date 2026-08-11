"use client";

import { useState } from "react";
import { Award, MapPin, Info, MessageCircle } from "lucide-react";
import DoctorDetailsModal from "./DoctorDetailsModal";

export default function DoctorCard({ doctor }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  const branchText = doctor.branchIds?.includes("amerat") && doctor.branchIds?.includes("azaiba")
    ? "فرع العذيبة والعامرات"
    : doctor.branchIds?.includes("amerat")
    ? "فرع العامرات"
    : "فرع العذيبة";

  const whatsappMessage = encodeURIComponent(
    `مرحباً مجمع القمة الطبي، أود الاستفسار والتواصل بخصوص ${doctor.nameAr} (${doctor.titleAr})`
  );
  const whatsappUrl = `https://wa.me/96897031500?text=${whatsappMessage}`;

  return (
    <>
      <div className="bg-[#151112]/90 rounded-3xl border border-apex-gold/20 p-5 shadow-2xl hover:border-apex-gold/50 hover:bg-[#1A1517] transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 text-right">
        <div>
          {/* Doctor Image */}
          <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-4 bg-slate-900 border border-white/10 cursor-pointer" onClick={() => setDetailsOpen(true)}>
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
          <p className="text-slate-300 text-sm font-medium mb-1.5 min-h-[28px]">
            {doctor.titleAr}
          </p>
          
          <h3 
            className="text-xl font-extrabold text-white mb-4 group-hover:text-apex-gold transition-colors cursor-pointer"
            onClick={() => setDetailsOpen(true)}
          >
            {doctor.nameAr}
          </h3>
        </div>

        {/* Action Buttons: اقرأ المزيد + تواصل واتساب */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => setDetailsOpen(true)}
            className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 text-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-white/15"
          >
            <Info className="w-4 h-4 text-apex-gold" />
            <span>اقرأ المزيد</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-md"
          >
            <MessageCircle className="w-4 h-4" />
            <span>تواصل واتساب</span>
          </a>
        </div>
      </div>

      {/* Doctor Details Modal */}
      <DoctorDetailsModal
        doctor={doctor}
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
      />
    </>
  );
}


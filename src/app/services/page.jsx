"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { initialServices } from "@/lib/data-store";
import ServiceCard from "@/components/ServiceCard";
import { Sparkles, MapPin, Building2 } from "lucide-react";

function ServicesContent() {
  const searchParams = useSearchParams();
  const branchQuery = searchParams.get("branch");

  const [selectedBranch, setSelectedBranch] = useState("all");

  useEffect(() => {
    if (branchQuery && (branchQuery === "azaiba" || branchQuery === "amerat")) {
      setSelectedBranch(branchQuery);
    }
  }, [branchQuery]);

  const branchesList = [
    { id: "all", label: "جميع الفروع" },
    { id: "azaiba", label: "فرع العذيبة" },
    { id: "amerat", label: "فرع العامرات" },
  ];

  const filteredServices =
    selectedBranch === "all"
      ? initialServices
      : initialServices.filter((s) => s.branchIds?.includes(selectedBranch));

  return (
    <div className="space-y-12">
      {/* Banner Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 bg-white/10 text-apex-gold text-xs font-extrabold px-4 py-1.5 rounded-full border border-apex-gold/30">
          <Sparkles className="w-4 h-4 text-apex-gold" />
          التخصصات والإجراءات الطبية
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
          خدمات وعيادات <span className="text-gradient-apex">مجمع القمة الطبي</span>
        </h1>

        <p className="text-slate-300 text-base leading-relaxed font-light">
          استكشف عيادات مجمع القمة الطبي واختر الفرع المناسب للاطلاع على الخدمات والعلاجات المتوفرة.
        </p>
      </div>

      {/* Branch Filter Switcher */}
      <div className="bg-[#151112] p-2 rounded-2xl border border-apex-gold/30 shadow-2xl max-w-xl mx-auto flex items-center justify-center gap-1 sm:gap-2">
        <div className="hidden sm:flex items-center gap-1 text-apex-gold text-xs font-bold px-3">
          <Building2 className="w-4 h-4 text-apex-gold" />
          <span>اختر الفرع:</span>
        </div>
        {branchesList.map((b) => (
          <button
            key={b.id}
            onClick={() => setSelectedBranch(b.id)}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all flex items-center justify-center gap-1.5 ${
              selectedBranch === b.id
                ? "bg-apex-gold text-slate-950 shadow-gold"
                : "text-slate-200 hover:bg-white/10"
            }`}
          >
            {b.id !== "all" && <MapPin className="w-3.5 h-3.5 text-apex-gold" />}
            <span>{b.label}</span>
          </button>
        ))}
      </div>

      {/* Selected Branch Info Bar if filtered */}
      {selectedBranch === "amerat" && (
        <div className="max-w-4xl mx-auto bg-[#151112] border border-apex-gold/30 rounded-2xl p-4 text-center text-xs text-apex-gold space-y-1">
          <p className="font-bold text-sm">فرع العامرات - التخصصات والخدمات المتاحة حالياً:</p>
          <p className="text-slate-300">يتميز فرع العامرات بخدمات تشتمل على: <b>سمنة (إدارة الوزن)</b>، <b>ليزر (العناية بالبشرة والليزر)</b>، و<b>طب عام</b>.</p>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-20 bg-[#0B0A0C] min-h-screen text-white">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <Suspense fallback={<div className="text-center py-10 text-slate-400">جاري التحميل...</div>}>
          <ServicesContent />
        </Suspense>
      </div>
    </div>
  );
}

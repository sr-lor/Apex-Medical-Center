"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServiceCard from "@/components/ServiceCard";
import DoctorCard from "@/components/DoctorCard";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import BookingModal from "@/components/BookingModal";
import { initialServices, initialDoctors } from "@/lib/data-store";
import { Sparkles, Shield, HeartPulse, CheckCircle2, Phone, Calendar, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState("");
  const [activeBranch, setActiveBranch] = useState("all");

  const handleBookDoctor = (doctorId) => {
    setSelectedDocId(doctorId);
    setBookingOpen(true);
  };

  const filteredServices =
    activeBranch === "all"
      ? initialServices
      : initialServices.filter((s) => s.branchIds?.includes(activeBranch));

  return (
    <div className="space-y-0 bg-[#0B0A0C] text-white">
      {/* 1. Hero Section */}
      <HeroSection onOpenBooking={() => handleBookDoctor("")} />

      {/* 2. Stats & Branch Features Banner */}
      <StatsSection />

      {/* 3. Medical Specialties Section */}
      <section className="py-20 bg-[#0B0A0C]">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-white/10 text-apex-gold text-xs font-extrabold px-4 py-1.5 rounded-full border border-apex-gold/30">
              <Sparkles className="w-4 h-4 text-apex-gold" />
              إجراءاتنا وتخصصاتنا الطبية
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              عيادات متخصصة تقدم أحدث <span className="text-gradient-apex">الحلول العلاجية والتجميلية</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base font-light">
              تم تجهيز عيادات مجمع القمة الطبي (Apex Medical Center) بأحدث التقنيات وأفضل الأجهزة الطبية المعتمدة في الفرعين.
            </p>
          </div>

          {/* Branch Filter Buttons */}
          <div className="flex justify-center gap-2 mb-12">
            {[
              { id: "all", label: "جميع الفروع" },
              { id: "azaiba", label: "فرع العذيبة" },
              { id: "amerat", label: "فرع العامرات" },
            ].map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveBranch(b.id)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all border ${
                  activeBranch === b.id
                    ? "bg-apex-gold text-slate-950 border-apex-gold shadow-gold"
                    : "bg-white/5 text-slate-200 hover:bg-white/10 border-white/10"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#151112] hover:bg-slate-900 text-apex-gold font-extrabold px-8 py-3.5 rounded-2xl shadow-md transition-all hover:scale-105 border border-apex-gold/30"
            >
              <span>عرض جميع التخصصات والإجراءات</span>
              <ArrowLeft className="w-4 h-4 text-apex-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Doctors Team Section */}
      <section className="py-20 bg-[#151112] border-t border-white/10">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-block bg-white/10 text-apex-gold text-xs font-bold px-4 py-1.5 rounded-full border border-apex-gold/30">
                النخبة الاستشارية
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                أطباء ومستشارون خبرة <span className="text-gradient-apex">عالية ومتميزة</span>
              </h2>
              <p className="text-slate-300 text-sm font-light">
                نخبة من كبار الجراحين والاستشاريين المعتمدين في مجمع القمة الطبي.
              </p>
            </div>

            <Link
              href="/doctors"
              className="inline-flex items-center gap-2 text-apex-gold hover:text-white font-extrabold text-sm transition-colors"
            >
              <span>استكشف دليل الأطباء بالكامل</span>
              <ArrowLeft className="w-4 h-4 text-apex-gold" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {initialDoctors.slice(0, 4).map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} onBook={handleBookDoctor} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Choose Us Section - LUXE DARK CHARCOAL #151112 */}
      <section className="py-20 bg-[#0B0A0C] text-white relative overflow-hidden border-y border-apex-gold/30">
        <div className="w-full px-4 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-apex-gold border border-apex-gold/30">
                <Shield className="w-4 h-4 text-apex-gold" />
                لماذا مجمع القمة الطبي؟
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight text-white">
                نضمن لكم تجربة علاجية <br />
                فاخرة وآمنة تماماً
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed font-light">
                نسعى دائماً لتكون زيارتكم لـ مجمع القمة الطبي (Apex Medical Center) مريحة ومميزة، بدءاً من استقبالكم وحتى اكتمال رحلتكم العلاجية بنجاح.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2">
                  <CheckCircle2 className="w-6 h-6 text-apex-gold" />
                  <h4 className="font-bold text-base text-apex-gold">تقنيات معتمدة دولياً</h4>
                  <p className="text-xs text-slate-300">أحدث أجهزة الليزر الرقمية ومناظير الجراحة المتقدمة.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2">
                  <HeartPulse className="w-6 h-6 text-emerald-400" />
                  <h4 className="font-bold text-base text-emerald-400">خصوصية تامة للعميل</h4>
                  <p className="text-xs text-slate-300">غرف استشارة خاصة وطاقم طبي يوفر أعلى معايير الراحة.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2">
                  <Calendar className="w-6 h-6 text-amber-400" />
                  <h4 className="font-bold text-base text-amber-400">مرونة في المواعيد</h4>
                  <p className="text-xs text-slate-300">حجز أونلاين سريع وساعات عمل تمتد حتى 9 مساءً.</p>
                </div>

                <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 space-y-2">
                  <Phone className="w-6 h-6 text-cyan-300" />
                  <h4 className="font-bold text-base text-cyan-300">متابعة ما بعد العلاج</h4>
                  <p className="text-xs text-slate-300">فريق طبي مخصص لمتابعة تعافي المريض والإجابة فوراً.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-apex-gold/30">
                <img
                  src="/wp-content/uploads/2026/03/WHY1.jpg"
                  alt="Apex Medical Quality Care - مجمع القمة الطبي"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <TestimonialsSection />

      {/* 7. FAQ */}
      <FAQSection />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        preselectedDoctorId={selectedDocId}
      />
    </div>
  );
}

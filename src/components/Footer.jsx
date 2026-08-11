"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock, Shield, Facebook, Instagram, Youtube, ChevronLeft, MessageCircle, Building2 } from "lucide-react";

export default function Footer() {
  const [footerData, setFooterData] = useState({
    clinicPhone: "968 97031500",
    whatsappPhone: "96897031500",
    clinicEmail: "info@apexmedicaloman.com",
    workingHours: "السبت - الخميس: 09:00 ص - 09:00 م",
    footerBio: "مجمع القمة الطبي في سلطنة عمان (Apex Medical Center) - وجهتك الرائدة للرعاية الصحية المتكاملة، طب وتجميل الأسنان، الجراحة التجميلية، الجلدية والليزر، وجراحات إدارة السمنة والوزن بأعلى المعايير العالمية.",
    azaibaAddress: "مسقط - العذيبة - شارع السلطان قابوس",
    azaibaDesc: "تخصصات متكاملة وجراحات تجميلية وأسنان",
    azaibaMapUrl: "https://maps.app.goo.gl/yWq6D32JjmRpHQtb8",
    ameratAddress: "مسقط - العامرات - الشارع العام",
    ameratDesc: "عيادات السمنة والتخسيس • ليزر والبشرة • طب عام",
    instagramUrl: "https://www.instagram.com/apex_medical_clinics_center?igsh=MWV2a2gyYTRoYnFpYQ%3D%3D&utm_source=qr",
    youtubeUrl: "https://www.youtube.com",
    facebookUrl: "https://www.facebook.com",
    copyrightText: "© 2026 مجمع القمة الطبي (Apex Medical Center Oman). جميع الحقوق محفوظة.",
    developerText: "تطوير المؤسسة رفاه عبد القادر مؤسسة ونائبة الرئيس التنفيذي SR LOR, LLC",
  });

  useEffect(() => {
    // Dynamically load footer settings from localStorage if customized in control panel
    const saved = localStorage.getItem("apex_footer_settings_json");
    if (saved) {
      try {
        setFooterData((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  return (
    <footer className="bg-[#151112] text-white pt-16 pb-8 border-t border-apex-gold/30">
      <div className="w-full px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Logo & About & Social Accounts */}
          <div className="space-y-4">
            <div className="bg-white/10 p-3 rounded-xl inline-block backdrop-blur-md border border-white/10">
              <img
                src="/wp-content/uploads/2026/02/apex_logo-apexmedicaloman_white-txt.png"
                alt="Apex Medical Center White Logo"
                className="h-12 object-contain"
              />
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              {footerData.footerBio}
            </p>

            {/* Official Social Media Platform Icons */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-bold text-apex-gold">منصات التواصل الاجتماعي الرسمية:</p>
              <div className="flex items-center gap-3">
                {footerData.instagramUrl && (
                  <a
                    href={footerData.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="إنستغرام مجمع القمة الطبي"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E1306C] hover:text-white flex items-center justify-center transition-all border border-white/10"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}

                {footerData.youtubeUrl && (
                  <a
                    href={footerData.youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="قناة اليوتيوب مجمع القمة الطبي"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-all border border-white/10"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}

                {footerData.facebookUrl && (
                  <a
                    href={footerData.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    title="فيسبوك مجمع القمة الطبي"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all border border-white/10"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                )}

                <a
                  href={`https://wa.me/${footerData.whatsappPhone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  title="واتساب مجمع القمة الطبي"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-apex-gold border-r-4 border-apex-gold pr-3">
              أقسام الموقع
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  عن مجمع القمة الطبي
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  إجراءاتنا وتخصصاتنا
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  الأطباء والاستشاريون
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  معرض الصور
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  اتصل بنا ومواقع الفروع
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Medical Specialties */}
          <div>
            <h4 className="text-lg font-bold mb-5 text-apex-gold border-r-4 border-apex-gold pr-3">
              إجراءات وتخصصات المركز
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/services/dermatology-cosmetology" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  الجلدية والتجميل
                </Link>
              </li>
              <li>
                <Link href="/services/plastic-surgery" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  الجراحة التجميلية
                </Link>
              </li>
              <li>
                <Link href="/services/weight-management" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  إدارة السمنة والوزن
                </Link>
              </li>
              <li>
                <Link href="/services/skin-care-laser-treatments" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  العناية بالبشرة والليزر
                </Link>
              </li>
              <li>
                <Link href="/services/aesthetic-gynecology" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  الطب والتجميل النسائي
                </Link>
              </li>
              <li>
                <Link href="/services/cosmetic-dentistry-2" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  طب وتجميل الأسنان
                </Link>
              </li>
              <li>
                <Link href="/services/orthopedic-surgery" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  جراحة العظام والمفاصل
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Dual Branches Info & Contact Details */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold mb-5 text-apex-gold border-r-4 border-apex-gold pr-3">
              فروعنا ومعلومات الاتصال
            </h4>
            
            {/* Branch 1: Al Azaiba */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center justify-between gap-1 text-apex-gold font-bold">
                <div className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-apex-gold" />
                  <span>1. فرع العذيبة</span>
                </div>
                {footerData.azaibaMapUrl && (
                  <a
                    href={footerData.azaibaMapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[10px] text-white/80 hover:text-apex-gold underline flex items-center gap-1"
                  >
                    <MapPin className="w-3 h-3 text-apex-gold" />
                    <span>الخريطة 📍</span>
                  </a>
                )}
              </div>
              <p className="text-[11px] text-slate-300">{footerData.azaibaAddress}</p>
              <p className="text-[11px] text-slate-400">{footerData.azaibaDesc}</p>
            </div>

            {/* Branch 2: Al Amerat */}
            <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-apex-gold font-bold">
                <Building2 className="w-4 h-4 text-apex-gold" />
                <span>2. فرع العامرات</span>
              </div>
              <p className="text-[11px] text-slate-300">{footerData.ameratAddress}</p>
              <p className="text-[11px] text-slate-400">{footerData.ameratDesc}</p>
            </div>

            {/* Contact & Hours */}
            <div className="space-y-2 pt-1 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-apex-gold flex-shrink-0" />
                <span dir="ltr" className="text-white font-bold">{footerData.clinicPhone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-apex-gold flex-shrink-0" />
                <span>{footerData.clinicEmail}</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Clock className="w-4 h-4 text-apex-gold flex-shrink-0" />
                <span>{footerData.workingHours}</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Copyright & Professional Credits Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Copyright & Clean Developer Info */}
          <div className="space-y-1 text-center md:text-right">
            <p className="font-medium text-slate-300">
              {footerData.copyrightText}
            </p>
            <p className="text-[11px] text-slate-300">
              {footerData.developerText}{" "}
              <a
                href="https://srlor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-slate-200 hover:text-apex-gold underline transition-colors"
              >
                SR LOR, LLC
              </a>
            </p>
          </div>

        </div>

      </div>
    </footer>
  );
}

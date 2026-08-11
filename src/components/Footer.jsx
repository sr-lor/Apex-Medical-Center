"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Phone, Mail, MapPin, Clock, Shield, Facebook, Instagram, Youtube, 
  ChevronLeft, MessageCircle, Building2, ExternalLink, X, Navigation, Info, Award, Globe, Stethoscope
} from "lucide-react";

export default function Footer() {
  const [footerData, setFooterData] = useState({
    clinicPhone: "968 97031500",
    whatsappPhone: "96897031500",
    clinicEmail: "info@apexmedicaloman.com",
    workingHours: "السبت - الخميس: 09:00 ص - 09:00 م",
    footerBio: "مجمع القمة الطبي في سلطنة عمان (Apex Medical Center) - وجهتك الرائدة للرعاية الصحية المتكاملة، طب وتجميل الأسنان، الجراحة التجميلية، الجلدية والليزر، وجراحات إدارة السمنة والوزن بأعلى المعايير العالمية.",
    
    // Branch 1: Al Azaiba Dedicated Details
    azaibaAddress: "مسقط - العذيبة - شارع السلطان قابوس",
    azaibaDesc: "تخصصات متكاملة وجراحات تجميلية وأسنان",
    azaibaMapUrl: "https://maps.app.goo.gl/yWq6D32JjmRpHQtb8",
    azaibaPhone: "968 97031500",
    azaibaWhatsapp: "96897031500",
    azaibaHours: "السبت - الخميس: 09:00 ص - 09:00 م",
    azaibaInstagramUrl: "https://www.instagram.com/apex_medical_clinics_center?igsh=MWV2a2gyYTRoYnFpYQ%3D%3D&utm_source=qr",
    azaibaYoutubeUrl: "https://www.youtube.com",
    azaibaFacebookUrl: "https://www.facebook.com",

    // Branch 2: Al Amerat Dedicated Details
    ameratAddress: "مسقط - العامرات - الشارع العام",
    ameratDesc: "عيادات السمنة والتخسيس • ليزر والبشرة • طب عام",
    ameratMapUrl: "https://maps.google.com",
    ameratPhone: "968 97031500",
    ameratWhatsapp: "96897031500",
    ameratHours: "السبت - الخميس: 09:00 ص - 09:00 م",
    ameratInstagramUrl: "https://www.instagram.com/apex_medical_clinics_center?igsh=MWV2a2gyYTRoYnFpYQ%3D%3D&utm_source=qr",
    ameratYoutubeUrl: "https://www.youtube.com",
    ameratFacebookUrl: "https://www.facebook.com",

    // Global Social Links
    instagramUrl: "https://www.instagram.com/apex_medical_clinics_center?igsh=MWV2a2gyYTRoYnFpYQ%3D%3D&utm_source=qr",
    youtubeUrl: "https://www.youtube.com",
    facebookUrl: "https://www.facebook.com",

    // Copyright
    copyrightText: "© 2026 مجمع القمة الطبي (Apex Medical Center Oman). جميع الحقوق محفوظة.",
    developerText: "تطوير المؤسسة رفاه عبد القادر مؤسسة ونائبة الرئيس التنفيذي SR LOR, LLC",
  });

  // State for Floating Branch Detail Card Modal
  const [activeBranchModal, setActiveBranchModal] = useState(null);

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

  const branchDetails = {
    azaiba: {
      name: "فرع العذيبة الرئيسي",
      address: footerData.azaibaAddress,
      desc: footerData.azaibaDesc,
      mapUrl: footerData.azaibaMapUrl,
      phone: footerData.azaibaPhone || footerData.clinicPhone,
      whatsapp: footerData.azaibaWhatsapp || footerData.whatsappPhone,
      hours: footerData.azaibaHours || footerData.workingHours,
      instagramUrl: footerData.azaibaInstagramUrl || footerData.instagramUrl,
      youtubeUrl: footerData.azaibaYoutubeUrl || footerData.youtubeUrl,
      facebookUrl: footerData.azaibaFacebookUrl || footerData.facebookUrl,
      specialties: ["طب وتجميل الأسنان", "الجراحة التجميلية", "الجلدية والتجميل النسائي", "جراحة العظام والمفاصل"],
      badge: "المركز الرئيسي والعمليات",
    },
    amerat: {
      name: "فرع العامرات المتخصص",
      address: footerData.ameratAddress,
      desc: footerData.ameratDesc,
      mapUrl: footerData.ameratMapUrl || "https://maps.google.com",
      phone: footerData.ameratPhone || footerData.clinicPhone,
      whatsapp: footerData.ameratWhatsapp || footerData.whatsappPhone,
      hours: footerData.ameratHours || footerData.workingHours,
      instagramUrl: footerData.ameratInstagramUrl || footerData.instagramUrl,
      youtubeUrl: footerData.ameratYoutubeUrl || footerData.youtubeUrl,
      facebookUrl: footerData.ameratFacebookUrl || footerData.facebookUrl,
      specialties: ["إدارة السمنة والوزن", "العناية بالبشرة والليزر", "الطب العام والعيادات التخصصية"],
      badge: "عيادات التخسيس والبشرة",
    },
  };

  return (
    <footer className="bg-[#151112] text-white pt-16 pb-8 border-t border-apex-gold/30 relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* TOP ROW: SEPARATE ELEGANT CARDS FOR CONTACT & LOCATIONS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* CARD 1: OFFICIAL ACCOUNTS & SOCIAL MEDIA */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4 hover:border-apex-gold/50 transition-all text-right backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-apex-gold">بطاقة منصات التواصل</span>
              <div className="w-9 h-9 rounded-xl bg-apex-gold/20 flex items-center justify-center text-apex-gold">
                <Globe className="w-5 h-5 text-apex-gold" />
              </div>
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white">الحسابات والتواصل الرسمي</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                متابعة أحدث نتائج وتغطيات مجمع القمة الطبي على المنصات.
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-2 border-t border-white/10">
              {footerData.instagramUrl && (
                <a
                  href={footerData.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="إنستغرام"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E1306C] hover:text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {footerData.youtubeUrl && (
                <a
                  href={footerData.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="يوتيوب"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#FF0000] hover:text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {footerData.facebookUrl && (
                <a
                  href={footerData.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="فيسبوك"
                  className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#1877F2] hover:text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              <a
                href={`https://wa.me/${footerData.whatsappPhone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                title="واتساب المباشر"
                className="w-9 h-9 rounded-xl bg-white/10 hover:bg-[#25D366] hover:text-white flex items-center justify-center transition-all border border-white/10"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* CARD 2: PHONE & WHATSAPP NUMBERS */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4 hover:border-apex-gold/50 transition-all text-right backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-apex-gold">بطاقة أرقام الاتصال</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Phone className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white">الهاتف والواتساب المباشر</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                خدمة المرضى واستقبال استفسارات الحجوزات 24/7.
              </p>
            </div>
            <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs font-bold text-slate-200">
              <div className="flex items-center justify-between">
                <span>الاتصال المباشر:</span>
                <span dir="ltr" className="text-apex-gold font-mono font-black">{footerData.clinicPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>البريد الإلكتروني:</span>
                <span dir="ltr" className="text-slate-300 text-[11px] font-mono">{footerData.clinicEmail}</span>
              </div>
            </div>
          </div>

          {/* CARD 3: GEOGRAPHIC MAP & LOCATION */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4 hover:border-apex-gold/50 transition-all text-right backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-apex-gold">بطاقة الموقع الجغرافي</span>
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400">
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white">الموقع وخرائط جوجل</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                مواقع الفروع بمسقط مع التوجيه المباشر بنقرة واحدة.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveBranchModal("azaiba")}
                className="flex-1 py-2 px-2.5 bg-white/10 hover:bg-apex-gold hover:text-slate-950 text-white rounded-xl text-[11px] font-bold transition-all border border-white/10 flex items-center justify-center gap-1"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>فرع العذيبة</span>
              </button>

              <button
                onClick={() => setActiveBranchModal("amerat")}
                className="flex-1 py-2 px-2.5 bg-white/10 hover:bg-apex-gold hover:text-slate-950 text-white rounded-xl text-[11px] font-bold transition-all border border-white/10 flex items-center justify-center gap-1"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>فرع العامرات</span>
              </button>
            </div>
          </div>

          {/* CARD 4: OPERATING HOURS & CLINIC CARE */}
          <div className="bg-white/5 p-6 rounded-3xl border border-white/10 space-y-4 hover:border-apex-gold/50 transition-all text-right backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-apex-gold">بطاقة أوقات العمل</span>
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div>
              <h4 className="text-base font-extrabold text-white">مواعيد استقبال المراجعين</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                استقبال العيادات الخارجية والعمليات اليومية.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>{footerData.workingHours}</span>
            </div>
          </div>

        </div>

        {/* MIDDLE SECTION: MAIN CONTENT & BRANCH SELECTION WITH FLOATING CARD BUTTON */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10 text-right">
          
          {/* Col 1: Logo & About */}
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
                <Link href="/services/cosmetic-dentistry-2" className="hover:text-apex-gold flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-apex-gold" />
                  طب وتجميل الأسنان
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Dual Branches Buttons with Floating Cards */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold mb-5 text-apex-gold border-r-4 border-apex-gold pr-3">
              بطاقات الفروع العائمة
            </h4>
            
            {/* Branch 1 Card Button */}
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-apex-gold font-bold">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-apex-gold" />
                  <span>1. فرع العذيبة</span>
                </span>
                <span className="text-[10px] bg-apex-gold/20 text-apex-gold px-2 py-0.5 rounded-md border border-apex-gold/30">الرئيسي</span>
              </div>
              <p className="text-[11px] text-slate-300">{footerData.azaibaAddress}</p>
              <button
                onClick={() => setActiveBranchModal("azaiba")}
                className="w-full py-2 bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-300 rounded-xl font-extrabold text-[11px] transition-all border border-amber-500/40 flex items-center justify-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5" />
                <span>عرض بطاقة الفرع العائمة 📍</span>
              </button>
            </div>

            {/* Branch 2 Card Button */}
            <div className="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-apex-gold font-bold">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-apex-gold" />
                  <span>2. فرع العامرات</span>
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">تخصصي</span>
              </div>
              <p className="text-[11px] text-slate-300">{footerData.ameratAddress}</p>
              <button
                onClick={() => setActiveBranchModal("amerat")}
                className="w-full py-2 bg-amber-500/20 hover:bg-amber-500 hover:text-slate-950 text-amber-300 rounded-xl font-extrabold text-[11px] transition-all border border-amber-500/40 flex items-center justify-center gap-1.5"
              >
                <Info className="w-3.5 h-3.5" />
                <span>عرض بطاقة الفرع العائمة 📍</span>
              </button>
            </div>

          </div>
        </div>

        {/* BOTTOM COPYRIGHT & DEVELOPER CREDITS */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-right">
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

      {/* FLOATING BRANCH DETAIL CARD MODAL */}
      {activeBranchModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-apex-navy text-white rounded-3xl border-2 border-amber-500/40 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-right relative overflow-hidden">
            <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                  <Building2 className="w-6 h-6 text-slate-950" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest block">
                    {branchDetails[activeBranchModal].badge}
                  </span>
                  <h3 className="text-xl font-black text-white">
                    {branchDetails[activeBranchModal].name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveBranchModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 relative z-10 text-xs font-bold text-slate-200">
              
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  <span>الموقع الجغرافي للفرع:</span>
                </span>
                <p className="text-white text-sm font-extrabold">{branchDetails[activeBranchModal].address}</p>
                <p className="text-slate-400 text-[11px]">{branchDetails[activeBranchModal].desc}</p>
              </div>

              {/* Dedicated Per-Branch Social Accounts Bar */}
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <Globe className="w-4 h-4" />
                  <span>حسابات التواصل الاجتماعي الخاصة بهذا الفرع:</span>
                </span>
                
                <div className="flex items-center gap-2.5 pt-1">
                  {branchDetails[activeBranchModal].instagramUrl && (
                    <a
                      href={branchDetails[activeBranchModal].instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-white/10 hover:bg-[#E1306C] hover:text-white text-slate-200 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>إنستغرام الفرع</span>
                    </a>
                  )}

                  {branchDetails[activeBranchModal].youtubeUrl && (
                    <a
                      href={branchDetails[activeBranchModal].youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-white/10 hover:bg-[#FF0000] hover:text-white text-slate-200 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                      <span>يوتيوب الفرع</span>
                    </a>
                  )}

                  {branchDetails[activeBranchModal].facebookUrl && (
                    <a
                      href={branchDetails[activeBranchModal].facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-white/10 hover:bg-[#1877F2] hover:text-white text-slate-200 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                      <span>فيسبوك الفرع</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>ساعات ودوام الفرع:</span>
                </span>
                <p className="text-white font-mono">{branchDetails[activeBranchModal].hours}</p>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <span className="text-amber-400 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4" />
                  <span>العيادات والتخصصات المتاحة بهذا الفرع:</span>
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {branchDetails[activeBranchModal].specialties.map((spec, i) => (
                    <span key={i} className="bg-amber-500/20 text-amber-300 px-3 py-1 rounded-xl border border-amber-500/30 text-[11px]">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={branchDetails[activeBranchModal].mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-slate-950" />
                  <span>الانتقال لخريطة جوجل (Google Maps) 📍</span>
                </a>
                
                <a
                  href={`https://wa.me/${branchDetails[activeBranchModal].whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 bg-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 rounded-2xl font-black text-xs border border-emerald-500/40 transition-all flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>واتساب الفرع</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </footer>
  );
}

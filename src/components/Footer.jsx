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
    footerBio: "مجمع القمة الطبي (Apex Medical Center) — وجهتكم المعتمدة للرعاية الصحية المتكاملة، طب وتجميل الأسنان، الجراحة التجميلية، الجلدية والليزر، وتخسيس الوزن بأعلى المعايير العالمية.",
    
    // Branch 1: Al Azaiba
    azaibaAddress: "مسقط - العذيبة - شارع السلطان قابوس",
    azaibaDesc: "المركز الرئيسي للجراحات والتجميل المتكامل والأسنان",
    azaibaMapUrl: "https://maps.app.goo.gl/yWq6D32JjmRpHQtb8",
    azaibaPhone: "968 97031500",
    azaibaWhatsapp: "96897031500",
    azaibaHours: "السبت - الخميس: 09:00 ص - 09:00 م",
    azaibaInstagramUrl: "https://www.instagram.com/apex_medical_clinics_center?igsh=MWV2a2gyYTRoYnFpYQ%3D%3D&utm_source=qr",
    azaibaYoutubeUrl: "https://www.youtube.com",
    azaibaFacebookUrl: "https://www.facebook.com",

    // Branch 2: Al Amerat
    ameratAddress: "مسقط - العامرات - الشارع العام",
    ameratDesc: "عيادات التخسيس، البشرة والتجميل، والطب العام",
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
    developerText: "تطوير المؤسسة رفاه عبد القادر — نائب الرئيس التنفيذي SR LOR, LLC",
  });

  const [activeBranchModal, setActiveBranchModal] = useState(null);

  useEffect(() => {
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
      badge: "المركز الرئيسي",
    },
    amerat: {
      name: "فرع العامرات التخصصي",
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
      badge: "الفرع التخصصي",
    },
  };

  return (
    <footer className="bg-[#0B0F19] text-white pt-14 pb-8 border-t border-amber-500/20 relative font-sans text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* MAIN FOOTER CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          
          {/* COL 1: LOGO, BIO & OUTSIDE GLOBAL CONTACT INFORMATION */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white/10 p-2.5 rounded-xl inline-block backdrop-blur-md border border-white/10">
              <img
                src="/wp-content/uploads/2026/02/apex_logo-apexmedicaloman_white-txt.png"
                alt="Apex Medical Center"
                className="h-10 object-contain"
              />
            </div>
            
            <p className="text-slate-300 text-xs leading-relaxed font-normal">
              {footerData.footerBio}
            </p>

            {/* GLOBAL CONTACT DETAILS OUTSIDE CARDS */}
            <div className="space-y-2 pt-2 border-t border-white/10 text-xs text-slate-300 font-bold">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>الهاتف المباشر:</span>
                <span dir="ltr" className="text-amber-400 font-mono font-black">{footerData.clinicPhone}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>البريد الإلكتروني:</span>
                <span dir="ltr" className="text-slate-200 font-mono text-[11px]">{footerData.clinicEmail}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span>أوقات العمل الرسمية:</span>
                <span className="text-slate-200">{footerData.workingHours}</span>
              </div>
            </div>

            {/* SOCIAL MEDIA ICONS OUTSIDE CARDS */}
            <div className="flex items-center gap-2.5 pt-2">
              {footerData.instagramUrl && (
                <a
                  href={footerData.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#E1306C] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {footerData.youtubeUrl && (
                <a
                  href={footerData.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="YouTube"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {footerData.facebookUrl && (
                <a
                  href={footerData.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              <a
                href={`https://wa.me/${footerData.whatsappPhone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                title="WhatsApp"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#25D366] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* COL 2: QUICK SITE LINKS */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 border-r-2 border-amber-400 pr-2">
              أقسام الموقع
            </h5>
            <ul className="space-y-2.5 text-xs text-slate-300 font-bold">
              <li>
                <Link href="/" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span>عن مجمع القمة الطبي</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span>التخصصات والعيادات</span>
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span>الأطباء والاستشاريون</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span>معرض الصور</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-400 flex items-center gap-1.5 transition-colors">
                  <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
                  <span>اتصل بنا والمواقع</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3 & 4: ONLY TWO BRANCH CARDS FOR AL AZAIBA & AL AMERAT */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* CARD 1: AL AZAIBA BRANCH CARD */}
            <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 space-y-4 hover:border-amber-500/40 transition-all backdrop-blur-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h4 className="font-extrabold text-sm text-white">فرع العذيبة الرئيسي</h4>
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-extrabold border border-amber-500/30">
                    الرئيسي
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span>{footerData.azaibaAddress}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-normal">{footerData.azaibaDesc}</p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/10">
                <a
                  href={footerData.azaibaMapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-slate-950" />
                  <span>موقع الفرع علي Google Maps 📍</span>
                </a>

                <button
                  onClick={() => setActiveBranchModal("azaiba")}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl font-bold text-xs transition-all border border-white/10 flex items-center justify-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-amber-400" />
                  <span>تفاصيل الفرع والعيادات العائمة</span>
                </button>
              </div>
            </div>

            {/* CARD 2: AL AMERAT BRANCH CARD */}
            <div className="bg-white/[0.03] p-5 rounded-2xl border border-white/10 space-y-4 hover:border-amber-500/40 transition-all backdrop-blur-xl flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      <Building2 className="w-4 h-4" />
                    </div>
                    <h4 className="font-extrabold text-sm text-white">فرع العامرات التخصصي</h4>
                  </div>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-extrabold border border-emerald-500/30">
                    تخصصي
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{footerData.ameratAddress}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-normal">{footerData.ameratDesc}</p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-white/10">
                <a
                  href={footerData.ameratMapUrl || "https://maps.google.com"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-slate-950" />
                  <span>موقع الفرع علي Google Maps 📍</span>
                </a>

                <button
                  onClick={() => setActiveBranchModal("amerat")}
                  className="w-full py-2 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl font-bold text-xs transition-all border border-white/10 flex items-center justify-center gap-1.5"
                >
                  <Info className="w-3.5 h-3.5 text-emerald-400" />
                  <span>تفاصيل الفرع والعيادات العائمة</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* COPYRIGHT & DEVELOPER BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 border-t border-white/10 pt-6 mt-8">
          <p>{footerData.copyrightText}</p>
          <div className="text-[11px] text-center md:text-left space-y-0.5 font-sans">
            <p className="text-slate-300 font-medium">تطوير وبرمجة • <span className="text-amber-400 font-bold">رفاه عبد القادر</span> • Founder & VP</p>
            <p className="text-amber-400/90 font-extrabold tracking-wide">SR LOR, LLC © 2026</p>
          </div>
        </div>

      </div>

      {/* EXECUTIVE FLOATING BRANCH MODAL */}
      {activeBranchModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-[#0F172A] text-white rounded-3xl border border-amber-500/30 shadow-2xl max-w-lg w-full p-6 sm:p-8 space-y-6 text-right relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 text-amber-400 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-amber-400 font-extrabold uppercase tracking-widest block">
                    {branchDetails[activeBranchModal].badge}
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {branchDetails[activeBranchModal].name}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveBranchModal(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-bold text-slate-200">
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-amber-400 text-[11px]">العنوان الجغرافي:</span>
                <p className="text-white text-sm font-bold">{branchDetails[activeBranchModal].address}</p>
                <p className="text-slate-400 text-[11px] font-normal">{branchDetails[activeBranchModal].desc}</p>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <span className="text-amber-400 text-[11px]">منصات التواصل الاجتماعي للفرع:</span>
                <div className="flex items-center gap-2 pt-1">
                  {branchDetails[activeBranchModal].instagramUrl && (
                    <a
                      href={branchDetails[activeBranchModal].instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-white/10 hover:bg-[#E1306C] text-white rounded-xl text-[11px] font-bold transition-all flex items-center gap-1"
                    >
                      <Instagram className="w-3.5 h-3.5" />
                      <span>Instagram</span>
                    </a>
                  )}

                  {branchDetails[activeBranchModal].youtubeUrl && (
                    <a
                      href={branchDetails[activeBranchModal].youtubeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-white/10 hover:bg-[#FF0000] text-white rounded-xl text-[11px] font-bold transition-all flex items-center gap-1"
                    >
                      <Youtube className="w-3.5 h-3.5" />
                      <span>YouTube</span>
                    </a>
                  )}

                  {branchDetails[activeBranchModal].facebookUrl && (
                    <a
                      href={branchDetails[activeBranchModal].facebookUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-white/10 hover:bg-[#1877F2] text-white rounded-xl text-[11px] font-bold transition-all flex items-center gap-1"
                    >
                      <Facebook className="w-3.5 h-3.5" />
                      <span>Facebook</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-1">
                <span className="text-amber-400 text-[11px]">ساعات ودوام الفرع:</span>
                <p className="text-white font-mono">{branchDetails[activeBranchModal].hours}</p>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                <span className="text-amber-400 text-[11px]">العيادات والتخصصات بالفرع:</span>
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
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-slate-950" />
                  <span>فتح الموقع في Google Maps 📍</span>
                </a>
                
                <a
                  href={`https://wa.me/${branchDetails[activeBranchModal].whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 bg-emerald-500/20 hover:bg-emerald-500 hover:text-slate-950 text-emerald-300 rounded-xl font-bold text-xs border border-emerald-500/40 transition-all flex items-center gap-2"
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

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
    <footer className="bg-[#0B0F19] text-white pt-16 pb-8 border-t border-amber-500/20 relative font-sans text-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* EXECUTIVE CONTACT & LOCATION CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Social Media Platforms */}
          <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10 space-y-4 hover:border-amber-500/40 transition-all backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-400">التواصل الاجتماعي</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Globe className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">المنصات الرسمية</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                متابعة التغطيات الحية والنتائج الطبية المعتمدة.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-white/10">
              {footerData.instagramUrl && (
                <a
                  href={footerData.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#E1306C] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
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
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#FF0000] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
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
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              <a
                href={`https://wa.me/${footerData.whatsappPhone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                title="WhatsApp"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#25D366] text-slate-300 hover:text-white flex items-center justify-center transition-all border border-white/10"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Contact Information */}
          <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10 space-y-4 hover:border-amber-500/40 transition-all backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-400">الاتصال المباشر</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Phone className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">مركز الاستفسارات</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                استقبال حجز المواعيد والاستشارات الطبية.
              </p>
            </div>
            <div className="space-y-1 pt-2 border-t border-white/10 text-xs font-bold text-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">الهاتف:</span>
                <span dir="ltr" className="text-amber-400 font-mono">{footerData.clinicPhone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium">البريد:</span>
                <span dir="ltr" className="text-slate-300 text-[11px] font-mono">{footerData.clinicEmail}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Location & Maps */}
          <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10 space-y-4 hover:border-amber-500/40 transition-all backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-blue-400">الموقع الجغرافي</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">فروع مسقط</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                مواقع الفروع والخرائط التفاعلية.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveBranchModal("azaiba")}
                className="flex-1 py-1.5 px-2 bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-white rounded-lg text-[11px] font-bold transition-all border border-white/10 flex items-center justify-center gap-1"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>العذيبة</span>
              </button>

              <button
                onClick={() => setActiveBranchModal("amerat")}
                className="flex-1 py-1.5 px-2 bg-white/5 hover:bg-amber-500 hover:text-slate-950 text-white rounded-lg text-[11px] font-bold transition-all border border-white/10 flex items-center justify-center gap-1"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>العامرات</span>
              </button>
            </div>
          </div>

          {/* Card 4: Operating Hours */}
          <div className="bg-white/[0.03] p-6 rounded-2xl border border-white/10 space-y-4 hover:border-amber-500/40 transition-all backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-400">أوقات العمل</span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">ساعات الاستقبال</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                عيادات الاستقبال الخارجي والعمليات.
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <span>{footerData.workingHours}</span>
            </div>
          </div>

        </div>

        {/* MAIN NAVIGATION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          
          {/* About */}
          <div className="space-y-4">
            <div className="bg-white/10 p-2.5 rounded-xl inline-block backdrop-blur-md border border-white/10">
              <img
                src="/wp-content/uploads/2026/02/apex_logo-apexmedicaloman_white-txt.png"
                alt="Apex Medical Center"
                className="h-10 object-contain"
              />
            </div>
            <p className="text-slate-400 text-xs leading-relaxed font-normal">
              {footerData.footerBio}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-4 border-r-2 border-amber-400 pr-2">
              أقسام الموقع
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <ChevronLeft className="w-3 h-3 text-amber-400" />
                  <span>الرئيسية</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <ChevronLeft className="w-3 h-3 text-amber-400" />
                  <span>عن مجمع القمة</span>
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <ChevronLeft className="w-3 h-3 text-amber-400" />
                  <span>التخصصات والعيادات</span>
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <ChevronLeft className="w-3 h-3 text-amber-400" />
                  <span>الأطباء والاستشاريون</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialties */}
          <div>
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-4 border-r-2 border-amber-400 pr-2">
              الأقسام التخصصية
            </h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <Link href="/services/dermatology-cosmetology" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <ChevronLeft className="w-3 h-3 text-amber-400" />
                  <span>الجلدية والتجميل</span>
                </Link>
              </li>
              <li>
                <Link href="/services/plastic-surgery" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <ChevronLeft className="w-3 h-3 text-amber-400" />
                  <span>الجراحة التجميلية</span>
                </Link>
              </li>
              <li>
                <Link href="/services/cosmetic-dentistry-2" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <ChevronLeft className="w-3 h-3 text-amber-400" />
                  <span>طب وتجميل الأسنان</span>
                </Link>
              </li>
              <li>
                <Link href="/services/weight-management" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <ChevronLeft className="w-3 h-3 text-amber-400" />
                  <span>إدارة السمنة والوزن</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Branch Modals Action Buttons */}
          <div className="space-y-3">
            <h5 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-4 border-r-2 border-amber-400 pr-2">
              بطاقة معلومات الفروع
            </h5>
            
            <div className="p-3 bg-white/[0.02] rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>فرع العذيبة</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">الرئيسي</span>
              </div>
              <button
                onClick={() => setActiveBranchModal("azaiba")}
                className="w-full py-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-300 rounded-lg font-bold text-[11px] transition-all border border-amber-500/30 flex items-center justify-center gap-1"
              >
                <span>تفاصيل الفرع الخرائط</span>
              </button>
            </div>

            <div className="p-3 bg-white/[0.02] rounded-xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-white">
                <span>فرع العامرات</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">تخصصي</span>
              </div>
              <button
                onClick={() => setActiveBranchModal("amerat")}
                className="w-full py-1.5 bg-amber-500/10 hover:bg-amber-500 hover:text-slate-950 text-amber-300 rounded-lg font-bold text-[11px] transition-all border border-amber-500/30 flex items-center justify-center gap-1"
              >
                <span>تفاصيل الفرع الخرائط</span>
              </button>
            </div>
          </div>

        </div>

        {/* COPYRIGHT */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{footerData.copyrightText}</p>
          <p className="text-[11px]">
            {footerData.developerText}{" "}
            <a
              href="https://srlor.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-slate-200 hover:text-amber-400 underline transition-colors"
            >
              SR LOR, LLC
            </a>
          </p>
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

              <div className="flex items-center gap-3 pt-2">
                <a
                  href={branchDetails[activeBranchModal].mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-slate-950" />
                  <span>فتح الموقع في Google Maps</span>
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

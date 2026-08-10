"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, Calendar, Menu, X, Shield, Clock, MapPin, ChevronDown, ChevronLeft, Mail, Building2, UserCheck, Sparkles } from "lucide-react";

export default function Navbar({ onOpenBooking }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Desktop Dropdowns State
  const [proceduresDropdownOpen, setProceduresDropdownOpen] = useState(false);
  const [activeProcedureBranch, setActiveProcedureBranch] = useState(null);
  const [activeSubMenuId, setActiveSubMenuId] = useState(null);

  const [doctorsDropdownOpen, setDoctorsDropdownOpen] = useState(false);
  const [activeDoctorBranch, setActiveDoctorBranch] = useState(null);

  // Mobile Accordion States
  const [mobileProceduresOpen, setMobileProceduresOpen] = useState(false);
  const [mobileDoctorsOpen, setMobileDoctorsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 1. Procedures Data grouped by Branch (with nested sub-items for Al Azaiba)
  const branchProcedures = [
    {
      branchId: "azaiba",
      branchName: "فرع العذيبة",
      href: "/services?branch=azaiba",
      items: [
        { id: "derm", label: "طب الأمراض الجلدية والتجميل", href: "/services/dermatology-cosmetology" },
        { id: "plastic", label: "الجراحة التجميلية وتنسيق القوام", href: "/services/plastic-surgery" },
        {
          id: "weight-management",
          label: "إدارة الوزن وجراحات السمنة",
          href: "/services/weight-management",
          hasSub: true,
          subItems: [
            { label: "حقن إنقاص الوزن الطبية (مونجارو وأوزمبيك)", href: "/services/medical-weight-loss-injections" },
            { label: "بالون المعدة", href: "/services/gastric-balloon" },
            { label: "جراحة تكميم المعدة", href: "/services/gastric-sleeve-surgery" },
            { label: "جراحة تحويل مسار المعدة", href: "/services/gastric-bypass-surgery" },
          ],
        },
        { id: "laser", label: "العناية بالبشرة وعلاجات الليزر", href: "/services/skin-care-laser-treatments" },
        { id: "gyn", label: "الطب والتجميل النسائي", href: "/services/aesthetic-gynecology" },
        {
          id: "dentistry",
          label: "طب الأسنان المتكامل",
          href: "/services/cosmetic-dentistry-2",
          hasSub: true,
          subItems: [
            { label: "طب الأسنان التجميل وابتسامة هوليود", href: "/services/cosmetic-dentistry-3" },
            { label: "تقويم الأسنان", href: "/services/elementor-page-5401" },
            { label: "علاج عصب وجذور الأسنان", href: "/services/endodontics" },
            { label: "زراعة الأسنان", href: "/services/dental-implants" },
          ],
        },
        { id: "ortho", label: "جراحة العظام والمفاصل", href: "/services/orthopedic-surgery" },
      ],
    },
    {
      branchId: "amerat",
      branchName: "فرع العامرات",
      href: "/services?branch=amerat",
      items: [
        { id: "amerat-weight", label: "💉 عيادة إدارة الوزن وحقن التخسيس", href: "/services/weight-management" },
        { id: "amerat-laser", label: "✨ عيادة العناية بالبشرة والليزر", href: "/services/skin-care-laser-treatments" },
        { id: "amerat-gp", label: "🩺 عيادة الطب العام والفحوصات الطبية", href: "/services?branch=amerat" },
      ],
    },
  ];

  // 2. Doctors Data grouped by Branch
  const branchDoctors = [
    {
      branchId: "azaiba",
      branchName: "أطباء فرع العذيبة",
      href: "/doctors?branch=azaiba",
      items: [
        { label: "🦷 أطباء الأسنان وتصميم الابتسامة", href: "/doctors?branch=azaiba" },
        { label: "🔪 استشاريو التجميل والجراحة", href: "/doctors?branch=azaiba" },
        { label: "✨ أطباء الجلدية والعناية بالبشرة", href: "/doctors?branch=azaiba" },
        { label: "💉 استشاريو السمنة وتخسيس الوزن", href: "/doctors?branch=azaiba" },
        { label: "🦴 جراحو العظام والمفاصل", href: "/doctors?branch=azaiba" },
        { label: "👨‍⚕️ عرض كادر أطباء فرع العذيبة بالكامل", href: "/doctors?branch=azaiba" },
      ],
    },
    {
      branchId: "amerat",
      branchName: "أطباء فرع العامرات",
      href: "/doctors?branch=amerat",
      items: [
        { label: "🩺 عيادات العامرات (سمنة • ليزر • طب عام)", href: "/doctors?branch=amerat" },
        { label: "👨‍⚕️ استكشاف كادر فرع العامرات", href: "/doctors?branch=amerat" },
      ],
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-smooth font-sans">
      {/* Main Header Bar */}
      <div
        className={`w-full transition-all duration-300 bg-[#151112] text-white ${
          isScrolled ? "py-3 shadow-2xl border-b border-apex-gold/30" : "py-4 border-b border-white/10"
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-44 sm:w-48 h-11 sm:h-12">
              <img
                src="/wp-content/uploads/2026/02/apex_logo-apexmedicaloman_white-txt.png"
                alt="Apex Medical Center - مجمع القمة الطبي"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className="px-3.5 py-2 text-xs xl:text-sm font-bold text-slate-200 hover:text-apex-gold hover:bg-white/5 rounded-lg transition-colors"
            >
              الرئيسية
            </Link>

            <Link
              href="/about"
              className="px-3.5 py-2 text-xs xl:text-sm font-bold text-slate-200 hover:text-apex-gold hover:bg-white/5 rounded-lg transition-colors"
            >
              عن المركز
            </Link>

            {/* 1. Procedures Branch Filtered Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setProceduresDropdownOpen(true)}
              onMouseLeave={() => {
                setProceduresDropdownOpen(false);
                setActiveProcedureBranch(null);
                setActiveSubMenuId(null);
              }}
            >
              <Link
                href="/services"
                className="px-3.5 py-2 text-xs xl:text-sm font-bold text-slate-200 hover:text-apex-gold hover:bg-white/5 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <span>إجراءاتنا</span>
                <ChevronDown className="w-4 h-4 text-apex-gold" />
              </Link>

              {proceduresDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-[#151112] border border-apex-gold/30 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in text-right">
                  <p className="px-3 py-1.5 text-[11px] font-extrabold text-apex-gold border-b border-white/10 mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>اختر الفرع لتصفح الإجراءات:</span>
                  </p>

                  {branchProcedures.map((b) => (
                    <div
                      key={b.branchId}
                      className="relative"
                      onMouseEnter={() => {
                        setActiveProcedureBranch(b.branchId);
                        setActiveSubMenuId(null);
                      }}
                    >
                      <Link
                        href={b.href}
                        className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                          activeProcedureBranch === b.branchId
                            ? "bg-white/10 text-apex-gold"
                            : "text-slate-200 hover:bg-white/5 hover:text-apex-gold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-apex-gold" />
                          <span>{b.branchName}</span>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-slate-400" />
                      </Link>

                      {/* Sub Flyout Menu for selected Branch */}
                      {activeProcedureBranch === b.branchId && (
                        <div className="absolute right-full top-0 mr-1 w-72 bg-[#151112] border border-apex-gold/30 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in text-right">
                          <p className="px-3 py-1.5 text-[11px] font-extrabold text-apex-gold border-b border-white/10 mb-1">
                            خدمات وإجراءات {b.branchName}:
                          </p>

                          {b.items.map((item) => (
                            <div
                              key={item.id}
                              className="relative"
                              onMouseEnter={() => item.hasSub ? setActiveSubMenuId(item.id) : setActiveSubMenuId(null)}
                            >
                              <Link
                                href={item.href}
                                className={`flex items-center justify-between px-3.5 py-2 text-xs font-semibold rounded-xl transition-colors ${
                                  activeSubMenuId === item.id
                                    ? "bg-white/10 text-apex-gold"
                                    : "text-slate-200 hover:bg-white/10 hover:text-apex-gold"
                                }`}
                              >
                                <span>{item.label}</span>
                                {item.hasSub && <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />}
                              </Link>

                              {/* 3rd Level Nested Sub-items (For Weight Management & Dentistry) */}
                              {item.hasSub && activeSubMenuId === item.id && (
                                <div className="absolute right-full top-0 mr-1 w-72 bg-[#151112] border border-apex-gold/40 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in text-right">
                                  <p className="px-3 py-1.5 text-[11px] font-extrabold text-apex-gold border-b border-white/10 mb-1">
                                    تفرعات {item.label}:
                                  </p>
                                  {item.subItems.map((sub, sIdx) => (
                                    <Link
                                      key={sIdx}
                                      href={sub.href}
                                      className="block px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-white/15 hover:text-apex-gold rounded-xl transition-colors"
                                    >
                                      {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="pt-1 mt-1 border-t border-white/10">
                    <Link
                      href="/services"
                      className="block text-center py-2 text-[11px] font-bold text-apex-gold hover:underline"
                    >
                      عرض جميع الأقسام بالتفصيل ➔
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Doctors Branch Filtered Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDoctorsDropdownOpen(true)}
              onMouseLeave={() => {
                setDoctorsDropdownOpen(false);
                setActiveDoctorBranch(null);
              }}
            >
              <Link
                href="/doctors"
                className="px-3.5 py-2 text-xs xl:text-sm font-bold text-slate-200 hover:text-apex-gold hover:bg-white/5 rounded-lg transition-colors inline-flex items-center gap-1"
              >
                <span>فريقنا</span>
                <ChevronDown className="w-4 h-4 text-apex-gold" />
              </Link>

              {doctorsDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-64 bg-[#151112] border border-apex-gold/30 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in text-right">
                  <p className="px-3 py-1.5 text-[11px] font-extrabold text-apex-gold border-b border-white/10 mb-1 flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>اختر الفرع لتصفح الأطباء:</span>
                  </p>

                  {branchDoctors.map((b) => (
                    <div
                      key={b.branchId}
                      className="relative"
                      onMouseEnter={() => setActiveDoctorBranch(b.branchId)}
                    >
                      <Link
                        href={b.href}
                        className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-bold rounded-xl transition-all ${
                          activeDoctorBranch === b.branchId
                            ? "bg-white/10 text-apex-gold"
                            : "text-slate-200 hover:bg-white/5 hover:text-apex-gold"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-apex-gold" />
                          <span>{b.branchName}</span>
                        </div>
                        <ChevronLeft className="w-4 h-4 text-slate-400" />
                      </Link>

                      {/* Sub Flyout Menu for selected Doctor Branch */}
                      {activeDoctorBranch === b.branchId && (
                        <div className="absolute right-full top-0 mr-1 w-72 bg-[#151112] border border-apex-gold/30 rounded-2xl shadow-2xl p-2 z-50 animate-fade-in text-right">
                          <p className="px-3 py-1.5 text-[11px] font-extrabold text-apex-gold border-b border-white/10 mb-1">
                            تخصصات وأطباء {b.branchName}:
                          </p>
                          {b.items.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              className="block px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-white/10 hover:text-apex-gold rounded-xl transition-colors"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="pt-1 mt-1 border-t border-white/10">
                    <Link
                      href="/doctors"
                      className="block text-center py-2 text-[11px] font-bold text-apex-gold hover:underline"
                    >
                      دليل جميع الأطباء والاستشاريين ➔
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/gallery"
              className="px-3.5 py-2 text-xs xl:text-sm font-bold text-slate-200 hover:text-apex-gold hover:bg-white/5 rounded-lg transition-colors"
            >
              معرض الصور
            </Link>

            <Link
              href="/contact"
              className="px-3.5 py-2 text-xs xl:text-sm font-bold text-slate-200 hover:text-apex-gold hover:bg-white/5 rounded-lg transition-colors"
            >
              اتصل بنا
            </Link>
          </nav>

          {/* Desktop Branch Quick Switcher & CTA */}
          <div className="flex items-center gap-3">
            <div className="hidden xl:flex items-center gap-1 bg-white/5 border border-apex-gold/30 p-1 rounded-full text-xs font-bold">
              <Link
                href="/services?branch=azaiba"
                className="px-3 py-1 rounded-full hover:bg-apex-gold hover:text-slate-950 text-slate-200 transition-all flex items-center gap-1"
              >
                <MapPin className="w-3 h-3 text-apex-gold" />
                <span>فرع العذيبة</span>
              </Link>
              <span className="text-white/20">•</span>
              <Link
                href="/services?branch=amerat"
                className="px-3 py-1 rounded-full hover:bg-apex-gold hover:text-slate-950 text-slate-200 transition-all flex items-center gap-1"
              >
                <MapPin className="w-3 h-3 text-apex-gold" />
                <span>فرع العامرات</span>
              </Link>
            </div>

            <button
              onClick={onOpenBooking}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-apex-gold to-apex-gold-dark hover:from-apex-gold-dark hover:to-apex-gold-deep text-slate-950 px-5 py-2 rounded-full font-extrabold text-xs sm:text-sm shadow-gold hover:shadow-xl transition-all hover:scale-105"
            >
              <Calendar className="w-4 h-4 text-slate-950" />
              <span>حجز موعد أونلاين</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-200 hover:text-apex-gold focus:outline-none"
              aria-label="القائمة"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex justify-end">
          <div className="w-4/5 max-w-sm bg-[#151112] text-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-r border-apex-gold/20 text-right">
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <img
                  src="/wp-content/uploads/2026/02/apex_logo-apexmedicaloman_white-txt.png"
                  alt="Apex Logo"
                  className="h-10 object-contain"
                />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:bg-white/10"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Branch Switcher Pill in Mobile Drawer */}
              <div className="mb-4 p-3 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-center">
                <p className="text-[11px] font-bold text-apex-gold flex items-center justify-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>تصفح خدمات الفروع:</span>
                </p>
                <div className="flex justify-center gap-2">
                  <Link
                    href="/services?branch=azaiba"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2 px-2 bg-white/10 rounded-xl text-xs font-bold text-slate-200 hover:bg-apex-gold hover:text-slate-950 transition-all"
                  >
                    فرع العذيبة
                  </Link>
                  <Link
                    href="/services?branch=amerat"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex-1 py-2 px-2 bg-white/10 rounded-xl text-xs font-bold text-slate-200 hover:bg-apex-gold hover:text-slate-950 transition-all"
                  >
                    فرع العامرات
                  </Link>
                </div>
              </div>

              <div className="flex flex-col space-y-1">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-2.5 font-bold text-slate-200 hover:text-apex-gold">
                  الرئيسية
                </Link>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="p-2.5 font-bold text-slate-200 hover:text-apex-gold">
                  عن مجمع القمة الطبي
                </Link>

                {/* Accordion: إجراءاتنا حسب الفرع */}
                <div className="border-y border-white/10 py-1 my-1">
                  <button
                    onClick={() => setMobileProceduresOpen(!mobileProceduresOpen)}
                    className="w-full p-2.5 font-bold text-slate-200 hover:text-apex-gold flex items-center justify-between"
                  >
                    <span>إجراءاتنا وتخصصاتنا</span>
                    <ChevronDown className={`w-4 h-4 text-apex-gold transition-transform ${mobileProceduresOpen ? "rotate-180" : ""}`} />
                  </button>

                  {mobileProceduresOpen && (
                    <div className="pr-3 space-y-3 pt-1 text-xs">
                      {branchProcedures.map((b) => (
                        <div key={b.branchId} className="space-y-1.5">
                          <p className="font-extrabold text-apex-gold text-[11px]">{b.branchName}:</p>
                          {b.items.map((item) => (
                            <div key={item.id} className="pr-2 space-y-1">
                              <Link
                                href={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block p-1 text-slate-200 font-bold hover:text-apex-gold"
                              >
                                • {item.label}
                              </Link>
                              {item.hasSub && (
                                <div className="pr-3 space-y-1 border-r border-white/10 my-1">
                                  {item.subItems.map((sub, sIdx) => (
                                    <Link
                                      key={sIdx}
                                      href={sub.href}
                                      onClick={() => setMobileMenuOpen(false)}
                                      className="block p-1 text-slate-400 hover:text-white"
                                    >
                                      - {sub.label}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Accordion: فريقنا حسب الفرع */}
                <div className="border-b border-white/10 pb-1 mb-1">
                  <button
                    onClick={() => setMobileDoctorsOpen(!mobileDoctorsOpen)}
                    className="w-full p-2.5 font-bold text-slate-200 hover:text-apex-gold flex items-center justify-between"
                  >
                    <span>فريقنا ودليل الأطباء</span>
                    <ChevronDown className={`w-4 h-4 text-apex-gold transition-transform ${mobileDoctorsOpen ? "rotate-180" : ""}`} />
                  </button>

                  {mobileDoctorsOpen && (
                    <div className="pr-4 space-y-3 pt-1 text-xs">
                      {branchDoctors.map((b) => (
                        <div key={b.branchId} className="space-y-1">
                          <p className="font-extrabold text-apex-gold text-[11px]">{b.branchName}:</p>
                          {b.items.map((item, idx) => (
                            <Link
                              key={idx}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block p-1.5 text-slate-300 hover:text-white"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <Link href="/gallery" onClick={() => setMobileMenuOpen(false)} className="p-2.5 font-bold text-slate-200 hover:text-apex-gold">
                  معرض الصور
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="p-2.5 font-bold text-slate-200 hover:text-apex-gold">
                  اتصل بنا ومواقع الفروع
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 space-y-2">
              <a
                href="tel:96897031500"
                className="w-full flex items-center justify-center gap-2 bg-white/10 text-slate-200 py-2.5 rounded-xl font-bold text-xs"
              >
                <Phone className="w-4 h-4 text-apex-gold" />
                <span>اتصال مباشر: 968 97031500</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 bg-apex-gold text-slate-950 py-3 rounded-xl font-extrabold shadow-md text-sm"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>حجز موعد أونلاين</span>
              </button>

              <Link
                href="/admin/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 text-xs text-slate-400 hover:text-apex-gold transition-colors pt-1"
              >
                <Shield className="w-3.5 h-3.5 text-apex-gold" />
                <span>دخول الإدارة</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

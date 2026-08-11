"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  SlidersHorizontal, Save, CheckCircle2, AlertCircle, Phone, Mail, MapPin, 
  Clock, Instagram, Youtube, Facebook, MessageCircle, Building2, Globe, FileText, Layout, Info, HelpCircle, Navigation
} from "lucide-react";

export default function AdminFooterSettingsPage() {
  const [footerSettings, setFooterSettings] = useState({
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

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Restore footer settings from localStorage
    const saved = localStorage.getItem("apex_footer_settings_json");
    if (saved) {
      try {
        setFooterSettings((prev) => ({ ...prev, ...JSON.parse(saved) }));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg({ type: "", text: "" });

    setTimeout(() => {
      localStorage.setItem("apex_footer_settings_json", JSON.stringify(footerSettings));
      setLoading(false);
      setMsg({
        type: "success",
        text: "تم حفظ وتحديث تخصيصات الفروع وحسابات السوشيال ميديا الجغرافية بنجاح!",
      });
    }, 500);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-slate-900">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-6 h-6 text-amber-500" />
              <span>تخصيص الفروع والسوشيال ميديا الجغرافية</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              تخصيص الحسابات الرسمية، الخرائط، وأرقام الواتساب المستقلة لكل فرع (العذيبة والعامرات).
            </p>
          </div>

          <button
            onClick={handleSaveSettings}
            disabled={loading}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-md transition-all hover:scale-105 disabled:opacity-50 flex items-center gap-2 self-start md:self-auto"
          >
            <Save className="w-4 h-4 text-slate-950" />
            <span>{loading ? "جاري الحفظ..." : "حفظ وتخصيص البيانات"}</span>
          </button>
        </div>

        {/* Global Guide Box */}
        <div className="bg-slate-900 text-white p-5 rounded-3xl border border-amber-500/40 space-y-2 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <HelpCircle className="w-6 h-6 text-amber-400" />
          </div>
          <div className="text-xs space-y-1 text-right">
            <h3 className="font-extrabold text-amber-400 text-sm">💡 دليل التخصيص المنفصل لكل فرع:</h3>
            <p className="text-slate-300 leading-relaxed font-semibold">
              لكل فرع حسابات سوشيال ميديا وموقع جغرافي ورابط خريطة مستقل. البيانات التي تقوم بتعديلها أدناه تظهر مباشرة داخل **بطاقات الفروع العائمة** بالموقع عند اختيار المريض للفرع.
            </p>
          </div>
        </div>

        {/* Feedback Message */}
        {msg.text && (
          <div
            className={`p-4 rounded-2xl text-xs font-extrabold flex items-center gap-2 ${
              msg.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-300"
                : "bg-rose-50 text-rose-900 border border-rose-300"
            }`}
          >
            {msg.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <span>{msg.text}</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-8 text-right">
          
          {/* SECTION 1: BRANCH 1 (AL AZAIBA) CUSTOM DEDICATED DATA */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-blue-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-blue-100 pb-3">
              <h2 className="text-base font-extrabold text-blue-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-600" />
                <span>1. تخصيص الفرع الأول (فرع العذيبة الرئيسي)</span>
              </h2>
              <span className="text-xs bg-blue-100 text-blue-800 font-extrabold px-3 py-1 rounded-xl">
                الفرع الرئيسي
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">العنوان الجغرافي الشارع *</label>
                <input
                  type="text"
                  required
                  value={footerSettings.azaibaAddress}
                  onChange={(e) => setFooterSettings({ ...footerSettings, azaibaAddress: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">📌 عنوان العذيبة بالكامل.</span>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">رابط الموقع على خرائط جوجل *</label>
                <input
                  type="text"
                  required
                  value={footerSettings.azaibaMapUrl}
                  onChange={(e) => setFooterSettings({ ...footerSettings, azaibaMapUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                />
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">📌 رابط Google Maps فرع العذيبة.</span>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">هاتف فرع العذيبة *</label>
                <input
                  type="text"
                  required
                  value={footerSettings.azaibaPhone}
                  onChange={(e) => setFooterSettings({ ...footerSettings, azaibaPhone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                />
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">📌 هاتف الاستقبال المباشر.</span>
              </div>
            </div>

            {/* Social Accounts for Al Azaiba */}
            <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-200 space-y-3">
              <span className="text-xs font-extrabold text-blue-900 block">حسابات السوشيال ميديا الخاصة بفرع العذيبة:</span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span>إنستغرام فرع العذيبة</span>
                  </label>
                  <input
                    type="text"
                    value={footerSettings.azaibaInstagramUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, azaibaInstagramUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Youtube className="w-3.5 h-3.5 text-red-600" />
                    <span>يوتيوب فرع العذيبة</span>
                  </label>
                  <input
                    type="text"
                    value={footerSettings.azaibaYoutubeUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, azaibaYoutubeUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Facebook className="w-3.5 h-3.5 text-blue-600" />
                    <span>فيسبوك فرع العذيبة</span>
                  </label>
                  <input
                    type="text"
                    value={footerSettings.azaibaFacebookUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, azaibaFacebookUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: BRANCH 2 (AL AMERAT) CUSTOM DEDICATED DATA */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
              <h2 className="text-base font-extrabold text-emerald-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <span>2. تخصيص الفرع الثاني (فرع العامرات التخصصي)</span>
              </h2>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-3 py-1 rounded-xl">
                الفرع التخصصي
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">العنوان الجغرافي الشارع *</label>
                <input
                  type="text"
                  required
                  value={footerSettings.ameratAddress}
                  onChange={(e) => setFooterSettings({ ...footerSettings, ameratAddress: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                />
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">📌 عنوان العامرات بالكامل.</span>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">رابط الموقع على خرائط جوجل *</label>
                <input
                  type="text"
                  required
                  value={footerSettings.ameratMapUrl}
                  onChange={(e) => setFooterSettings({ ...footerSettings, ameratMapUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                />
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">📌 رابط Google Maps فرع العامرات.</span>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">هاتف فرع العامرات *</label>
                <input
                  type="text"
                  required
                  value={footerSettings.ameratPhone}
                  onChange={(e) => setFooterSettings({ ...footerSettings, ameratPhone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                />
                <span className="text-[10px] text-slate-400 font-semibold mt-1 block">📌 هاتف فرع العامرات المباشر.</span>
              </div>
            </div>

            {/* Social Accounts for Al Amerat */}
            <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-3">
              <span className="text-xs font-extrabold text-emerald-900 block">حسابات السوشيال ميديا الخاصة بفرع العامرات:</span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Instagram className="w-3.5 h-3.5 text-pink-600" />
                    <span>إنستغرام فرع العامرات</span>
                  </label>
                  <input
                    type="text"
                    value={footerSettings.ameratInstagramUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, ameratInstagramUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Youtube className="w-3.5 h-3.5 text-red-600" />
                    <span>يوتيوب فرع العامرات</span>
                  </label>
                  <input
                    type="text"
                    value={footerSettings.ameratYoutubeUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, ameratYoutubeUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1">
                    <Facebook className="w-3.5 h-3.5 text-blue-600" />
                    <span>فيسبوك فرع العامرات</span>
                  </label>
                  <input
                    type="text"
                    value={footerSettings.ameratFacebookUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, ameratFacebookUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: GLOBAL CLINIC DATA & COPYRIGHTS */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
              <Globe className="w-5 h-5 text-amber-500" />
              <span>3. بيانات المجمع الرئيسية ونصوص حقوق النشر</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">البريد الإلكتروني الرئيسي *</label>
                <input
                  type="email"
                  required
                  value={footerSettings.clinicEmail}
                  onChange={(e) => setFooterSettings({ ...footerSettings, clinicEmail: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">الوصف التعريفي بالتذييل *</label>
                <textarea
                  rows={2}
                  required
                  value={footerSettings.footerBio}
                  onChange={(e) => setFooterSettings({ ...footerSettings, footerBio: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">نص حقوق النشر (Copyright) *</label>
                <input
                  type="text"
                  value={footerSettings.copyrightText}
                  onChange={(e) => setFooterSettings({ ...footerSettings, copyrightText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">نص حقوق التطوير لشركة SR LOR *</label>
                <input
                  type="text"
                  value={footerSettings.developerText}
                  onChange={(e) => setFooterSettings({ ...footerSettings, developerText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all hover:scale-105 flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-slate-950" />
              <span>{loading ? "جاري الحفظ..." : "حفظ وتخصيص بيانات الفروع"}</span>
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}

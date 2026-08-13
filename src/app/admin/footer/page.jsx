"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  SlidersHorizontal, Save, CheckCircle2, AlertCircle, Phone, Mail, MapPin, 
  Clock, Instagram, Youtube, Facebook, MessageCircle, Building2, Globe, FileText, Layout, Navigation
} from "lucide-react";

export default function AdminFooterSettingsPage() {
  const [footerSettings, setFooterSettings] = useState({
    clinicPhone: "968 97031500",
    whatsappPhone: "96897031500",
    clinicEmail: "info@apexmedicaloman.com",
    workingHours: "السبت - الخميس: 09:00 ص - 09:00 م",
    footerBio: "مجمع القمة الطبي في سلطنة عمان (Apex Medical Center) — وجهتكم المعتمدة للرعاية الصحية المتكاملة، طب وتجميل الأسنان، الجراحة التجميلية، الجلدية والليزر، وتخسيس الوزن بأعلى المعايير العالمية.",
    
    // Branch 1: Al Azaiba Dedicated Details
    azaibaAddress: "مسقط - العذيبة - شارع السلطان قابوس",
    azaibaDesc: "المركز الرئيسي للجراحات والتجميل المتكامل والأسنان",
    azaibaMapUrl: "https://maps.app.goo.gl/yWq6D32JjmRpHQtb8",
    azaibaPhone: "968 97031500",
    azaibaWhatsapp: "96897031500",
    azaibaHours: "السبت - الخميس: 09:00 ص - 09:00 م",
    azaibaInstagramUrl: "https://www.instagram.com/apex_medical_clinics_center?igsh=MWV2a2gyYTRoYnFpYQ%3D%3D&utm_source=qr",
    azaibaYoutubeUrl: "https://www.youtube.com",
    azaibaFacebookUrl: "https://www.facebook.com",

    // Branch 2: Al Amerat Dedicated Details
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

  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
        text: "تم حفظ الإعدادات الرسمية وتخصيصات الفروع بنجاح.",
      });
    }, 400);
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-slate-900 font-sans text-right">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-amber-500" />
              <span>إعدادات التذييل والبيانات الرسمية</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              إدارة أرقام الاتصال، الخرائط الجغرافية، وحسابات التواصل لفرعي العذيبة والعامرات.
            </p>
          </div>

          <button
            onClick={handleSaveSettings}
            disabled={loading}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <Save className="w-4 h-4 text-slate-950" />
            <span>{loading ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
          </button>
        </div>

        {/* Feedback Message */}
        {msg.text && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
              msg.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-300"
                : "bg-rose-50 text-rose-900 border border-rose-300"
            }`}
          >
            {msg.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
            )}
            <span>{msg.text}</span>
          </div>
        )}

        <form onSubmit={handleSaveSettings} className="space-y-8">
          
          {/* Section 1: Al Azaiba Branch */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-amber-500" />
                <span>بيانات فرع العذيبة</span>
              </h2>
              <span className="text-xs bg-slate-100 text-slate-700 font-bold px-3 py-1 rounded-lg">الفرع الرئيسي</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">العنوان الجغرافي</label>
                <input
                  type="text"
                  required
                  value={footerSettings.azaibaAddress}
                  onChange={(e) => setFooterSettings({ ...footerSettings, azaibaAddress: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رابط Google Maps</label>
                <input
                  type="text"
                  required
                  value={footerSettings.azaibaMapUrl}
                  onChange={(e) => setFooterSettings({ ...footerSettings, azaibaMapUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left dir-ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">هاتف الفرع المباشر</label>
                <input
                  type="text"
                  required
                  value={footerSettings.azaibaPhone}
                  onChange={(e) => setFooterSettings({ ...footerSettings, azaibaPhone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left dir-ltr"
                />
              </div>
            </div>

            {/* Social Accounts */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">حسابات التواصل الاجتماعي لفرع العذيبة</span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Instagram</label>
                  <input
                    type="text"
                    value={footerSettings.azaibaInstagramUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, azaibaInstagramUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">YouTube</label>
                  <input
                    type="text"
                    value={footerSettings.azaibaYoutubeUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, azaibaYoutubeUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Facebook</label>
                  <input
                    type="text"
                    value={footerSettings.azaibaFacebookUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, azaibaFacebookUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left dir-ltr"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Al Amerat Branch */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-600" />
                <span>بيانات فرع العامرات</span>
              </h2>
              <span className="text-xs bg-emerald-50 text-emerald-800 font-bold px-3 py-1 rounded-lg">الفرع التخصصي</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">العنوان الجغرافي</label>
                <input
                  type="text"
                  required
                  value={footerSettings.ameratAddress}
                  onChange={(e) => setFooterSettings({ ...footerSettings, ameratAddress: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رابط Google Maps</label>
                <input
                  type="text"
                  required
                  value={footerSettings.ameratMapUrl}
                  onChange={(e) => setFooterSettings({ ...footerSettings, ameratMapUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left dir-ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">هاتف الفرع المباشر</label>
                <input
                  type="text"
                  required
                  value={footerSettings.ameratPhone}
                  onChange={(e) => setFooterSettings({ ...footerSettings, ameratPhone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left dir-ltr"
                />
              </div>
            </div>

            {/* Social Accounts */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 block">حسابات التواصل الاجتماعي لفرع العامرات</span>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Instagram</label>
                  <input
                    type="text"
                    value={footerSettings.ameratInstagramUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, ameratInstagramUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">YouTube</label>
                  <input
                    type="text"
                    value={footerSettings.ameratYoutubeUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, ameratYoutubeUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left dir-ltr"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-slate-600 mb-1">Facebook</label>
                  <input
                    type="text"
                    value={footerSettings.ameratFacebookUrl}
                    onChange={(e) => setFooterSettings({ ...footerSettings, ameratFacebookUrl: e.target.value })}
                    className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left dir-ltr"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: General Info & Copyright */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-4">
              <Globe className="w-5 h-5 text-amber-500" />
              <span>معلومات المركز العامة وحقوق النشر</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">البريد الإلكتروني المعتمد</label>
                <input
                  type="email"
                  required
                  value={footerSettings.clinicEmail}
                  onChange={(e) => setFooterSettings({ ...footerSettings, clinicEmail: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left dir-ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">أوقات العمل الرسمية</label>
                <input
                  type="text"
                  required
                  value={footerSettings.workingHours}
                  onChange={(e) => setFooterSettings({ ...footerSettings, workingHours: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">نبذة المركز بالتذييل</label>
              <textarea
                rows={2}
                required
                value={footerSettings.footerBio}
                onChange={(e) => setFooterSettings({ ...footerSettings, footerBio: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نص حقوق النشر (Copyright)</label>
                <input
                  type="text"
                  value={footerSettings.copyrightText}
                  onChange={(e) => setFooterSettings({ ...footerSettings, copyrightText: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                  <span>نص حقوق التطوير (SR LOR)</span>
                  <span className="text-[10px] text-amber-600 font-extrabold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">🔒 محمي وغير قابل للتعديل</span>
                </label>
                <input
                  type="text"
                  readOnly
                  disabled
                  value="تطوير وتصميم • شركة لور (SR LOR, LLC) © 2026"
                  className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-600 cursor-not-allowed select-none"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4 text-slate-950" />
              <span>{loading ? "جاري الحفظ..." : "حفظ التغييرات"}</span>
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}

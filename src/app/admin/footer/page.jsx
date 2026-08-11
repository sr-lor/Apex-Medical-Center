"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  SlidersHorizontal, Save, CheckCircle2, AlertCircle, Phone, Mail, MapPin, 
  Clock, Instagram, Youtube, Facebook, MessageCircle, Building2, Globe, FileText, Layout
} from "lucide-react";

export default function AdminFooterSettingsPage() {
  const [footerSettings, setFooterSettings] = useState({
    clinicPhone: "968 97031500",
    whatsappPhone: "96897031500",
    clinicEmail: "info@apexmedicaloman.com",
    workingHours: "السبت - الخميس: 09:00 ص - 09:00 م",
    footerBio: "مجمع القمة الطبي في سلطنة عمان (Apex Medical Center) - وجهتك الرائدة للرعاية الصحية المتكاملة، طب وتجميل الأسنان، الجراحة التجميلية، الجلدية والليزر، وجراحات إدارة السمنة والوزن بأعلى المعايير العالمية.",
    
    // Branch 1: Al Azaiba
    azaibaBranchTitle: "1. فرع العذيبة",
    azaibaAddress: "مسقط - العذيبة - شارع السلطان قابوس",
    azaibaDesc: "تخصصات متكاملة وجراحات تجميلية وأسنان",
    azaibaMapUrl: "https://maps.app.goo.gl/yWq6D32JjmRpHQtb8",

    // Branch 2: Al Amerat
    ameratBranchTitle: "2. فرع العامرات",
    ameratAddress: "مسقط - العامرات - الشارع العام",
    ameratDesc: "عيادات السمنة والتخسيس • ليزر والبشرة • طب عام",

    // Social Links
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
        setFooterSettings(JSON.parse(saved));
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
        text: "تم حفظ وتحديث إعدادات تذييل الموقع والبيانات الرسمية بنجاح! يتم التطبيق فورياً على الموقع.",
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
              <span>إدارة وتعديل تذييل الموقع (Footer Settings)</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              التحكم الكامل بأرقام التواصل، الفروع، أوقات العمل، منصات التواصل الاجتماعي، ونصوص حقوق الموقع.
            </p>
          </div>

          <button
            onClick={handleSaveSettings}
            disabled={loading}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-md transition-all hover:scale-105 disabled:opacity-50 flex items-center gap-2 self-start md:self-auto"
          >
            <Save className="w-4 h-4 text-slate-950" />
            <span>{loading ? "جاري الحفظ..." : "حفظ وتطوير التغييرات"}</span>
          </button>
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
          
          {/* Section 1: Main Contact Info & Bio */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
              <Phone className="w-5 h-5 text-amber-500" />
              <span>1. بيانات التواصل الأساسية والوصف التعريفي</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">رقم الهاتف الرسمي *</label>
                <input
                  type="text"
                  required
                  value={footerSettings.clinicPhone}
                  onChange={(e) => setFooterSettings({ ...footerSettings, clinicPhone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left focus:ring-2 focus:ring-amber-500"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">رقم الواتساب السريع *</label>
                <input
                  type="text"
                  required
                  value={footerSettings.whatsappPhone}
                  onChange={(e) => setFooterSettings({ ...footerSettings, whatsappPhone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left focus:ring-2 focus:ring-amber-500"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">البريد الإلكتروني للعيادة *</label>
                <input
                  type="email"
                  required
                  value={footerSettings.clinicEmail}
                  onChange={(e) => setFooterSettings({ ...footerSettings, clinicEmail: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left focus:ring-2 focus:ring-amber-500"
                  dir="ltr"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">ساعات وأوقات العمل الرسمية *</label>
                <input
                  type="text"
                  required
                  value={footerSettings.workingHours}
                  onChange={(e) => setFooterSettings({ ...footerSettings, workingHours: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1">الوصف التعريفي للترويسة في التذييل *</label>
                <textarea
                  rows={2}
                  required
                  value={footerSettings.footerBio}
                  onChange={(e) => setFooterSettings({ ...footerSettings, footerBio: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Dual Branches Settings */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
              <Building2 className="w-5 h-5 text-amber-500" />
              <span>2. بيانات وإحداثيات الفروع (العذيبة والعامرات)</span>
            </h2>

            {/* Branch 1: Al Azaiba */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-extrabold text-amber-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>الفرع الأول (العذيبة)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="عنوان الفرع (مثال: مسقط - العذيبة)"
                  value={footerSettings.azaibaAddress}
                  onChange={(e) => setFooterSettings({ ...footerSettings, azaibaAddress: e.target.value })}
                  className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                />
                <input
                  type="text"
                  placeholder="الوصف المقتضب للفرع"
                  value={footerSettings.azaibaDesc}
                  onChange={(e) => setFooterSettings({ ...footerSettings, azaibaDesc: e.target.value })}
                  className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                />
                <input
                  type="text"
                  placeholder="رابط موقع الخريطة Google Maps"
                  value={footerSettings.azaibaMapUrl}
                  onChange={(e) => setFooterSettings({ ...footerSettings, azaibaMapUrl: e.target.value })}
                  className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                />
              </div>
            </div>

            {/* Branch 2: Al Amerat */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h3 className="text-xs font-extrabold text-amber-800 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>الفرع الثاني (العامرات)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="عنوان الفرع (مثال: مسقط - العامرات)"
                  value={footerSettings.ameratAddress}
                  onChange={(e) => setFooterSettings({ ...footerSettings, ameratAddress: e.target.value })}
                  className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                />
                <input
                  type="text"
                  placeholder="الوصف المقتضب للفرع الثاني"
                  value={footerSettings.ameratDesc}
                  onChange={(e) => setFooterSettings({ ...footerSettings, ameratDesc: e.target.value })}
                  className="p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Social Links & Copyright */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-3">
              <Globe className="w-5 h-5 text-amber-500" />
              <span>3. منصات التواصل الاجتماعي ونصوص حقوق النشر</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                  <Instagram className="w-3.5 h-3.5 text-pink-600" />
                  <span>رابط إنستغرام *</span>
                </label>
                <input
                  type="text"
                  value={footerSettings.instagramUrl}
                  onChange={(e) => setFooterSettings({ ...footerSettings, instagramUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                  <Youtube className="w-3.5 h-3.5 text-red-600" />
                  <span>رابط يوتيوب *</span>
                </label>
                <input
                  type="text"
                  value={footerSettings.youtubeUrl}
                  onChange={(e) => setFooterSettings({ ...footerSettings, youtubeUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1 flex items-center gap-1">
                  <Facebook className="w-3.5 h-3.5 text-blue-600" />
                  <span>رابط فيسبوك *</span>
                </label>
                <input
                  type="text"
                  value={footerSettings.facebookUrl}
                  onChange={(e) => setFooterSettings({ ...footerSettings, facebookUrl: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left dir-ltr"
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
              <span>{loading ? "جاري الحفظ..." : "حفظ وتطوير التغييرات"}</span>
            </button>
          </div>

        </form>

      </div>
    </AdminLayout>
  );
}

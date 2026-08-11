"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { 
  UserCheck, Stethoscope, MapPin, Building2, Shield, Image, 
  ArrowLeft, Plus, Edit3, Sparkles, CheckCircle2 
} from "lucide-react";

export default function AdminDashboard() {
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [azaibaDoctorsCount, setAzaibaDoctorsCount] = useState(0);
  const [ameratDoctorsCount, setAmeratDoctorsCount] = useState(0);

  const [servicesCount, setServicesCount] = useState(0);
  const [azaibaServicesCount, setAzaibaServicesCount] = useState(0);
  const [ameratServicesCount, setAmeratServicesCount] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [docsRes, servsRes] = await Promise.all([
          fetch("/api/doctors"),
          fetch("/api/services"),
        ]);
        const docsData = await docsRes.json();
        const servsData = await servsRes.json();

        if (docsData.success) {
          const docs = docsData.data;
          setDoctorsCount(docs.length);
          setAzaibaDoctorsCount(docs.filter((d) => d.branchIds?.includes("azaiba")).length);
          setAmeratDoctorsCount(docs.filter((d) => d.branchIds?.includes("amerat")).length);
        }

        if (servsData.success) {
          const servs = servsData.data;
          setServicesCount(servs.length);
          setAzaibaServicesCount(servs.filter((s) => s.branchIds?.includes("azaiba")).length);
          setAmeratServicesCount(servs.filter((s) => s.branchIds?.includes("amerat")).length);
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-apex-navy via-[#1E1B1C] to-slate-900 text-white p-8 rounded-3xl border border-apex-gold/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-apex-gold/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1 rounded-full text-xs font-bold text-apex-gold border border-apex-gold/30">
              <Shield className="w-4 h-4 text-apex-gold" />
              <span>نظام إدارة مجمع القمة الطبي - سلطنة عمان</span>
            </div>
            
            <h1 className="text-3xl font-extrabold tracking-tight">
              أهلاً بك في لوحة تحكم <span className="text-gradient-apex">مجمع القمة الطبي</span>
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-medium leading-relaxed">
              يمكنك من هنا التحكم الكامل بالأطباء، التخصصات، تصفية الفروع (العذيبة والعامرات)، وتحديث التخزين السحابي AWS S3 بسهولة وفورية.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Total Doctors */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">إجمالي الكادر الطبي</span>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                <UserCheck className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">{loading ? "..." : doctorsCount}</h2>
              <p className="text-[11px] text-slate-400 mt-1 font-semibold">أطباء واستشاريين معتمدين</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold">
              <span className="text-blue-600 font-bold">عذيبة: {azaibaDoctorsCount}</span>
              <span className="text-emerald-600 font-bold">عامرات: {ameratDoctorsCount}</span>
            </div>
          </div>

          {/* Total Specialties */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">التخصصات والعيادات</span>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                <Stethoscope className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900">{loading ? "..." : servicesCount}</h2>
              <p className="text-[11px] text-slate-400 mt-1 font-semibold">عيادة وأقسام علاجية متخصصة</p>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-extrabold">
              <span className="text-blue-600 font-bold">عذيبة: {azaibaServicesCount}</span>
              <span className="text-emerald-600 font-bold">عامرات: {ameratServicesCount}</span>
            </div>
          </div>

          {/* Azaiba Branch */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">فرع العذيبة الرئيسي</span>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                <MapPin className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">مسقط - العذيبة</h2>
              <p className="text-[11px] text-slate-400 mt-1 font-semibold">كافة التخصصات والجراحات</p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-blue-700">
              {azaibaDoctorsCount} أطباء • {azaibaServicesCount} عيادات
            </div>
          </div>

          {/* Amerat Branch */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500">فرع العامرات</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">مسقط - العامرات</h2>
              <p className="text-[11px] text-slate-400 mt-1 font-semibold">عيادات السمنة والليزر والطب العام</p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] font-bold text-emerald-700">
              {ameratDoctorsCount} أطباء • {ameratServicesCount} عيادات
            </div>
          </div>

        </div>

        {/* Action Shortcuts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Doctor Management Shortcut */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-apex-navy text-white flex items-center justify-center mb-3">
                <UserCheck className="w-6 h-6 text-apex-gold" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">إدارة وتعديل الأطباء</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                إضافة أطباء جدد، تعديل السير السريرية والمؤهلات، رفع الصور إلى AWS S3، وفلترة الأطباء حسب فرع العذيبة أو العامرات.
              </p>
            </div>

            <Link
              href="/admin/doctors"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 px-5 rounded-2xl text-xs transition-colors shadow-sm"
            >
              <span>فتح لوحة التحكم بالأطباء</span>
              <ArrowLeft className="w-4 h-4 text-apex-gold" />
            </Link>
          </div>

          {/* Service Management Shortcut */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-apex-navy text-white flex items-center justify-center mb-3">
                <Stethoscope className="w-6 h-6 text-apex-gold" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">إدارة وتعديل التخصصات والعيادات</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                تعديل نصوص التخصصات الطبية، إضافة أقسام جديدة، تخصيص فروع كل عيادة، وتنسيق الأوصاف البرمجية الكاملة.
              </p>
            </div>

            <Link
              href="/admin/services"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold py-3 px-5 rounded-2xl text-xs transition-colors shadow-sm"
            >
              <span>فتح لوحة التحكم بالتخصصات</span>
              <ArrowLeft className="w-4 h-4 text-apex-gold" />
            </Link>
          </div>

        </div>

      </div>
    </AdminLayout>
  );
}

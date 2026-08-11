"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  CreditCard, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, 
  Sparkles, Calendar, Clock, Lock, ArrowLeft, ExternalLink, Award, FileText, 
  Gift, Heart, Tag, Cpu, Bot, Settings, Server, Headphones, Search, Globe, Layout, HardDrive, ShoppingBag, CalendarCheck, Check
} from "lucide-react";

export default function AdminSubscriptionPage() {
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [saveCardAutoRenewal, setSaveCardAutoRenewal] = useState(true);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Subscription state: Active 6-Month Free Support Grant by Ms. Rafah Abdul Qader & 65% Permanent Discount
  const [subscriptionInfo] = useState({
    status: "active_free_grant",
    planName: "باقة تشغيل كاملة لمجمع القمة الطبي (شركة SR LOR)",
    originalPriceOMR: 9.90,
    discountPercent: 65,
    finalPriceOMR: 3.465, // 9.90 - 65% = 3.465 OMR
    grantTitle: "الدعم والمنحة الخاصة المقدمة من الآنسة رفاه عبد القادر",
    grantExpiryDate: "11 فبراير 2027", // 6 months from current date
    daysRemaining: 180,
    isFreePeriod: true, // Currently 100% free period (0.00 OMR charge)
  });

  // Real verified payment records (No fake dummy data)
  const [paymentHistory] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success") === "true") {
      setMsg({
        type: "success",
        text: "تم حفظ بطاقتك بنجاح للتجديد التلقائي بدون أي اقتطاع مالي حالياً طوال فترة الدعم المجاني!",
      });
    } else if (query.get("canceled") === "true") {
      setMsg({
        type: "error",
        text: "تم إلغاء عملية حفظ البطاقة. يمكنك الإعادة في أي وقت.",
      });
    }
  }, []);

  const handlePayWithGateway = async () => {
    setLoadingPayment(true);
    setMsg({ type: "", text: "" });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isFreePeriod: subscriptionInfo.isFreePeriod,
          amount: subscriptionInfo.finalPriceOMR,
          saveCardAutoRenewal,
          planName: subscriptionInfo.planName,
        }),
      });

      const data = await res.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        setMsg({
          type: "error",
          text: data.message || "حدث خطأ أثناء فتح بوابة الدفع الإلكتروني",
        });
        setLoadingPayment(false);
      }
    } catch (err) {
      console.error("Payment error:", err);
      setMsg({ type: "error", text: "تعذر الاتصال ببوابة الدفع الإلكتروني" });
      setLoadingPayment(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-slate-900">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-amber-500" />
              <span>إدارة الاشتراك والدفع التلقائي</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              متابعة حالة ترخيص التشغيل، تفعيل حفظ البطاقة للتجديد التلقائي، والمنحة المقدمة من الآنسة رفاه عبد القادر.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-2xl text-xs font-extrabold border border-emerald-300">
            <Gift className="w-4 h-4 text-emerald-600" />
            <span>الدعم المجاني مفعّل (0.000 ر.ع.)</span>
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

        {/* 1. LUXURY PRICING DISPLAY & ACTIVE SUBSCRIPTION STATUS */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-apex-navy text-white p-8 rounded-3xl border-2 border-amber-500/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Pricing Details */}
            <div className="lg:col-span-7 space-y-5 text-right">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-emerald-500/20 text-emerald-300 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>فترة الدعم المجاني نشطة (0.000 ر.ع.)</span>
                </span>

                <span className="bg-amber-500/20 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-500/40 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>خصم دائم 65% مفعّل لاحقاً</span>
                </span>
              </div>

              {/* Luxury Price Breakdown Box */}
              <div className="space-y-1 bg-white/5 p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-400 font-bold block">عرض السعر والترخيص المعتمد:</span>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-sm font-bold text-slate-400 line-through">
                    السعر الأصلي: {subscriptionInfo.originalPriceOMR} ر.ع. / شهرياً
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                    {subscriptionInfo.finalPriceOMR} ريال عماني <span className="text-xs text-slate-300 font-bold">/ شهرياً</span>
                  </span>
                </div>
                <p className="text-[11px] text-emerald-300 font-extrabold pt-1">
                  ✨ حالياً 0.000 ر.ع. (مجاناً لمدة 6 أشهر قادمة) — ثم يبدأ الخصم الدائم 65%.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>تاريخ انتهاء الفترة المجانية: {subscriptionInfo.grantExpiryDate}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>المتبقي مجاناً: {subscriptionInfo.daysRemaining} يوماً</span>
                </div>
              </div>
            </div>

            {/* Right Card Saving & Auto-Renewal Action Box */}
            <div className="lg:col-span-5 bg-white/5 p-6 rounded-2xl border border-white/10 text-right space-y-4 backdrop-blur-md">
              <div className="border-b border-white/10 pb-3">
                <span className="text-xs font-extrabold text-amber-400 block mb-1">باقة تشغيل كاملة — شركة SR LOR</span>
                <div className="text-xl font-black text-white">
                  0.000 ر.ع. <span className="text-xs text-slate-400 font-semibold">(مغلق السحب حالياً)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 font-semibold leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-white/10">
                🔒 **أمان مالي كامل**: بما أن موقعك يمتلك دعماً مجانياً لمدة 6 أشهر، لن يتم اقتطاع أو سحب أي مبالغ مالية عند إضافة بطاقتك. يمكنك حفظ البطاقة للتجديد التلقائي مستقبلاً.
              </p>

              {/* Auto Renewal Toggle */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/90 border border-amber-500/30 cursor-pointer text-xs text-slate-200 font-bold hover:bg-slate-900 transition-colors">
                <input
                  type="checkbox"
                  checked={saveCardAutoRenewal}
                  onChange={(e) => setSaveCardAutoRenewal(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 mt-0.5"
                />
                <span>حفظ بطاقة الدفع آمنة وتفعيل التجديد التلقائي مستقبلاً (0.000 ر.ع. حالياً)</span>
              </label>

              <button
                onClick={handlePayWithGateway}
                disabled={loadingPayment}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-slate-950" />
                <span>{loadingPayment ? "جاري فتح بوابة الدفع..." : "حفظ البطاقة للتجديد التلقائي (مجاناً)"}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>مشفّر ومؤمّن بالكامل بمعايير SSL وحماية البطاقات</span>
              </div>
            </div>

          </div>
        </div>

        {/* 2. CONSOLIDATED SECTION: Special Support & Grant by Ms. Rafah Abdul Qader (Name mentioned ONCE only) */}
        <div className="bg-gradient-to-br from-amber-500/10 via-emerald-500/5 to-slate-50 border-2 border-amber-400 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-300/60 pb-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 px-3 py-1 rounded-full text-xs font-black shadow-sm">
                <Heart className="w-3.5 h-3.5 text-rose-950 fill-rose-950" />
                <span>الدعم الفني والمنحة الرسمية الخاصة</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {subscriptionInfo.grantTitle}
              </h2>
            </div>

            <div className="bg-amber-500 text-slate-950 px-4 py-2 rounded-2xl text-xs font-black flex items-center gap-2 shadow-sm self-start sm:self-auto">
              <Award className="w-4 h-4 text-slate-950" />
              <span>دعم وتطوير مجاني مفعّل</span>
            </div>
          </div>

          {/* 4 Dedicated Support Features (No duplicate name inside text) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-right">
            
            <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-sm space-y-2 hover:border-amber-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Gift className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">دعم مجاني 6 أشهر</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                تشغيل واستضافة مجانية كاملة ومغطاة بالكامل لمدة 6 أشهر من تاريخ تفعيل المنصة.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-sm space-y-2 hover:border-emerald-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <Tag className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">خصم دائم 65%</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                تخفيض دائم ومستمر بقيمة 65% على قيمة الاشتراك عند التجديد بعد انتهاء الـ 6 أشهر.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm space-y-2 hover:border-blue-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">إضافة ميزات وأقسام مجانية</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                إضافة ميزات برمجية جديدة وأقسام مخصصة للموقع لا يخضع لأي رسوم إضافية نهائياً.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-sm space-y-2 hover:border-purple-400 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">أقوى نماذج ذكاء اصطناعي من شركة SR LOR</h3>
              <p className="text-xs text-slate-600 font-semibold leading-relaxed">
                ربط وتزويد المنصة بأحدث نماذج وتصنيفات الذكاء الاصطناعي المتقدمة من شركة SR LOR.
              </p>
            </div>

          </div>
        </div>

        {/* 3. CONSOLIDATED SECTION: Full Package Contents (محتويات الباقة) */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Award className="w-6 h-6 text-amber-500" />
              <span>محتويات باقة التشغيل الكاملة — شركة SR LOR</span>
            </h2>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              كافة الأدوات والتجهيزات المشمولة تلقائياً في باقة تشغيل مجمع القمة الطبي.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-bold text-slate-800">
            
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <Bot className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">رين AI</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">المساعد الطبي الذكي للتفاعل الفوري والإجابة عن استفسارات المرضى.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <Settings className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">تعديل وتخصيص كامل</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">إمكانية التعديل الكامل على بيانات الأطباء والتخصصات وفلترة الفروع.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <Server className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">استضافة آمنة وسريعة</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">خوادم عالية السرعة مع حماية تشفير كاملة لبيانات المجمع.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <Headphones className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">خدمة العملاء</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">نظام متكامل يسهل للعملاء التواصل المباشر مع العيادة وتحديد الاستفسارات.</p>
              </div>
            </div>

            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-300 flex items-start gap-3">
              <CalendarCheck className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">نظام الحجوزات</h4>
                <p className="text-amber-800 text-[11px] font-bold leading-relaxed">يتم التفعيل والربط المباشر فور طلب الميزة من الإدارة.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <Search className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">توزيع سلس وسهولة البحث</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">فلترة تفاعلية وسريعة للبحث في الأطباء والعيادات حسب الفرع.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <Globe className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">تحسين عملية البحث في جوجل (SEO)</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">تهيئة برمجية شاملة لمحركات البحث لرفع ترتيب المجمع في مسقط.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <Layout className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">تصميم عصري وحديث</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">واجهات فاخرة فائقة السرعة متوافقة كلياً مع الجوال والأجهزة.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <HardDrive className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">مساحة تخزين غير محدودة</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">رفع وتخزين صور الأطباء والوسائط بدون أي قيود مساحة.</p>
              </div>
            </div>

            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-300 flex items-start gap-3 sm:col-span-2 lg:col-span-1">
              <ShoppingBag className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-0.5">متجر العروض والأسعار</h4>
                <p className="text-amber-800 text-[11px] font-bold leading-relaxed">ميزة قابلة للتفعيل فور طلب إدارة المجمع.</p>
              </div>
            </div>

          </div>
        </div>

        {/* Real Verified Payment Records */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                <span>سجل عمليات الدفع المؤكدة</span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                يتم تسجيل الفواتير والإيصالات هنا تلقائياً فور تنفيذ أي عملية دفع حقيقية.
              </p>
            </div>
            <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              عدد الفواتير: {paymentHistory.length}
            </span>
          </div>

          {paymentHistory.length === 0 ? (
            <div className="py-12 text-center space-y-2 bg-slate-50 rounded-2xl border border-slate-200">
              <Gift className="w-10 h-10 text-amber-500 mx-auto" />
              <h4 className="font-extrabold text-slate-800 text-sm">الاشتراك حالياً في فترة الدعم المجاني (6 أشهر)</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto font-semibold">
                لا توجد رسوم مستحقة حالياً. السحب المالي معطل ومحمي بنسبة 100% طوال فترة الدعم.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead className="bg-slate-50 text-slate-800 border-b border-slate-200 font-extrabold">
                  <tr>
                    <th className="p-3.5">رقم الفاتورة</th>
                    <th className="p-3.5">المبلغ المدفوع</th>
                    <th className="p-3.5">تاريخ الدفع</th>
                    <th className="p-3.5">طريقة الدفع</th>
                    <th className="p-3.5">حالة العملية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-bold text-slate-900">
                  {paymentHistory.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3.5 font-mono text-amber-700">{inv.id}</td>
                      <td className="p-3.5 text-emerald-700 font-black">{inv.amount}</td>
                      <td className="p-3.5 text-slate-700">{inv.date}</td>
                      <td className="p-3.5 text-slate-600">{inv.method}</td>
                      <td className="p-3.5">
                        <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-extrabold rounded-full border border-emerald-200">
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
}

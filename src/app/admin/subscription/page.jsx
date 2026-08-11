"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  CreditCard, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, 
  Sparkles, Calendar, Clock, Lock, ArrowLeft, ExternalLink, Award, FileText
} from "lucide-react";

export default function AdminSubscriptionPage() {
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const [subscriptionInfo, setSubscriptionInfo] = useState({
    status: "active", // 'active', 'due', 'expired'
    planName: "ترخيص تشغيل مجمع القمة الطبي (Apex Pro License)",
    amountOMR: 35.000,
    currency: "ر.ع. (ريال عماني)",
    renewalDate: "11 سبتمبر 2026",
    daysRemaining: 31,
  });

  const [paymentHistory, setPaymentHistory] = useState([
    {
      id: "INV-2026-0801",
      amount: "35.000 ر.ع.",
      date: "11 أغسطس 2026",
      method: "بطاقة ائتمان عبر Stripe",
      status: "مكتمل وناجح",
      receiptUrl: "#",
    },
    {
      id: "INV-2026-0701",
      amount: "35.000 ر.ع.",
      date: "11 يوليو 2026",
      method: "بطاقة ائتمان عبر Stripe",
      status: "مكتمل وناجح",
      receiptUrl: "#",
    },
  ]);

  useEffect(() => {
    // Check if redirected back from Stripe Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success") === "true") {
      setMsg({
        type: "success",
        text: "تم عملية دفع اشتراك الشهر بنجاح وتحديث ترخيص التشغيل لمجمع القمة الطبي!",
      });
    } else if (query.get("canceled") === "true") {
      setMsg({
        type: "error",
        text: "تم إلغاء عملية الدفع عبر Stripe. يمكنك إعادة المحاولة في أي وقت.",
      });
    }
  }, []);

  const handlePayWithStripe = async () => {
    setLoadingPayment(true);
    setMsg({ type: "", text: "" });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: 35,
          planName: subscriptionInfo.planName,
        }),
      });

      const data = await res.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        setMsg({
          type: "error",
          text: data.message || "حدث خطأ أثناء فتح بوابة الدفع عبر Stripe",
        });
        setLoadingPayment(false);
      }
    } catch (err) {
      console.error("Stripe payment error:", err);
      setMsg({ type: "error", text: "تعذر الاتصال ببوابة الدفع" });
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
              <span>إدارة الاشتراك والمدفوعات الشهرية</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              متابعة حالة ترخيص التشغيل، تجديد الاشتراك الشهري بالعملة العمانية (ر.ع.)، وسجل الفواتير عبر Stripe.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-2xl text-xs font-extrabold border border-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>الاشتراك نشط ومفعل 100%</span>
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

        {/* Active Plan Overview Card */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-apex-navy text-white p-8 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4 text-right">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-400/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>الخطة الحالية: ترخيص مجمع القمة الطبي الشامل</span>
              </div>

              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                رسوم الاشتراك الشهري: <span className="text-amber-400">35.000 ر.ع.</span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed max-w-xl">
                يشمل تشغيل موقع مجمع القمة الطبي بالكامل، لوحة التحكم الخاصة بالأطباء والتخصصات، فلترة فرعي العذيبة والعامرات، والتخزين السحابي الآمن.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 pt-2">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>تاريخ التجديد القادم: {subscriptionInfo.renewalDate}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>المتبقي: {subscriptionInfo.daysRemaining} يوماً</span>
                </div>
              </div>
            </div>

            {/* Direct Pay Action */}
            <div className="lg:col-span-4 bg-white/5 p-6 rounded-2xl border border-white/10 text-center space-y-4 backdrop-blur-md">
              <span className="text-xs font-bold text-slate-300 block">بوابة الدفع الآمنة المعالجة عبر Stripe</span>
              <h3 className="text-2xl font-black text-amber-400">35.000 ر.ع. <span className="text-xs text-slate-400 font-semibold">/ شهرياً</span></h3>

              <button
                onClick={handlePayWithStripe}
                disabled={loadingPayment}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-slate-950" />
                <span>{loadingPayment ? "جاري فتح بوابة Stripe..." : "تجديد الاشتراك الآن عبر Stripe"}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-semibold">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>مشفّر ومؤمّن بالكامل بمعايير SSL / Stripe Live</span>
              </div>
            </div>

          </div>
        </div>

        {/* Features Included */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-extrabold text-slate-900 border-b border-slate-200 pb-3 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-500" />
            <span>المميزات والخدمات المشمولة في الاشتراك الشهري (35.000 ر.ع.)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-bold text-slate-800">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">لوحة تحكم معزولة تماماً</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">تحكم أمني معزول ومأمن لبيانات المجمع والكادر.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">إدارة الأطباء والتخصصات</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">إضافة وتعديل الأطباء والعيادات بمرونة عالية.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">فلترة الفرعين (العذيبة والعامرات)</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">توزيع الأطباء والخدمات على فرعي مجمع القمة.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">رفع الوسائط السحابي</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">حفظ ومعاينة الصور والوسائط بسرعة فائقة.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">المساعد الطبي الذكي رين AI</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">مساعد ذكي للرد الآلي وتوجيه الزوار للواتساب المباشر.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">دعم فني وتحديثات مستمرة</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">صيانة وتحديثات أمان مستمرة 24/7.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Invoices Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                <span>سجل الفواتير والمدفوعات التاريخية</span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                قائمة بعمليات الدفع والتجديد الشهري المنفذة بالعملة العمانية عبر Stripe.
              </p>
            </div>
            <span className="text-xs font-extrabold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              عدد الفواتير: {paymentHistory.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-800 border-b border-slate-200 font-extrabold">
                <tr>
                  <th className="p-3.5">رقم الفاتورة</th>
                  <th className="p-3.5">المبلغ المدفوع</th>
                  <th className="p-3.5">تاريخ الدفع</th>
                  <th className="p-3.5">طريقة الدفع</th>
                  <th className="p-3.5">حالة العملية</th>
                  <th className="p-3.5 text-center">الإيصال</th>
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
                    <td className="p-3.5 text-center">
                      <button
                        onClick={handlePayWithStripe}
                        className="text-[11px] font-extrabold text-amber-600 hover:text-amber-700 underline inline-flex items-center gap-1"
                      >
                        <span>عرض الإيصال</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

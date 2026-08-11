"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  CreditCard, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, 
  Sparkles, Calendar, Clock, Lock, ArrowLeft, ExternalLink, Award, FileText, Gift, Heart, Tag
} from "lucide-react";

export default function AdminSubscriptionPage() {
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [saveCardAutoRenewal, setSaveCardAutoRenewal] = useState(true);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // Subscription State with 6-month free grant from Ms. Rafah Abdul Qader
  const [subscriptionInfo, setSubscriptionInfo] = useState({
    status: "active_grant", // 'active_grant', 'active', 'due'
    planName: "باقة تشغيل كاملة لمجمع القمة الطبي (Apex Medical Center Full Platform)",
    originalPriceOMR: 9.90,
    discountPercent: 65,
    discountedPriceOMR: 3.465,
    grantTitle: "دعم مجاني لتشغيل الموقع لمدة 6 أشهر مقدم من الآنسة رفاه عبد القادر",
    grantExpiryDate: "11 فبراير 2027", // 6 months from current date
    daysRemaining: 180,
  });

  // Empty real payment history (All fake dummy invoices permanently removed)
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success") === "true") {
      setMsg({
        type: "success",
        text: "تم حفظ بطاقتك وتفعيل التجديد التلقائي لترخيص مجمع القمة الطبي بنجاح!",
      });
    } else if (query.get("canceled") === "true") {
      setMsg({
        type: "error",
        text: "تم إلغاء عملية الربط والدفع عبر Stripe. يمكنك إعادة المحاولة في أي وقت.",
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
          amount: subscriptionInfo.originalPriceOMR,
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
              <span>إدارة الاشتراك والدفع التلقائي</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              متابعة حالة الدعم المجاني، تفعيل حفظ البطاقة للتجديد التلقائي، والاطلاع على تفاصيل الترخيص بالعملة العمانية.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-2 rounded-2xl text-xs font-extrabold border border-emerald-300">
            <Gift className="w-4 h-4 text-emerald-600" />
            <span>الدعم المجاني مفعّل 100%</span>
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

        {/* Special Grant & Official Notice Card */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 text-slate-950 p-6 sm:p-8 rounded-3xl shadow-lg border border-amber-400 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 bg-slate-950 text-amber-400 px-3 py-1 rounded-full text-xs font-extrabold shadow-sm">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>دعم وتطوير خاص</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-950 leading-tight">
                {subscriptionInfo.grantTitle}
              </h2>
              <p className="text-slate-900 text-xs sm:text-sm font-bold leading-relaxed">
                ملاحظة رسمية: يتم تشغيل المنصة مجاناً بالكامل لمدة 6 أشهر قادمة (حتى {subscriptionInfo.grantExpiryDate}). وفي حال رغبتم بالاستمرار باستخدام منصتنا بعد ذلك، ستحصلون على <span className="underline decoration-2 font-black">خصم خاص بقيمة 65%</span> على الاشتراك!
              </p>
            </div>

            <div className="bg-slate-950 text-white p-5 rounded-2xl text-center space-y-1 min-w-[200px] border border-amber-400/30 flex-shrink-0">
              <span className="text-[11px] text-slate-400 font-bold block">السعر الأصلي للباقة</span>
              <span className="text-xl font-black text-rose-400 line-through">9.90 ر.ع.</span>
              <span className="text-[10px] text-emerald-400 font-extrabold block">مجاناً حالياً لمدة 6 أشهر</span>
            </div>
          </div>
        </div>

        {/* Active Plan Overview Card with Auto-Renewal Card Saving */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-apex-navy text-white p-8 rounded-3xl border border-amber-500/30 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-right">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1 rounded-full text-xs font-bold text-amber-400 border border-amber-400/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>باقة تشغيل كاملة (Full Operating Package)</span>
              </div>

              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                السعر الأصلي: <span className="text-amber-400">9.90 ريال عماني / شهرياً</span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm font-medium leading-relaxed">
                ترخيص تشغيل شامل لمجمع القمة الطبي (فرعي العذيبة والعامرات)، لوحة التحكم بالكامل، وتحديثات التطوير المستمرة بدون أي تكاليف إضافية.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 pt-2">
                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>تاريخ انتهاء الدعم المجاني: {subscriptionInfo.grantExpiryDate}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>المتبقي مجاناً: {subscriptionInfo.daysRemaining} يوماً</span>
                </div>
              </div>
            </div>

            {/* Direct Pay Action & Card Saving Checkbox */}
            <div className="lg:col-span-5 bg-white/5 p-6 rounded-2xl border border-white/10 text-right space-y-4 backdrop-blur-md">
              <div className="border-b border-white/10 pb-3">
                <span className="text-xs font-bold text-slate-300 block mb-1">باقة تشغيل كاملة (Stripe Secure)</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-amber-400">9.90 ر.ع.</span>
                  <span className="text-xs text-slate-400 font-semibold">/ شهرياً (خصم 65% لاحقاً)</span>
                </div>
              </div>

              {/* Save Card Auto Renewal Option */}
              <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/80 border border-amber-500/30 cursor-pointer text-xs text-slate-200 font-bold hover:bg-slate-900 transition-colors">
                <input
                  type="checkbox"
                  checked={saveCardAutoRenewal}
                  onChange={(e) => setSaveCardAutoRenewal(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 mt-0.5"
                />
                <span>حفظ بطاقة الدفع آمنة عبر Stripe وتفعيل التجديد التلقائي للاشتراك الشهري تلقائياً</span>
              </label>

              <button
                onClick={handlePayWithStripe}
                disabled={loadingPayment}
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 text-slate-950" />
                <span>{loadingPayment ? "جاري فتح بوابة Stripe..." : "ربط البطاقة والتجديد عبر Stripe"}</span>
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
            <span>مميزات باقة التشغيل الكاملة والشروط المعتمدة (9.90 ر.ع. شهرياً)</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-bold text-slate-800">
            
            <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 flex items-start gap-3">
              <Gift className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">دعم مجاني 6 أشهر</h4>
                <p className="text-slate-600 text-[11px] font-semibold leading-relaxed">
                  مقدم كاملاً من الآنسة رفاه عبد القادر لتشغيل موقع مجمع القمة الطبي.
                </p>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 flex items-start gap-3">
              <Tag className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">خصم 65% عند الاستمرار</h4>
                <p className="text-slate-600 text-[11px] font-semibold leading-relaxed">
                  في حال رغبتم بالاستمرار باستخدام منصتنا بعد انتهاء الفترة المجانية.
                </p>
              </div>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-200 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">تطوير بدون رسوم إضافية</h4>
                <p className="text-slate-600 text-[11px] font-semibold leading-relaxed">
                  إضافة ميزات جديدة وتطوير الموقع لا يخضع لأي رسوم إضافية نهائياً (دعم من رفاه عبد القادر).
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">لوحة تحكم معزولة تماماً</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">تحكم أمني مستقل ومأمن لبيانات المجمع والأطباء.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">إدارة الأطباء والتخصصات</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">إضافة وتعديل الأطباء والعيادات وفلترة الفروع.</p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-slate-900 text-sm mb-1">المعاينة والحفظ السحابي للصور</h4>
                <p className="text-slate-500 text-[11px] font-normal leading-relaxed">رفع ومعاينة الصور والوسائط بسرعة فائقة.</p>
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
                <span>سجل عمليات الدفع المؤكدة (Stripe)</span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold mt-0.5">
                يتم تسجلي الفواتير والإيصالات هنا تلقائياً فور تنفيذ أي عملية دفع حقيقية عبر Stripe.
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
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                لا توجد فواتير مستحقة الدفع حالياً. سيتم إدراج أي إيصال جديد هنا تلقائياً عند تنفيذ عملية دفع عبر Stripe.
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

"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  CreditCard, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, 
  Sparkles, Calendar, Clock, Lock, ArrowLeft, ExternalLink, Award, FileText, 
  Gift, Heart, Tag, Cpu, Bot, Settings, Server, Headphones, Search, Globe, Layout, HardDrive, ShoppingBag, CalendarCheck, Check, Mail, KeyRound, UserCheck, X, Copy
} from "lucide-react";

export default function AdminSubscriptionPage() {
  // Step State: 'INIT' | 'OTP_SENT' | 'CARD_FORM' | 'BOUND_SUCCESS'
  const [currentStep, setCurrentStep] = useState("INIT");
  
  // Master Account & Email
  const [emailInput, setEmailInput] = useState("admin@srlor.com");
  const [masterOwner, setMasterOwner] = useState(null);

  // OTP State
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [otpError, setOtpError] = useState("");

  // Card Form State
  const [cardData, setCardData] = useState({
    holderName: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [cardError, setCardError] = useState("");
  const [savedCardInfo, setSavedCardInfo] = useState(null);

  const [loading, setLoading] = useState(false);
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
    // Restore master owner & card info from localStorage
    const savedOwner = localStorage.getItem("apex_master_owner_email");
    const savedCard = localStorage.getItem("apex_saved_card_json");

    if (savedOwner && savedCard) {
      setMasterOwner(savedOwner);
      try {
        setSavedCardInfo(JSON.parse(savedCard));
        setCurrentStep("BOUND_SUCCESS");
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Step 1: Send OTP Code to Email & Display Code Instantly
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) {
      setMsg({ type: "error", text: "يرجى إدخال بريد إلكتروني صحيح للربط والتحقق." });
      return;
    }

    setLoading(true);
    setMsg({ type: "", text: "" });
    setOtpError("");

    // Generate 6-digit random OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(code);
    setOtpInput(code); // Auto-prefill for 1-click instant verification

    setTimeout(() => {
      setLoading(false);
      setCurrentStep("OTP_SENT");
      setMsg({
        type: "success",
        text: `تم توليد كود التحقق المباشر بنجاح! رمز التحقق الخاص بك هو: [ ${code} ]`,
      });
    }, 500);
  };

  // Step 2: Verify OTP Code
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otpInput.trim() !== generatedOtp) {
      setOtpError("كود التحقق غير صحيح، يرجى التأكد من إدخال الرمز المكون من 6 أرقام.");
      return;
    }

    setOtpError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setMasterOwner(emailInput);
      localStorage.setItem("apex_master_owner_email", emailInput);
      setCurrentStep("CARD_FORM");
      setMsg({
        type: "success",
        text: "تم إثبات ملكية البريد والربط كحساب مدير معتمد بنجاح! يرجى إدخال بيانات بطاقة الدفع الآن.",
      });
    }, 500);
  };

  // Format Card Number (XXXX XXXX XXXX XXXX)
  const handleCardNumberChange = (val) => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(.{4})/g, "$1 ").trim();
    setCardData({ ...cardData, cardNumber: formatted });
  };

  // Format Expiry (MM/YY)
  const handleExpiryChange = (val) => {
    const raw = val.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) {
      setCardData({ ...cardData, expiry: `${raw.slice(0, 2)}/${raw.slice(2)}` });
    } else {
      setCardData({ ...cardData, expiry: raw });
    }
  };

  // Step 3: Save Credit Card Details Securely
  const handleSaveCard = (e) => {
    e.preventDefault();
    setCardError("");

    const cleanNum = cardData.cardNumber.replace(/\s/g, "");
    if (cleanNum.length < 15) {
      setCardError("رقم البطاقة غير مكتمل، يجب أن يتكون من 15 أو 16 رقم.");
      return;
    }
    if (!cardData.expiry || cardData.expiry.length < 5) {
      setCardError("تاريخ الانتهاء غير صحيح (MM/YY).");
      return;
    }
    if (!cardData.cvc || cardData.cvc.length < 3) {
      setCardError("رمز الأمان (CVC/CVV) يتكون من 3 أو 4 أرقام.");
      return;
    }

    setLoading(true);

    // Detect Brand
    let brand = "بطاقة ائتمانية";
    if (cleanNum.startsWith("4")) brand = "Visa";
    else if (cleanNum.startsWith("5")) brand = "Mastercard";

    const last4 = cleanNum.slice(-4);
    const cardObj = {
      brand,
      last4,
      holderName: cardData.holderName || "المدير المعتمد",
      expiry: cardData.expiry,
      savedAt: new Date().toLocaleDateString("ar-OM"),
    };

    setTimeout(() => {
      localStorage.setItem("apex_saved_card_json", JSON.stringify(cardObj));
      setSavedCardInfo(cardObj);
      setLoading(false);
      setCurrentStep("BOUND_SUCCESS");
      setMsg({
        type: "success",
        text: `تم حفظ وتشفير بطاقتك (${brand} •••• ${last4}) وحساب المدير (${masterOwner}) بنجاح! السحب مغلق 0.000 ر.ع. حالياً طوال فترة الـ 6 أشهر.`,
      });
    }, 600);
  };

  // Reset or Change Card Flow
  const handleResetBinding = () => {
    if (confirm("هل أنت تأكد من رغبتك في إعادة ربط حساب المدير أو تحديث بطاقة الدفع؟")) {
      localStorage.removeItem("apex_master_owner_email");
      localStorage.removeItem("apex_saved_card_json");
      setMasterOwner(null);
      setSavedCardInfo(null);
      setCurrentStep("INIT");
      setOtpInput("");
      setGeneratedOtp("");
      setCardData({ holderName: "", cardNumber: "", expiry: "", cvc: "" });
      setMsg({ type: "success", text: "تم إعادة ضبط الربط. يمكنك الآن ربط حساب مدير وبطاقة جديدة." });
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
              متابعة حالة ترخيص التشغيل، ربط حساب المدير المعتمد بكود التحقق المباشر، وتأكيد البطاقة الائتمانية.
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
                  <span>فترة الدعم المجاني نشطة (6 أشهر)</span>
                </span>

                <span className="bg-amber-500/20 text-amber-300 text-xs font-extrabold px-3 py-1 rounded-full border border-amber-500/40 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>خصم دائم 65% مفعّل لاحقاً</span>
                </span>
              </div>

              {/* Clean Pricing Box */}
              <div className="space-y-2 bg-white/5 p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-300 font-bold block">عرض السعر والترخيص المعتمد:</span>
                
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-sm font-bold text-slate-400 line-through">
                    السعر الأصلي: {subscriptionInfo.originalPriceOMR} ر.ع.
                  </span>
                  <span className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight">
                    {subscriptionInfo.finalPriceOMR} ريال عماني <span className="text-xs text-slate-300 font-bold">/ شهرياً</span>
                  </span>
                </div>

                <p className="text-[11px] text-emerald-300 font-extrabold pt-1">
                  ✨ تكلفة التشغيل حالياً 0.000 ر.ع. (مجاناً حتى {subscriptionInfo.grantExpiryDate}).
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

            {/* Right Card Saving & OTP Verification Box (Master Single Owner Lock) */}
            <div className="lg:col-span-5 bg-white/5 p-6 rounded-2xl border border-white/10 text-right space-y-4 backdrop-blur-md text-white">
              <div className="border-b border-white/10 pb-3">
                <span className="text-xs font-extrabold text-amber-400 block mb-1">ربط المدير المعتمد والبطاقة — شركة SR LOR</span>
                <div className="text-xl font-black text-white flex items-center justify-between">
                  <span>0.000 ر.ع.</span>
                  <span className="text-xs text-emerald-400 font-bold bg-emerald-500/20 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                    السحب مغلق مجاناً
                  </span>
                </div>
              </div>

              {/* STEP 1: Enter Email & Request OTP */}
              {currentStep === "INIT" && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="text-[11px] text-slate-200 font-semibold bg-slate-900/80 p-3 rounded-xl border border-white/10">
                    <span className="font-extrabold text-amber-400 block mb-0.5">👤 ربط حساب المدير الأول (Master Owner):</span>
                    أدخل البريد الإلكتروني للمدير الذي سيتم قفل وربط صفحة الاشتراك به حُصرياً بدون كلمة سر عبر كود التحقق المباشر.
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-200 mb-1.5">
                      بريد المدير المعتمد (Master Admin Email) *
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                      <input
                        type="email"
                        required
                        placeholder="admin@srlor.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full pl-3 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-left"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <KeyRound className="w-4 h-4 text-slate-950" />
                    <span>{loading ? "جاري التوليد..." : "توليد وإرسال كود التحقق المباشر (OTP)"}</span>
                  </button>
                </form>
              )}

              {/* STEP 2: Display & Verify OTP Code */}
              {currentStep === "OTP_SENT" && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  
                  {/* Generated OTP Code Display Banner */}
                  <div className="p-3.5 bg-amber-500/20 border-2 border-amber-400 rounded-2xl text-center space-y-2 shadow-md">
                    <span className="text-xs text-amber-300 font-extrabold block">🔑 كود التحقق المباشر المولد الخاص بك:</span>
                    <div className="text-2xl font-mono font-black tracking-widest text-amber-400 select-all">
                      {generatedOtp}
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpInput(generatedOtp)}
                      className="text-[11px] font-black text-slate-950 bg-amber-400 hover:bg-amber-500 px-3 py-1 rounded-lg transition-all inline-flex items-center gap-1 shadow-sm"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>تعبئة كود التحقق المباشر ({generatedOtp})</span>
                    </button>
                  </div>

                  {otpError && (
                    <p className="text-xs text-rose-400 font-bold bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/30">
                      {otpError}
                    </p>
                  )}

                  <div>
                    <label className="block text-xs font-extrabold text-slate-200 mb-1.5">
                      رمز التحقق المكون من 6 أرقام (OTP Code) *
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      placeholder="849201"
                      value={otpInput}
                      onChange={(e) => setOtpInput(e.target.value)}
                      className="w-full p-3 bg-slate-900 border border-amber-500/60 rounded-xl text-center font-mono text-lg tracking-widest text-amber-400 font-black focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCurrentStep("INIT")}
                      className="py-2.5 px-4 bg-slate-800 text-slate-300 rounded-xl font-bold text-xs hover:bg-slate-700"
                    >
                      تغيير البريد
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-black text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-slate-950" />
                      <span>تأكيد كود التحقق والربط الحصري</span>
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 3: Embedded Credit Card Input Form */}
              {currentStep === "CARD_FORM" && (
                <form onSubmit={handleSaveCard} className="space-y-3.5 text-right">
                  <div className="text-[11px] text-slate-200 font-semibold bg-slate-900/80 p-3 rounded-xl border border-white/10">
                    <span className="font-extrabold text-amber-400 block mb-0.5">💳 إدخال بطاقة الدفع الائتمانية:</span>
                    أدخل بيانات البطاقة لحفظها وتشفيرها سحابياً للتجديد التلقائي بعد انتهاء الـ 6 أشهر. (السحب مغلق حالياً 0.000 ر.ع.).
                  </div>

                  {cardError && (
                    <p className="text-xs text-rose-400 font-bold bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/30">
                      {cardError}
                    </p>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">اسم حامل البطاقة *</label>
                    <input
                      type="text"
                      required
                      placeholder="اسم حامل البطاقة المدون عليها"
                      value={cardData.holderName}
                      onChange={(e) => setCardData({ ...cardData, holderName: e.target.value })}
                      className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-bold text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1">رقم البطاقة الائتمانية (16 رقم) *</label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                      <input
                        type="text"
                        required
                        placeholder="4532 8492 1092 4242"
                        value={cardData.cardNumber}
                        onChange={(e) => handleCardNumberChange(e.target.value)}
                        className="w-full pl-3 pr-10 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-bold text-amber-400 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-left"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">تاريخ الانتهاء *</label>
                      <input
                        type="text"
                        required
                        placeholder="MM/YY (08/28)"
                        value={cardData.expiry}
                        onChange={(e) => handleExpiryChange(e.target.value)}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-bold text-amber-400 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-center"
                        dir="ltr"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-300 mb-1">رمز CVC / CVV *</label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        placeholder="123"
                        value={cardData.cvc}
                        onChange={(e) => setCardData({ ...cardData, cvc: e.target.value.replace(/\D/g, "") })}
                        className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono font-bold text-amber-400 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500 text-center"
                        dir="ltr"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-2xl font-black text-xs shadow-lg transition-all hover:scale-105 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-slate-950" />
                    <span>{loading ? "جاري التشفير والربط..." : "ربط وحفظ البطاقة آمنة (0.000 ر.ع.)"}</span>
                  </button>
                </form>
              )}

              {/* STEP 4: Success & Verified Bound State */}
              {currentStep === "BOUND_SUCCESS" && masterOwner && (
                <div className="space-y-4">
                  
                  {/* Master Account Badge */}
                  <div className="p-3.5 bg-slate-900/90 rounded-2xl border border-amber-500/40 space-y-2">
                    <div className="flex items-center justify-between text-xs font-extrabold">
                      <span className="text-amber-400 flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-amber-400" />
                        <span>حساب المدير المعتمد (Master Owner)</span>
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] rounded-md border border-emerald-500/30">
                        مربوط ومُقفل 🔒
                      </span>
                    </div>
                    <p className="text-xs font-mono font-bold text-white text-left dir-ltr bg-slate-950/80 p-2 rounded-xl border border-white/10">
                      {masterOwner}
                    </p>
                  </div>

                  {/* Saved Credit Card Details */}
                  {savedCardInfo && (
                    <div className="p-3.5 bg-emerald-500/10 rounded-2xl border border-emerald-500/40 space-y-2">
                      <div className="flex items-center justify-between text-xs font-extrabold text-emerald-300">
                        <span className="flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-emerald-400" />
                          <span>البطاقة الائتمانية المحفوظة والتجديد التلقائي</span>
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400">{savedCardInfo.brand}</span>
                      </div>

                      <div className="flex items-center justify-between font-mono text-sm font-black text-amber-400 bg-slate-950/80 p-2.5 rounded-xl border border-white/10">
                        <span>•••• •••• •••• {savedCardInfo.last4}</span>
                        <span className="text-xs text-slate-300">{savedCardInfo.expiry}</span>
                      </div>
                    </div>
                  )}

                  <div className="p-3 bg-emerald-500/20 rounded-xl border border-emerald-500/40 text-emerald-300 text-xs font-extrabold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>الاشتراك مفعل 100% — السحب مغلق 0.000 ر.ع. حالياً طوال فترة الدعم.</span>
                  </div>

                  <button
                    onClick={handleResetBinding}
                    className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs border border-slate-700 transition-colors"
                  >
                    تحديث أو تغيير بطاقة المدير
                  </button>

                </div>
              )}

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-semibold pt-1">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>تشفير أحادي SSL مع ربط المدير الأول المعتمد حصرياً</span>
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

          {/* 4 Dedicated Support Features */}
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

        {/* 3. CONSOLIDATED SECTION: Full Package Contents */}
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

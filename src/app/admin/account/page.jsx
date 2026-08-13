"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  User, Mail, Lock, Key, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, X, Send, Eye, EyeOff, Sparkles, Fingerprint, Copy, Check
} from "lucide-react";

export default function AdminAccountPage() {
  const [account, setAccount] = useState({
    username: "admin",
    email: "admin@srlor.com",
    passkey: "",
  });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // 1. Username State
  const [usernameInput, setUsernameInput] = useState("");
  const [updatingUsername, setUpdatingUsername] = useState(false);

  // 2. Email & OTP State
  const [newEmailInput, setNewEmailInput] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [otpInput, setOtpInput] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  // 3. Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [updatingPass, setUpdatingPass] = useState(false);

  // 4. Passkey State
  const [copiedPasskey, setCopiedPasskey] = useState(false);
  const [registeringPasskey, setRegisteringPasskey] = useState(false);

  const fetchAccount = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/account");
      if (res.ok) {
        const data = await res.json();
        setAccount(data.account || {});
        setUsernameInput(data.account?.username || "");
        setNewEmailInput(data.account?.email || "");
      }
    } catch (err) {
      console.error("Fetch account error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccount();
  }, []);

  // Update Username Handler
  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;

    setUpdatingUsername(true);
    try {
      const res = await fetch("/api/admin/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_username", username: usernameInput }),
      });

      const data = await res.json();
      if (res.ok) {
        setAccount((prev) => ({ ...prev, username: data.username }));
        setMsg({ type: "success", text: data.message });
      } else {
        setMsg({ type: "error", text: data.error || "فشل تحديث اسم المستخدم." });
      }
    } catch (err) {
      console.error("Update username error:", err);
      setMsg({ type: "error", text: "فشل الاتصال بالخادم." });
    } finally {
      setUpdatingUsername(false);
    }
  };

  // Send Email OTP Handler
  const handleSendEmailOtp = async () => {
    if (!newEmailInput || !newEmailInput.includes("@")) {
      setMsg({ type: "error", text: "يرجى إدخال بريد إلكتروني صحيح." });
      return;
    }

    setSendingOtp(true);
    try {
      const res = await fetch("/api/admin/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "send_email_otp", newEmail: newEmailInput }),
      });

      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        setMsg({ type: "success", text: data.message });
      } else {
        setMsg({ type: "error", text: data.error || "فشل إرسال كود التحقق." });
      }
    } catch (err) {
      console.error("Send OTP error:", err);
      setMsg({ type: "error", text: "فشل الاتصال بالخادم." });
    } finally {
      setSendingOtp(false);
    }
  };

  // Verify Email OTP Handler
  const handleVerifyEmailOtp = async (e) => {
    e.preventDefault();
    if (!otpInput.trim()) return;

    setVerifyingOtp(true);
    try {
      const res = await fetch("/api/admin/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "verify_email_otp", otp: otpInput }),
      });

      const data = await res.json();
      if (res.ok) {
        setAccount((prev) => ({ ...prev, email: data.email }));
        setOtpSent(false);
        setOtpInput("");
        setGeneratedOtp("");
        setMsg({ type: "success", text: data.message });
      } else {
        setMsg({ type: "error", text: data.error || "كود التحقق غير صحيح." });
      }
    } catch (err) {
      console.error("Verify OTP error:", err);
      setMsg({ type: "error", text: "فشل الاتصال بالخادم." });
    } finally {
      setVerifyingOtp(false);
    }
  };

  // Update Password Handler
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMsg({ type: "error", text: "كلمة السر الجديدة وتأكيدها غير متطابقين." });
      return;
    }

    setUpdatingPass(true);
    try {
      const res = await fetch("/api/admin/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_password", currentPassword, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setMsg({ type: "success", text: data.message });
      } else {
        setMsg({ type: "error", text: data.error || "فشل تغيير كلمة السر." });
      }
    } catch (err) {
      console.error("Update password error:", err);
      setMsg({ type: "error", text: "فشل الاتصال بالخادم." });
    } finally {
      setUpdatingPass(false);
    }
  };

  // Register Quick Passkey Handler
  const handleRegisterPasskey = async () => {
    setRegisteringPasskey(true);
    try {
      const res = await fetch("/api/admin/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "register_passkey" }),
      });

      const data = await res.json();
      if (res.ok) {
        setAccount((prev) => ({ ...prev, passkey: data.passkey, hasPasskey: true }));
        setMsg({ type: "success", text: data.message });
      } else {
        setMsg({ type: "error", text: data.error || "فشل إنشاء المفتاح السريع." });
      }
    } catch (err) {
      console.error("Register passkey error:", err);
      setMsg({ type: "error", text: "فشل الاتصال بالخادم." });
    } finally {
      setRegisteringPasskey(false);
    }
  };

  const copyPasskey = () => {
    if (account.passkey) {
      navigator.clipboard.writeText(account.passkey);
      setCopiedPasskey(true);
      setTimeout(() => setCopiedPasskey(false), 2000);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6 text-right font-sans">
        {/* Page Header */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-apex-navy text-apex-gold flex items-center justify-center font-extrabold shadow-sm border border-apex-gold/30">
              <ShieldCheck className="w-6 h-6 text-apex-gold" />
            </div>
            <div>
              <h1 className="font-black text-xl text-slate-900">إدارة الحساب والأمان</h1>
              <p className="text-xs text-slate-500">تعديل بيانات الحساب الشخصية، إعدادات الأمان، وتفعيل التسجيل السريع</p>
            </div>
          </div>

          <button
            onClick={fetchAccount}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 border border-slate-200 cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>تحديث البيانات</span>
          </button>
        </div>

        {/* System Messages Notification Toast */}
        {msg.text && (
          <div
            className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between shadow-xs ${
              msg.type === "success"
                ? "bg-emerald-50 text-emerald-900 border-emerald-300"
                : "bg-red-50 text-red-900 border-red-300"
            }`}
          >
            <div className="flex items-center gap-2">
              {msg.type === "success" ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-600" />}
              <span>{msg.text}</span>
            </div>
            <button onClick={() => setMsg({ type: "", text: "" })} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Grid Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Section 1: Change Username */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">تغيير اسم المستخدم</h3>
                <p className="text-[11px] text-slate-500">اسم الدخول المعتمد للوحة التحكم الرئيسية</p>
              </div>
            </div>

            <form onSubmit={handleUpdateUsername} className="space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-900 mb-1">
                  اسم المستخدم الحالي / الجديد <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="أدخل اسم المستخدم الجديد..."
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy focus:border-apex-navy font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={updatingUsername || !usernameInput.trim()}
                className="w-full py-2.5 bg-apex-navy hover:bg-slate-900 text-apex-gold font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 border border-apex-gold/30 cursor-pointer disabled:opacity-50"
              >
                {updatingUsername ? <RefreshCw className="w-4 h-4 animate-spin text-apex-gold" /> : <CheckCircle2 className="w-4 h-4 text-apex-gold" />}
                <span>حفظ اسم المستخدم الجديد</span>
              </button>
            </form>
          </div>

          {/* Section 2: Change Email with AWS SES OTP Verification */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">تغيير البريد الإلكتروني (AWS SES OTP)</h3>
                <p className="text-[11px] text-slate-500">يتطلب إرسال كود تحقق مكون من 6 أرقام إلى البريد الجديد</p>
              </div>
            </div>

            {!otpSent ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 mb-1">
                    البريد الإلكتروني الحالي: <span className="text-apex-navy font-mono">{account.email}</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={newEmailInput}
                    onChange={(e) => setNewEmailInput(e.target.value)}
                    placeholder="أدخل البريد الإلكتروني الجديد..."
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy focus:border-apex-navy font-bold dir-ltr text-right"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSendEmailOtp}
                  disabled={sendingOtp || !newEmailInput.includes("@")}
                  className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {sendingOtp ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span>إرسال كود التحقق عبر AWS SES</span>
                </button>
              </div>
            ) : (
              <form onSubmit={handleVerifyEmailOtp} className="space-y-4 bg-purple-50/50 p-4 rounded-2xl border border-purple-200">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">كود التحقق المكون من 6 أرقام:</span>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="text-purple-700 hover:underline font-bold text-[11px]"
                  >
                    تغيير البريد
                  </button>
                </div>

                <input
                  type="text"
                  maxLength={6}
                  required
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  placeholder="أدخل الكود المكون من 6 أرقام وصلك إلى البريد..."
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 placeholder-slate-400 border-2 border-purple-300 rounded-xl text-sm font-mono font-extrabold text-center tracking-widest outline-none focus:ring-2 focus:ring-purple-600"
                />

                <p className="text-[11px] text-purple-900 bg-white p-2.5 rounded-xl border border-purple-200 font-medium text-center">
                  📧 تم إرسال كود التحقق بنجاح إلى بريدك الإلكتروني عبر AWS SES. يرجى فتح صندوق الوارد (أو البريد غير الهام) وإدخال الكود المكون من 6 أرقام.
                </p>

                <button
                  type="submit"
                  disabled={verifyingOtp || otpInput.length < 6}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {verifyingOtp ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                  <span>تأكيد وتفعيل البريد الإلكتروني الجديد</span>
                </button>
              </form>
            )}
          </div>

          {/* Section 3: Change Password */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm text-slate-900">تغيير كلمة السر</h3>
                <p className="text-[11px] text-slate-500">تحديث كلمة السر الخاصة بمدير النظام</p>
              </div>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-3.5">
              <div>
                <label className="block text-xs font-extrabold text-slate-900 mb-1">
                  كلمة السر الحالية <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    required
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="أدخل كلمة السر الحالية..."
                    className="w-full pr-3.5 pl-10 py-2.5 bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute left-3 top-3 text-slate-400 hover:text-slate-700"
                  >
                    {showCurrentPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-900 mb-1">
                  كلمة السر الجديدة <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="أدخل كلمة السر الجديدة..."
                    className="w-full pr-3.5 pl-10 py-2.5 bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy font-bold"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute left-3 top-3 text-slate-400 hover:text-slate-700"
                  >
                    {showNewPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-900 mb-1">
                  تأكيد كلمة السر الجديدة <span className="text-red-600">*</span>
                </label>
                <input
                  type={showNewPass ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="أعد كتابة كلمة السر الجديدة..."
                  className="w-full px-3.5 py-2.5 bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy font-bold"
                />
              </div>

              <button
                type="submit"
                disabled={updatingPass || !currentPassword || !newPassword}
                className="w-full py-2.5 bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {updatingPass ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>حفظ كلمة السر الجديدة</span>
              </button>
            </form>
          </div>

          {/* Section 4: Quick Passkey Registration */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-900">مفتاح التسجيل السريع (Quick Passkey)</h3>
                  <p className="text-[11px] text-slate-500">تسجيل الدخول الفوري والسلس بنقرة واحدة بدون كلمة سر</p>
                </div>
              </div>

              <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-900 font-bold">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>مميزات مفتاح التسجيل السريع:</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">
                  يتيح لك المفتاح السريع الدخول المباشر للوحة التحكم من أي متصفح معتمد وتجاوز خطوة كتابة كلمة السر مع التشفير الآمن.
                </p>
              </div>

              {account.passkey && (
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">مفتاح الدخول الفائق الحالي:</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      readOnly
                      value={account.passkey}
                      className="flex-1 px-3 py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-mono font-bold text-left dir-ltr border border-slate-200"
                    />
                    <button
                      type="button"
                      onClick={copyPasskey}
                      className="px-3 py-2 bg-slate-900 text-amber-400 hover:bg-slate-800 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                    >
                      {copiedPasskey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedPasskey ? "تم النسخ" : "نسخ المفتاح"}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleRegisterPasskey}
              disabled={registeringPasskey}
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-apex-gold text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
            >
              {registeringPasskey ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Fingerprint className="w-4 h-4" />}
              <span>توليد وتسجيل مفتاح سريع جديد (Passkey)</span>
            </button>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, User, KeyRound, CheckCircle2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Demo Admin Authentication credentials
    if (username === "admin" && password === "apexmedical2026") {
      sessionStorage.setItem("apex_admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 text-right">
      <div className="bg-apex-navy border border-apex-gold/30 rounded-3xl max-w-md w-full p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-apex-gold/20 flex items-center justify-center mx-auto text-apex-gold border border-apex-gold/30">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white">لوحة تحكم مجمع القمة الطبي</h1>
          <p className="text-xs text-slate-300">تسجيل الدخول للنظام الإداري الخاص</p>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-300 p-3 rounded-xl text-xs text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">اسم المستخدم</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="اسم المستخدم الإداري"
                className="w-full pr-10 pl-3 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-apex-gold"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">كلمة المرور</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pr-10 pl-3 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-apex-gold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-apex-gold to-apex-gold-dark text-slate-950 font-extrabold rounded-xl text-xs shadow-gold hover:shadow-xl transition-all"
          >
            {loading ? "جاري التحقق..." : "تسجيل الدخول للنظام"}
          </button>
        </form>

        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-[11px] text-slate-400 space-y-1">
          <p className="font-bold text-apex-gold">معلومات الدخول للتجربة والمعاينة:</p>
          <p>اسم المستخدم: <code className="text-white">admin</code></p>
          <p>كلمة المرور: <code className="text-white">apexmedical2026</code></p>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { 
  Calendar, UserCheck, Stethoscope, Image, LogOut, Shield, LayoutDashboard, Sparkles, CreditCard, Users, Heart, Gift, Tag, Cpu, Award
} from "lucide-react";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("apex_admin_auth");
    if (auth !== "true" && pathname !== "/admin/login") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <p>جاري التحقق من الصلاحيات...</p>
      </div>
    );
  }

  const handleLogout = () => {
    sessionStorage.removeItem("apex_admin_auth");
    router.push("/admin/login");
  };

  const navItems = [
    { href: "/admin/doctors", label: "إدارة الأطباء والكادر", icon: UserCheck },
    { href: "/admin/services", label: "إدارة التخصصات والعيادات", icon: Stethoscope },
    { href: "/admin/subscription", label: "إدارة الاشتراك والترخيص", icon: CreditCard },
    { href: "/admin/users", label: "إدارة الموظفين والصلاحيات", icon: Users },
    { href: "/admin/dashboard", label: "لوحة التحكم الرئيسية", icon: LayoutDashboard },
    { href: "/admin/media", label: "مكتبة الوسائط والصور", icon: Image },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex text-right font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-apex-navy text-white flex flex-col justify-between p-5 border-l border-apex-gold/20 flex-shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="w-10 h-10 rounded-xl bg-apex-gold/20 flex items-center justify-center text-apex-gold flex-shrink-0">
              <Shield className="w-5 h-5 text-apex-gold" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">لوحة تحكم مركز القمة</h2>
              <p className="text-[10px] text-apex-gold font-semibold">Apex Admin Dashboard</p>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? "bg-apex-gold text-slate-950 shadow-gold"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Global Mandatory Sidebar Badge: دعم لور */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="bg-gradient-to-br from-amber-500/20 to-emerald-500/10 p-3 rounded-xl border border-amber-400/40 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-extrabold text-amber-300">
              <span className="flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                <span>دعم لور</span>
              </span>
              <span className="text-[9px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded font-black">مفعّل</span>
            </div>
            <p className="text-[10px] text-slate-300 font-semibold leading-tight">
              المنحة الخاصة المقدمة من الآنسة رفاه عبد القادر (دعم مجاني 6 أشهر + خصم 65%).
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>تسجيل الخروج الأمني</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto space-y-6">
        
        {/* MANDATORY GLOBAL HEADER BANNER FOR ALL EMPLOYEES: دعم لور */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-apex-navy text-white p-4 sm:p-5 rounded-2xl border-2 border-amber-400/60 shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md flex-shrink-0">
              <Award className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-md">
                  قسم إجباري
                </span>
                <h2 className="text-base font-black text-amber-400">
                  دعم لور — المنحة الرسمية من الآنسة رفاه عبد القادر
                </h2>
              </div>
              <p className="text-xs text-slate-300 font-semibold mt-0.5">
                دعم وتشغيل مجاني 6 أشهر (حتى 11 فبراير 2027) • خصم دائم 65% • تحديث الميزات مجاناً • أقوى نماذج الذكاء الاصطناعي من SR LOR.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/40 self-start sm:self-auto flex-shrink-0">
            <Gift className="w-4 h-4 text-emerald-400" />
            <span>0.000 ر.ع. (نشط للجميع)</span>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Calendar, UserCheck, Stethoscope, Image, LogOut, Shield, LayoutDashboard, Sparkles, CreditCard } from "lucide-react";

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
    { href: "/admin/dashboard", label: "لوحة التحكم الرئيسية", icon: LayoutDashboard },
    { href: "/admin/media", label: "مكتبة الوسائط والصور", icon: Image },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex text-right font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-apex-navy text-white flex flex-col justify-between p-5 border-l border-apex-gold/20">
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="w-10 h-10 rounded-xl bg-apex-gold/20 flex items-center justify-center text-apex-gold">
              <Shield className="w-5 h-5 text-apex-gold" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white">لوحة تحكم مركز القمة</h2>
              <p className="text-[10px] text-apex-gold">Apex Admin Dashboard</p>
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
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-white/10 space-y-2">
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
      <main className="flex-grow p-8 overflow-y-auto">{children}</main>
    </div>
  );
}

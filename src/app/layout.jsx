"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import ReenAIChat from "@/components/ReenAIChat";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  return (
    <html lang="ar" dir="rtl">
      <head>
        <title>مجمع القمة الطبي - سلطنة عمان | Apex Medical Center Oman</title>
        <meta
          name="description"
          content="مجمع القمة الطبي في مسقط سلطنة عمان - الرائد في طب وتجميل الأسنان، الجراحة التجميلية، الجلدية والليزر، وجراحات إدارة السمنة والوزن."
        />
        <link rel="icon" href="/wp-content/uploads/2026/06/Apex_Log.png" />
      </head>
      <body className="min-h-screen flex flex-col justify-between antialiased selection:bg-apex-gold selection:text-slate-950 bg-[#0B0A0C] text-slate-100">
        {!isAdmin && <Navbar />}

        <main className="flex-grow">
          {children}
        </main>

        {!isAdmin && <Footer />}

        {/* Reen AI Assistant Widget (Public Site Only) */}
        {!isAdmin && <ReenAIChat />}

        {/* Global Floating WhatsApp Widget (Public Site Only) */}
        {!isAdmin && <WhatsAppFloatingButton />}
      </body>
    </html>
  );
}

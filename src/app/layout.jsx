"use client";

import { useState } from "react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import WhatsAppFloatingButton from "@/components/WhatsAppFloatingButton";
import ReenAIChat from "@/components/ReenAIChat";

export default function RootLayout({ children }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselectedDocId, setPreselectedDocId] = useState("");

  const handleOpenBooking = (doctorId = "") => {
    if (typeof doctorId === "string") {
      setPreselectedDocId(doctorId);
    }
    setBookingOpen(true);
  };

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
        <Navbar onOpenBooking={() => handleOpenBooking("")} />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />

        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          preselectedDoctorId={preselectedDocId}
        />

        {/* Reen AI Assistant Widget */}
        <ReenAIChat onOpenBooking={() => handleOpenBooking("")} />

        {/* Global Floating WhatsApp Widget */}
        <WhatsAppFloatingButton />
      </body>
    </html>
  );
}

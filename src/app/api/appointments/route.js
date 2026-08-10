import { NextResponse } from "next/server";
import { initialAppointments } from "@/lib/data-store";

// Global in-memory storage for runtime demo persistence
let appointments = [...initialAppointments];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: appointments,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { patientName, phone, email, doctorName, specialty, date, time, notes } = body;

    if (!patientName || !phone) {
      return NextResponse.json(
        { success: false, message: "يرجى تعبئة جميع الحقول المطلوبة (الاسم ورقم الهاتف)" },
        { status: 400 }
      );
    }

    const newAppointment = {
      id: `APT-${1000 + appointments.length + 1}`,
      patientName,
      phone,
      email: email || "",
      doctorName: doctorName || "طبيب استشاري",
      specialty: specialty || "خدمات عامة",
      date: date || new Date().toISOString().split("T")[0],
      time: time || "10:00 AM",
      status: "معلق",
      notes: notes || "",
      createdAt: new Date().toISOString(),
    };

    appointments.unshift(newAppointment);

    return NextResponse.json({
      success: true,
      message: "تم تسجيل حجز الموعد بنجاح",
      data: newAppointment,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "خطأ خادم داخلي أثناء الحجز" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, status } = body;

    const idx = appointments.findIndex((a) => a.id === id);
    if (idx !== -1) {
      appointments[idx].status = status;
      return NextResponse.json({ success: true, data: appointments[idx] });
    }

    return NextResponse.json({ success: false, message: "الموعد غير موجود" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

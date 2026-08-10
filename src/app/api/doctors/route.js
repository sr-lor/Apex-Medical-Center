import { NextResponse } from "next/server";
import { initialDoctors } from "@/lib/data-store";

let doctors = [...initialDoctors];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: doctors,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newDoc = {
      id: `dr-${Date.now()}`,
      nameAr: body.nameAr || "د. طبيب جديد",
      nameEn: body.nameEn || "Dr. New Specialist",
      titleAr: body.titleAr || "استشاري طبي",
      titleEn: body.titleEn || "Medical Consultant",
      specialtyId: body.specialtyId || "cosmetic-dentistry",
      specialtyAr: body.specialtyAr || "طب وتجميل الأسنان",
      specialtyEn: body.specialtyEn || "Cosmetic Dentistry",
      image: body.image || "/wp-content/uploads/2026/07/NO-IMAGE.jpg",
      experienceAr: body.experienceAr || "خبرة واسعة في التخصص الطبي.",
      experienceEn: body.experienceEn || "Extensive clinical experience.",
      rating: 5.0,
      reviewsCount: 1,
      availableDaysAr: body.availableDaysAr || "الأحد - الخميس (09:00 ص - 05:00 م)",
      availableDaysEn: body.availableDaysEn || "Sun - Thu (09:00 AM - 05:00 PM)",
    };

    doctors.unshift(newDoc);
    return NextResponse.json({ success: true, data: newDoc });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false, message: "معرف الطبيب مفقود" }, { status: 400 });
  }

  doctors = doctors.filter((d) => d.id !== id);
  return NextResponse.json({ success: true, message: "تم حذف الطبيب بنجاح" });
}

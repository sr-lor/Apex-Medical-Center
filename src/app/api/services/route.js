import { NextResponse } from "next/server";
import { initialServices } from "@/lib/data-store";

let services = [...initialServices];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: services,
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newService = {
      id: body.slug || `service-${Date.now()}`,
      titleAr: body.titleAr || "خدمة طبية جديدة",
      titleEn: body.titleEn || "New Medical Service",
      slug: body.slug || `service-${Date.now()}`,
      iconName: body.iconName || "Sparkles",
      image: body.image || "/wp-content/uploads/2026/04/HOME-SECTION-2.jpg",
      descriptionAr: body.descriptionAr || "وصف الخدمة والعيادة التخصصية.",
      descriptionEn: body.descriptionEn || "Detailed service description.",
      featuresAr: body.featuresAr || ["تقنيات حديثة", "استشاريين متميزين"],
      featuresEn: body.featuresEn || ["Modern Tech", "Expert Consultants"],
    };

    services.push(newService);
    return NextResponse.json({ success: true, data: newService });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

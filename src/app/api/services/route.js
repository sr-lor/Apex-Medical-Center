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
      branchIds: body.branchIds || ["azaiba"],
      iconName: body.iconName || "Sparkles",
      image: body.image || "/wp-content/uploads/2026/04/HOME-SECTION-2.jpg",
      shortDescriptionAr: body.shortDescriptionAr || body.descriptionAr || "وصف الخدمة والعيادة التخصصية.",
      fullParagraphAr: body.fullParagraphAr || body.descriptionAr || "وصف تفصيلي كامل للقسم والتخصص.",
      descriptionAr: body.descriptionAr || "وصف الخدمة والعيادة التخصصية.",
      descriptionEn: body.descriptionEn || "Detailed service description.",
      featuresAr: body.featuresAr || ["تقنيات حديثة", "استشاريين متميزين"],
      featuresEn: body.featuresEn || ["Modern Tech", "Expert Consultants"],
    };

    services.unshift(newService);
    return NextResponse.json({ success: true, data: newService });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json({ success: false, message: "معرف التخصص مفقود" }, { status: 400 });
    }

    const index = services.findIndex((s) => s.id === id);
    if (index === -1) {
      return NextResponse.json({ success: false, message: "التخصص غير موجود" }, { status: 404 });
    }

    services[index] = {
      ...services[index],
      titleAr: body.titleAr ?? services[index].titleAr,
      titleEn: body.titleEn ?? services[index].titleEn,
      slug: body.slug ?? services[index].slug,
      branchIds: body.branchIds ?? services[index].branchIds,
      image: body.image ?? services[index].image,
      shortDescriptionAr: body.shortDescriptionAr ?? services[index].shortDescriptionAr,
      fullParagraphAr: body.fullParagraphAr ?? services[index].fullParagraphAr,
      descriptionAr: body.descriptionAr ?? services[index].descriptionAr,
    };

    return NextResponse.json({ success: true, data: services[index] });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false, message: "معرف التخصص مفقود" }, { status: 400 });
  }

  services = services.filter((s) => s.id !== id);
  return NextResponse.json({ success: true, message: "تم حذف التخصص بنجاح" });
}

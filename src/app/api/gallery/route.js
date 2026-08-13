import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const galleryFilePath = path.join(dataDir, "gallery.json");

const initialGalleryItems = [
  {
    id: "gal-1",
    title: "استقبال مجمع القمة الطبي",
    category: "مرافق المركز",
    image: "/wp-content/uploads/2026/04/WHY1.jpg",
    createdAt: "2026-04-10",
  },
  {
    id: "gal-2",
    title: "عيادات طب وتجميل الأسنان",
    category: "عيادات الأسنان",
    image: "/wp-content/uploads/2026/04/Our-Cosmetic-Dentistry-Services.jpg",
    createdAt: "2026-04-11",
  },
  {
    id: "gal-3",
    title: "أجهزة إزالة الشعر والتجميل بالليزر",
    category: "عيادة الليزر",
    image: "/wp-content/uploads/2026/04/laser_New.jpg",
    createdAt: "2026-04-12",
  },
  {
    id: "gal-4",
    title: "قسم الجراحة التجميلية وتنسيق القوام",
    category: "التجميل والجراحة",
    image: "/wp-content/uploads/2026/04/plastic-surgery.jpg",
    createdAt: "2026-04-15",
  },
  {
    id: "gal-5",
    title: "عيادة جراحات السمنة والتخسيس",
    category: "إدارة الوزن",
    image: "/wp-content/uploads/2026/04/Weight.jpg",
    createdAt: "2026-04-18",
  },
  {
    id: "gal-6",
    title: "عيادة العظام وعلاج المفاصل",
    category: "جراحة العظام",
    image: "/wp-content/uploads/2026/04/orthopedic.jpg",
    createdAt: "2026-04-20",
  },
];

function ensureFileExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(galleryFilePath)) {
    fs.writeFileSync(galleryFilePath, JSON.stringify(initialGalleryItems, null, 2), "utf8");
  }
}

function readGallery() {
  ensureFileExists();
  try {
    const raw = fs.readFileSync(galleryFilePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading gallery data:", err);
    return initialGalleryItems;
  }
}

function writeGallery(items) {
  ensureFileExists();
  try {
    fs.writeFileSync(galleryFilePath, JSON.stringify(items, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing gallery data:", err);
  }
}

export async function GET() {
  const items = readGallery();
  return NextResponse.json({ items });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { title, category, image } = body;

    if (!title || !image) {
      return NextResponse.json({ error: "عنوان الصورة ورابط الصورة مطلوبان" }, { status: 400 });
    }

    const items = readGallery();

    const newItem = {
      id: `gal-${Date.now()}`,
      title: title.trim(),
      category: category ? category.trim() : "مرافق المركز",
      image: image.trim(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    items.unshift(newItem);
    writeGallery(items);

    return NextResponse.json({ success: true, item: newItem, message: "تمت إضافة الصورة إلى معرض الصور بنجاح" });
  } catch (err) {
    console.error("POST Gallery Error:", err);
    return NextResponse.json({ error: "فشل إضافة الصورة" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, title, category, image } = body;

    if (!id || !title || !image) {
      return NextResponse.json({ error: "المعرف والعنوان والصورة مطلوبة" }, { status: 400 });
    }

    let items = readGallery();
    const index = items.findIndex((i) => i.id === id);

    if (index < 0) {
      return NextResponse.json({ error: "الصورة غير موجودة" }, { status: 404 });
    }

    items[index] = {
      ...items[index],
      title: title.trim(),
      category: category ? category.trim() : items[index].category,
      image: image.trim(),
      updatedAt: new Date().toISOString().split("T")[0],
    };

    writeGallery(items);

    return NextResponse.json({ success: true, item: items[index], message: "تم تحديث بيانات الصورة بنجاح" });
  } catch (err) {
    console.error("PUT Gallery Error:", err);
    return NextResponse.json({ error: "فشل تحديث البيانات" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "معرف الصورة مطلوب" }, { status: 400 });
    }

    let items = readGallery();
    items = items.filter((i) => i.id !== id);
    writeGallery(items);

    return NextResponse.json({ success: true, message: "تم حذف الصورة من معرض الصور بنجاح" });
  } catch (err) {
    console.error("DELETE Gallery Error:", err);
    return NextResponse.json({ error: "فشل حذف الصورة" }, { status: 500 });
  }
}

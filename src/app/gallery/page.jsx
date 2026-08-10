"use client";

import { Image as ImageIcon, Sparkles } from "lucide-react";

export default function GalleryPage() {
  const galleryItems = [
    {
      title: "استقبال مجمع القمة الطبي",
      category: "مرافق المركز",
      image: "/wp-content/uploads/2026/04/WHY1.jpg",
    },
    {
      title: "عيادات طب وتجميل الأسنان",
      category: "عيادات الأسنان",
      image: "/wp-content/uploads/2026/04/Our-Cosmetic-Dentistry-Services.jpg",
    },
    {
      title: "أجهزة إزالة الشعر والتجميل بالليزر",
      category: "عيادة الليزر",
      image: "/wp-content/uploads/2026/04/laser_New.jpg",
    },
    {
      title: "قسم الجراحة التجميلية وتنسيق القوام",
      category: "التجميل والجراحة",
      image: "/wp-content/uploads/2026/04/plastic-surgery.jpg",
    },
    {
      title: "عيادة جراحات السمنة والتخسيس",
      category: "إدارة الوزن",
      image: "/wp-content/uploads/2026/04/Weight.jpg",
    },
    {
      title: "عيادة العظام وعلاج المفاصل",
      category: "جراحة العظام",
      image: "/wp-content/uploads/2026/04/orthopedic.jpg",
    },
  ];

  return (
    <div className="pt-32 pb-20 bg-[#0B0A0C] min-h-screen text-white">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-apex-gold text-xs font-extrabold px-4 py-1.5 rounded-full border border-apex-gold/30">
            <ImageIcon className="w-4 h-4 text-apex-gold" />
            معرض الصور
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            صور ومرافق <span className="text-gradient-apex">مجمع القمة الطبي</span>
          </h1>

          <p className="text-slate-300 text-base leading-relaxed font-light">
            جولة مصورة في عيادات ومرافق مجمع القمة الطبي في سلطنة عمان.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#151112] rounded-3xl overflow-hidden shadow-2xl border border-apex-gold/20 group hover:border-apex-gold/50 transition-all duration-300 text-right"
            >
              <div className="relative h-64 overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0C] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 right-4 left-4">
                  <span className="bg-[#151112]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-apex-gold border border-apex-gold/30">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

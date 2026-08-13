"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, Sparkles, Filter, RefreshCw, AlertCircle } from "lucide-react";

export default function GalleryPage() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setGalleryItems(data.items || []);
      }
    } catch (err) {
      console.error("Error fetching gallery items:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const categories = ["الكل", ...new Set(galleryItems.map((item) => item.category || "عام"))];

  const filteredItems = galleryItems.filter((item) => {
    if (selectedCategory === "الكل") return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="pt-32 pb-20 bg-[#0B0A0C] min-h-screen text-white text-right font-sans">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-apex-gold text-xs font-extrabold px-4 py-1.5 rounded-full border border-apex-gold/30">
            <ImageIcon className="w-4 h-4 text-apex-gold" />
            <span>معرض الصور والفيديوهات</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            صور ومرافق <span className="text-gradient-apex">مجمع القمة الطبي</span>
          </h1>

          <p className="text-slate-300 text-base leading-relaxed font-light">
            جولة مصورة في عيادات ومرافق مجمع القمة الطبي المجهزة بأحدث التقنيات الطبية والتجميلية في سلطنة عمان.
          </p>

          {/* Category Filter Chips */}
          {categories.length > 1 && (
            <div className="flex items-center justify-center gap-2 flex-wrap pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-gradient-to-r from-apex-gold to-amber-500 text-slate-950 border-apex-gold shadow-lg shadow-apex-gold/20 scale-105"
                      : "bg-[#151112] hover:bg-slate-900 text-slate-300 border-white/10 hover:border-apex-gold/30"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dynamic Gallery Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400 space-y-3">
            <RefreshCw className="w-8 h-8 text-apex-gold animate-spin mx-auto" />
            <p className="text-sm font-bold">جاري تحميل معرض صور مجمع القمة الطبي...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-20 text-center text-slate-400 space-y-3 bg-[#151112] rounded-3xl border border-white/10 max-w-xl mx-auto p-8">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">لا توجد صور في هذا التصنيف حالياً</h3>
            <p className="text-xs text-slate-400">يرجى اختيار تصنيف آخر أو العودة لاحقاً لمشاهدة التحديثات.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#151112] rounded-3xl overflow-hidden shadow-2xl border border-apex-gold/20 group hover:border-apex-gold/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-64 overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/wp-content/uploads/2026/04/WHY1.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0C] via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 right-4 left-4">
                    <span className="bg-[#151112]/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-apex-gold border border-apex-gold/30">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

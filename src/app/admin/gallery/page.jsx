"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  Image as ImageIcon, Plus, Trash2, Edit3, RefreshCw, Search, CheckCircle2, AlertCircle, X, ExternalLink, Sparkles, Filter
} from "lucide-react";

const DEFAULT_CATEGORIES = [
  "مرافق المركز",
  "عيادات الأسنان",
  "عيادة الليزر",
  "التجميل والجراحة",
  "إدارة الوزن",
  "جراحة العظام",
  "أخرى",
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "مرافق المركز",
    customCategory: "",
    image: "",
  });

  const [msg, setMsg] = useState({ type: "", text: "" });

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/gallery");
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      console.error("Error fetching gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "مرافق المركز",
      customCategory: "",
      image: "",
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    const isCustom = !DEFAULT_CATEGORIES.includes(item.category);
    setFormData({
      title: item.title,
      category: isCustom ? "أخرى" : item.category,
      customCategory: isCustom ? item.category : "",
      image: item.image,
    });
    setShowModal(true);
  };

  const handleSaveItem = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image.trim()) {
      setMsg({ type: "error", text: "عنوان الصورة ورابط الصورة مطلوبان." });
      return;
    }

    const finalCategory =
      formData.category === "أخرى" && formData.customCategory.trim()
        ? formData.customCategory.trim()
        : formData.category;

    const payload = {
      id: editingItem?.id,
      title: formData.title.trim(),
      category: finalCategory,
      image: formData.image.trim(),
    };

    try {
      const method = editingItem ? "PUT" : "POST";
      const res = await fetch("/api/gallery", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setMsg({ type: "success", text: data.message || "تم حفظ الصورة بنجاح في معرض الصور!" });
        setShowModal(false);
        fetchGallery();
      } else {
        const errData = await res.json();
        setMsg({ type: "error", text: errData.error || "حدث خطأ أثناء حفظ بيانات الصورة." });
      }
    } catch (err) {
      console.error("Save gallery item error:", err);
      setMsg({ type: "error", text: "فشل الاتصال بالخادم." });
    }
  };

  const handleDeleteItem = async (id) => {
    if (!confirm("هل أنت تأكد من رغبتك في حذف هذه الصورة من معرض الصور؟")) return;

    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setItems(items.filter((i) => i.id !== id));
        setMsg({ type: "success", text: "تم حذف الصورة من معرض الصور بنجاح." });
      } else {
        const errData = await res.json();
        alert(errData.error || "فشل حذف الصورة");
      }
    } catch (err) {
      console.error("Delete gallery item error:", err);
    }
  };

  const categories = ["الكل", ...new Set(items.map((i) => i.category || "عام"))];

  const filteredItems = items.filter((item) => {
    const term = searchTerm.toLowerCase();
    const matchesTerm =
      item.title?.toLowerCase().includes(term) ||
      item.category?.toLowerCase().includes(term);

    const matchesCategory =
      selectedCategory === "الكل" || item.category === selectedCategory;

    return matchesTerm && matchesCategory;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-apex-navy text-apex-gold flex items-center justify-center font-extrabold shadow-sm border border-apex-gold/30">
                <ImageIcon className="w-5 h-5 text-apex-gold" />
              </div>
              <div>
                <h1 className="font-black text-xl text-slate-900">إدارة معرض الصور</h1>
                <p className="text-xs text-slate-500">إضافة وتعديل وحذف الصور ومرافق المجمع المعروضة في صفحة المعرض العامة</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/gallery"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 border border-slate-200"
            >
              <ExternalLink className="w-4 h-4" />
              <span>معاينة صفحة المعرض للزوار</span>
            </a>

            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 bg-apex-navy hover:bg-slate-900 text-apex-gold rounded-xl font-bold text-xs transition-colors flex items-center gap-2 border border-apex-gold/30 cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4 text-apex-gold" />
              <span>إضافة صورة جديدة للمعرض</span>
            </button>

            <button
              onClick={fetchGallery}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors border border-slate-200 cursor-pointer"
              title="تحديث البيانات"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Notification Toast */}
        {msg.text && (
          <div
            className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between ${
              msg.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {msg.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
              <span>{msg.text}</span>
            </div>
            <button onClick={() => setMsg({ type: "", text: "" })} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Analytics Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">إجمالي صور المعرض</p>
              <h3 className="text-2xl font-black text-slate-900">{items.length} صورة</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <ImageIcon className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">الأقسام والتصنيفات المتاحة</p>
              <h3 className="text-2xl font-black text-purple-600">{categories.length - 1} تصنيف</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-200">
              <Filter className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">حالة العرض المباشر</p>
              <h3 className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 mt-1">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>مربوط مباشرة مع قاعدة البيانات</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <Sparkles className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="البحث باسم الصورة، أو القسم..."
              className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy font-medium"
            />
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-apex-navy text-apex-gold shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Items Grid */}
        {loading ? (
          <div className="bg-white p-12 rounded-3xl text-center text-slate-500 border border-slate-200">
            <RefreshCw className="w-8 h-8 text-apex-gold animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold">جاري تحميل صور المعرض...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center text-slate-500 border border-slate-200 space-y-2">
            <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">لا توجد صور في معرض الصور حالياً</h3>
            <p className="text-xs text-slate-400">يمكنك إضافة صور جديدة من خلال زر "إضافة صورة جديدة للمعرض".</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image Preview Container */}
                  <div className="relative h-48 bg-slate-900 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                    <span className="absolute top-3 right-3 bg-apex-navy/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-apex-gold border border-apex-gold/30 shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Title & Info */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-sm text-slate-900 leading-snug">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 font-mono truncate dir-ltr text-right">{item.image}</p>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="p-4 pt-0 flex items-center justify-between border-t border-slate-100 mt-2">
                  <span className="text-[10px] font-bold text-slate-400">
                    تاريخ التخزين: {item.createdAt || "2026"}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="p-2 text-slate-600 hover:text-apex-navy hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border border-slate-200"
                      title="تعديل الصورة"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-slate-200"
                      title="حذف الصورة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal: Create or Edit Gallery Item */}
        {showModal && (
          <div className="fixed inset-0 z-[10000] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 text-right">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-apex-navy text-apex-gold flex items-center justify-center font-bold">
                    <ImageIcon className="w-5 h-5 text-apex-gold" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {editingItem ? "تعديل صورة في المعرض" : "إضافة صورة جديدة لمعرض الصور"}
                    </h3>
                    <p className="text-xs text-slate-500">سيتم ربطها وعرضها فوراً في صفحة المعرض العامة للزوار</p>
                  </div>
                </div>

                <button onClick={() => setShowModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveItem} className="space-y-4 text-slate-900">
                <div>
                  <label className="block text-xs font-extrabold text-slate-900 mb-1">
                    عنوان الصورة الوصفي <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="مثال: عيادة طب وتجميل الأسنان المتقدمة"
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy focus:border-apex-navy font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 mb-1">القسم أو التصنيف الطبي:</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 border-2 border-slate-300 rounded-xl text-xs font-extrabold outline-none focus:ring-2 focus:ring-apex-navy focus:border-apex-navy mb-2 cursor-pointer"
                  >
                    {DEFAULT_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-white text-slate-900 font-extrabold py-2">
                        {cat}
                      </option>
                    ))}
                  </select>

                  {formData.category === "أخرى" && (
                    <input
                      type="text"
                      required
                      value={formData.customCategory}
                      onChange={(e) => setFormData({ ...formData, customCategory: e.target.value })}
                      placeholder="اكتب اسم القسم الجديد..."
                      className="w-full px-3.5 py-2 bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy font-bold"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-900 mb-1">
                    مسار أو رابط الصورة المباشر <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="/wp-content/uploads/2026/04/..."
                    className="w-full px-3.5 py-2.5 bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy font-mono font-bold dir-ltr text-right"
                  />
                </div>

                {/* Preview image if valid URL */}
                {formData.image && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-slate-500">معاينة الصورة:</span>
                    <div className="h-40 rounded-2xl bg-slate-900 overflow-hidden border border-slate-200">
                      <img
                        src={formData.image}
                        alt="معاينة"
                        className="w-full h-full object-cover"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-apex-navy hover:bg-slate-900 text-apex-gold font-bold text-xs rounded-xl shadow-md cursor-pointer border border-apex-gold/30"
                  >
                    {editingItem ? "حفظ التعديلات" : "إضافة الصورة إلى المعرض"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

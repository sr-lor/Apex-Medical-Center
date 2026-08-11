"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  Stethoscope, Plus, Trash2, Edit3, Upload, CheckCircle2, 
  AlertCircle, Search, Filter, MapPin, Building2, Shield, X, Sparkles 
} from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);

  // Filter & Search State
  const [activeBranchFilter, setActiveBranchFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    id: "",
    titleAr: "",
    titleEn: "",
    slug: "",
    branchIds: ["azaiba"],
    image: "/wp-content/uploads/2026/04/HOME-SECTION-2.jpg",
    shortDescriptionAr: "",
    descriptionAr: "",
    fullParagraphAr: "",
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (e) {
      console.error("Fetch services error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setEditingService(null);
    setFormData({
      id: "",
      titleAr: "",
      titleEn: "",
      slug: "",
      branchIds: ["azaiba"],
      image: "/wp-content/uploads/2026/04/HOME-SECTION-2.jpg",
      shortDescriptionAr: "",
      descriptionAr: "",
      fullParagraphAr: "",
    });
    setMsg({ type: "", text: "" });
    setShowModal(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      id: service.id,
      titleAr: service.titleAr || "",
      titleEn: service.titleEn || "",
      slug: service.slug || service.id || "",
      branchIds: service.branchIds && service.branchIds.length ? service.branchIds : ["azaiba"],
      image: service.image || "/wp-content/uploads/2026/04/HOME-SECTION-2.jpg",
      shortDescriptionAr: service.shortDescriptionAr || service.descriptionAr || "",
      descriptionAr: service.descriptionAr || "",
      fullParagraphAr: service.fullParagraphAr || service.descriptionAr || "",
    });
    setMsg({ type: "", text: "" });
    setShowModal(true);
  };

  const handleBranchToggle = (branchId) => {
    let updatedBranches = [...formData.branchIds];
    if (updatedBranches.includes(branchId)) {
      if (updatedBranches.length > 1) {
        updatedBranches = updatedBranches.filter((b) => b !== branchId);
      }
    } else {
      updatedBranches.push(branchId);
    }
    setFormData({ ...formData, branchIds: updatedBranches });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setMsg({ type: "", text: "" });
    const body = new FormData();
    body.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });
      const data = await res.json();
      if (data.success) {
        setFormData({ ...formData, image: data.url });
        setMsg({
          type: "success",
          text: data.isMock
            ? "تم استخدام مسار الصورة بنجاح (وضع العرض)"
            : "تم رفع صورة العيادة بنجاح إلى AWS S3!",
        });
      }
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "حدث خطأ أثناء الرفع إلى AWS S3" });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });

    try {
      const isEdit = Boolean(editingService);
      const url = "/api/services";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        if (isEdit) {
          setServices(services.map((s) => (s.id === data.data.id ? data.data : s)));
        } else {
          setServices([data.data, ...services]);
        }
        setShowModal(false);
      } else {
        setMsg({ type: "error", text: data.message || "حدث خطأ أثناء حفظ بيانات التخصص" });
      }
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "تعذر الاتصال بالسيرفر" });
    }
  };

  const handleDeleteService = async (id, title) => {
    if (!confirm(`هل أنت تأكد من رغبتك في حذف تخصص/عيادة (${title})؟`)) return;
    try {
      const res = await fetch(`/api/services?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setServices(services.filter((s) => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter Services by Branch & Search Query
  const filteredServices = services.filter((serv) => {
    const matchesBranch =
      activeBranchFilter === "all" || (serv.branchIds && serv.branchIds.includes(activeBranchFilter));
    const matchesSearch =
      searchQuery.trim() === "" ||
      serv.titleAr.includes(searchQuery) ||
      (serv.titleEn && serv.titleEn.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (serv.descriptionAr && serv.descriptionAr.includes(searchQuery));

    return matchesBranch && matchesSearch;
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-apex-gold" />
              <span>إدارة التخصصات والعيادات الطبية</span>
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              إضافة تعديل الأقسام الطبية والتخصصات وتحديد الفروع المتاحة بها مع رفع الصور لـ AWS S3.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-apex-gold to-apex-gold-dark hover:from-apex-gold-dark hover:to-apex-gold-deep text-slate-950 px-5 py-3 rounded-2xl font-extrabold text-xs shadow-gold hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة تخصص / عيادة جديدة</span>
          </button>
        </div>

        {/* Filters & Branch Control Toolbar */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Branch Filter Tabs */}
          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <span className="text-xs font-bold text-slate-500 px-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-apex-gold" />
              <span>فلتر الفرع:</span>
            </span>

            <button
              onClick={() => setActiveBranchFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeBranchFilter === "all"
                  ? "bg-apex-navy text-white shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              جميع الفروع ({services.length})
            </button>

            <button
              onClick={() => setActiveBranchFilter("azaiba")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeBranchFilter === "azaiba"
                  ? "bg-apex-gold text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              فرع العذيبة ({services.filter((s) => s.branchIds?.includes("azaiba")).length})
            </button>

            <button
              onClick={() => setActiveBranchFilter("amerat")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeBranchFilter === "amerat"
                  ? "bg-apex-gold text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              فرع العامرات ({services.filter((s) => s.branchIds?.includes("amerat")).length})
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3.5" />
            <input
              type="text"
              placeholder="ابحث باسم التخصص أو العيادة..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-apex-gold"
            />
          </div>

        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="text-center py-16 text-slate-400 font-semibold text-sm">
            جاري تحميل التخصصات والعيادات...
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-3">
            <Stethoscope className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700">لا توجد عيادات تخصصية مطابقة لشروط الفلتر</h3>
            <p className="text-xs text-slate-400">حاول تغيير فلتر الفرع أو كلمة البحث الحالية.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((serv) => {
              const isAzaiba = serv.branchIds?.includes("azaiba");
              const isAmerat = serv.branchIds?.includes("amerat");

              return (
                <div
                  key={serv.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between space-y-4 group"
                >
                  <div>
                    {/* Specialty Image */}
                    <div className="relative w-full h-44 rounded-2xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                      <img
                        src={serv.image}
                        alt={serv.titleAr}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Branch Badges */}
                    <div className="flex items-center gap-1.5 mb-2">
                      {isAzaiba && (
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-extrabold rounded-md flex items-center gap-1 border border-blue-200">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>فرع العذيبة</span>
                        </span>
                      )}
                      {isAmerat && (
                        <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-extrabold rounded-md flex items-center gap-1 border border-emerald-200">
                          <MapPin className="w-2.5 h-2.5" />
                          <span>فرع العامرات</span>
                        </span>
                      )}
                    </div>

                    {/* Specialty Title */}
                    <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-apex-navy transition-colors mb-2">
                      {serv.titleAr}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                      {serv.shortDescriptionAr || serv.descriptionAr}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => openEditModal(serv)}
                      className="flex-1 py-2 bg-amber-50 hover:bg-amber-100 text-amber-800 rounded-xl font-extrabold text-xs transition-colors flex items-center justify-center gap-1.5 border border-amber-200"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل التخصص</span>
                    </button>

                    <button
                      onClick={() => handleDeleteService(serv.id, serv.titleAr)}
                      className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1 border border-rose-200"
                      title="حذف التخصص"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Add / Edit Specialty Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 animate-scale-up border border-slate-200 text-right max-h-[90vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">
                    {editingService ? `تعديل عيادة: ${editingService.titleAr}` : "إضافة تخصص / قسم طبي جديد"}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    تعديل الوصف وتخصيص فروع العيادة ورفع صورتها لـ AWS S3.
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Feedback Messages */}
              {msg.text && (
                <div
                  className={`p-3.5 rounded-2xl text-xs font-bold flex items-center gap-2 ${
                    msg.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-rose-50 text-rose-800 border border-rose-200"
                  }`}
                >
                  {msg.type === "success" ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                  )}
                  <span>{msg.text}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      عنوان التخصص / القسم (بالعربية) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="عيادات طب وتجميل الأسنان"
                      value={formData.titleAr}
                      onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-apex-gold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      الرابط الدائم الفريد (Slug) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="cosmetic-dentistry"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-apex-gold text-left"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Branch Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2">
                    تحديد فروع توفر هذه العيادة والتخصص *
                  </label>
                  <div className="flex items-center gap-4 bg-slate-50 p-3 rounded-2xl border border-slate-200">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                      <input
                        type="checkbox"
                        checked={formData.branchIds.includes("azaiba")}
                        onChange={() => handleBranchToggle("azaiba")}
                        className="w-4 h-4 rounded text-apex-gold focus:ring-apex-gold"
                      />
                      <span>📍 متوفر في فرع العذيبة</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                      <input
                        type="checkbox"
                        checked={formData.branchIds.includes("amerat")}
                        onChange={() => handleBranchToggle("amerat")}
                        className="w-4 h-4 rounded text-apex-gold focus:ring-apex-gold"
                      />
                      <span>📍 متوفر في فرع العامرات</span>
                    </label>
                  </div>
                </div>

                {/* AWS S3 Direct Upload */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    صورة القسم والتخصص (رفع مباشر لـ AWS S3) *
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="text"
                      placeholder="رابط الصورة أو المسار..."
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className="flex-grow p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-apex-gold"
                      dir="ltr"
                    />

                    <label className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-3 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm">
                      <Upload className="w-4 h-4 text-apex-gold" />
                      <span>{uploadingImage ? "جاري الرفع لـ S3..." : "رفع من الجهاز لـ S3"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        disabled={uploadingImage}
                      />
                    </label>
                  </div>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الوصف المختصر للبطاقة والفرع (عربي) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    placeholder="نقدم في مجمع القمة الطبي علاجات متطورة للجلدية والتجميل..."
                    value={formData.shortDescriptionAr}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        shortDescriptionAr: e.target.value,
                        descriptionAr: e.target.value,
                      })
                    }
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-apex-gold"
                  />
                </div>

                {/* Full Paragraph */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    النص والوصف الكامل المعتمد للقسم (صفحة التفاصيل)
                  </label>
                  <textarea
                    rows={4}
                    placeholder="النص المعتمد بالكامل لهذا القسم والتخصص السريري..."
                    value={formData.fullParagraphAr}
                    onChange={(e) => setFormData({ ...formData, fullParagraphAr: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium leading-relaxed focus:outline-none focus:ring-2 focus:ring-apex-gold"
                  />
                </div>

                {/* Submit Actions */}
                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
                  >
                    إلغاء
                  </button>

                  <button
                    type="submit"
                    className="px-7 py-2.5 bg-gradient-to-r from-apex-gold to-apex-gold-dark hover:from-apex-gold-dark hover:to-apex-gold-deep text-slate-950 rounded-xl font-extrabold text-xs shadow-gold transition-all"
                  >
                    {editingService ? "حفظ تعديلات التخصص" : "إضافة التخصص الآن"}
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

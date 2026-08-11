"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  Stethoscope, Plus, Trash2, Edit3, Upload, CheckCircle2, 
  AlertCircle, Search, Filter, MapPin, Building2, Shield, X, Eye
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
          text: "تم رفع صورة العيادة بنجاح.",
        });
      } else {
        setMsg({ type: "error", text: data.message || "حدث خطأ أثناء رفع الصورة." });
      }
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "تعذر رفع الملف إلى السيرفر." });
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.titleAr) {
      setMsg({ type: "error", text: "يرجى كتابة اسم العيادة." });
      return;
    }

    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      const isEdit = !!editingService;
      const res = await fetch("/api/services", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setMsg({
          type: "success",
          text: isEdit ? "تم حفظ التعديلات بنجاح." : "تمت إضافة العيادة بنجاح.",
        });
        setShowModal(false);
        fetchServices();
      } else {
        setMsg({ type: "error", text: data.message || "فشلت عملية الحفظ." });
      }
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "حدث خطأ بالاتصال بالسيرفر." });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`هل أنت تأكد من رغبتك في حذف عيادة (${title})؟`)) return;

    try {
      const res = await fetch(`/api/services?id=${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setMsg({ type: "success", text: `تم حذف عيادة (${title}) بنجاح.` });
        fetchServices();
      } else {
        setMsg({ type: "error", text: data.message || "تعذر الحذف." });
      }
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "حدث خطأ بالاتصال أثناء الحذف." });
    }
  };

  // Filtered Services List
  const filteredServices = services.filter((serv) => {
    const matchesBranch =
      activeBranchFilter === "all" || serv.branchIds?.includes(activeBranchFilter);
    const matchesQuery =
      !searchQuery ||
      serv.titleAr?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      serv.descriptionAr?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesBranch && matchesQuery;
  });

  return (
    <AdminLayout>
      <div className="space-y-8 text-slate-900 font-sans text-right">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-5 h-5 text-amber-500" />
              <span>إدارة العيادات والأقسام الطبية</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium mt-1">
              إضافة وتعديل التخصصات الطبية وتخصيص تواجدها حسب فرعي العذيبة والعامرات.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>إضافة عيادة جديدة</span>
          </button>
        </div>

        {/* Feedback Message */}
        {msg.text && (
          <div
            className={`p-4 rounded-2xl text-xs font-bold flex items-center gap-2 ${
              msg.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-300"
                : "bg-rose-50 text-rose-900 border border-rose-300"
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

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              placeholder="البحث في العيادات..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-500" />
              <span>الفروع:</span>
            </span>

            <button
              onClick={() => setActiveBranchFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeBranchFilter === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              الكل ({services.length})
            </button>

            <button
              onClick={() => setActiveBranchFilter("azaiba")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeBranchFilter === "azaiba"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              فرع العذيبة ({services.filter((s) => s.branchIds?.includes("azaiba")).length})
            </button>

            <button
              onClick={() => setActiveBranchFilter("amerat")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeBranchFilter === "amerat"
                  ? "bg-emerald-600 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              فرع العامرات ({services.filter((s) => s.branchIds?.includes("amerat")).length})
            </button>
          </div>
        </div>

        {/* Existing Clinics Grid */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-500" />
            <span>قائمة العيادات المعتمدة ({filteredServices.length})</span>
          </h2>

          {loading ? (
            <div className="py-12 text-center text-xs font-medium text-slate-500">جاري تحميل البيانات...</div>
          ) : filteredServices.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Stethoscope className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-medium text-slate-500">لا توجد عيادات مطابقة للبحث.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((serv) => (
                <div
                  key={serv.id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div className="space-y-3">
                    <div className="relative h-44 bg-slate-100 overflow-hidden">
                      <img
                        src={serv.image || "/wp-content/uploads/2026/04/HOME-SECTION-2.jpg"}
                        alt={serv.titleAr}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        {serv.branchIds?.includes("azaiba") && (
                          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                            العذيبة
                          </span>
                        )}
                        {serv.branchIds?.includes("amerat") && (
                          <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                            العامرات
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <h3 className="font-bold text-slate-900 text-base">{serv.titleAr}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-normal">
                        {serv.descriptionAr || serv.shortDescriptionAr}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center gap-2 border-t border-slate-100 mt-4">
                    <button
                      onClick={() => openEditModal(serv)}
                      className="flex-1 py-2 bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-800 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>تعديل</span>
                    </button>

                    <button
                      onClick={() => handleDelete(serv.id, serv.titleAr)}
                      className="p-2 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
                      title="حذف"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Dialog */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-right my-8">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-amber-500" />
                  <span>{editingService ? "تعديل بيانات العيادة" : "إضافة عيادة جديدة"}</span>
                </h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">اسم العيادة (بالعربية) *</label>
                    <input
                      type="text"
                      required
                      placeholder="قسم طب وتجميل الأسنان"
                      value={formData.titleAr}
                      onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">اسم العيادة (بالإنجليزية)</label>
                    <input
                      type="text"
                      placeholder="Cosmetic Dentistry"
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 text-left focus:ring-2 focus:ring-amber-500"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* Branch Checkboxes */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-bold text-slate-800">تخصيص الفروع المتاحة بها *</label>
                  
                  <div className="flex items-center gap-6 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                      <input
                        type="checkbox"
                        checked={formData.branchIds.includes("azaiba")}
                        onChange={() => handleBranchToggle("azaiba")}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span>فرع العذيبة الرئيسي</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                      <input
                        type="checkbox"
                        checked={formData.branchIds.includes("amerat")}
                        onChange={() => handleBranchToggle("amerat")}
                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                      />
                      <span>فرع العامرات التخصصي</span>
                    </label>
                  </div>
                </div>

                {/* Image Upload */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <label className="block text-xs font-bold text-slate-800">صورة العيادة *</label>

                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-white border border-slate-300 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-sm">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Eye className="w-5 h-5 text-slate-300" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-medium text-slate-800 text-left dir-ltr"
                      />

                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>{uploadingImage ? "جاري الرفع..." : "رفع صورة"}</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">وصف مقتضب *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="وصف تعريفى مقتضب بالواجهة الرئيسية..."
                    value={formData.descriptionAr}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value, shortDescriptionAr: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المقال والوصف الطبي التفصيلي *</label>
                  <textarea
                    rows={4}
                    placeholder="شرح كامل للخدمات والأجهزة الطبية المتوفرة بالعيادة..."
                    value={formData.fullParagraphAr}
                    onChange={(e) => setFormData({ ...formData, fullParagraphAr: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-200"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs shadow-md"
                  >
                    {loading ? "جاري الحفظ..." : editingService ? "حفظ التعديلات" : "إضافة العيادة"}
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

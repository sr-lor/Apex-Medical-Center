"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  Stethoscope, Plus, Trash2, Edit3, Upload, CheckCircle2, 
  AlertCircle, Search, Filter, MapPin, Building2, Shield, X, Eye, HelpCircle, UserCheck
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
          text: "تم رفع صورة العيادة واختيارها بنجاح!",
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
      setMsg({ type: "error", text: "يرجى كتابة اسم العيادة والتخصص بالعربية." });
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
          text: isEdit ? "تم تحديث بيانات العيادة بنجاح!" : "تمت إضافة العيادة والتخصص بنجاح!",
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
      <div className="space-y-8 text-slate-900">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-6 h-6 text-amber-500" />
              <span>إدارة العيادات والتخصصات الطبية</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              إضافة عيادات جديدة وتعديل العيادات السابقة، وتحديد فروع العذيبة والعامرات لكل عيادة.
            </p>
          </div>

          <button
            onClick={openAddModal}
            className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-md transition-all hover:scale-105 flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-slate-950" />
            <span>إضافة عيادة وتخصص جديد</span>
          </button>
        </div>

        {/* Global Explanatory Guide Box (شرح إرشادي شامل) */}
        <div className="bg-slate-900 text-white p-5 rounded-3xl border border-amber-500/40 space-y-2 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <HelpCircle className="w-6 h-6 text-amber-400" />
          </div>
          <div className="text-xs space-y-1 text-right">
            <h3 className="font-extrabold text-amber-400 text-sm">💡 دليل الشرح الإرشادي لإدارة العيادات والتخصصات:</h3>
            <p className="text-slate-300 leading-relaxed font-semibold">
              يمكنك إضافة عيادات وأقسام علاجية جديدة أو تعديل العيادات السابقة. فور تخصيص الفروع لكل عيادة (العذيبة أو العامرات)، سيتم تحديث الفلاتر التفاعلية في الموقع والتذييل تلقائياً.
            </p>
          </div>
        </div>

        {/* Feedback Message */}
        {msg.text && (
          <div
            className={`p-4 rounded-2xl text-xs font-extrabold flex items-center gap-2 ${
              msg.type === "success"
                ? "bg-emerald-50 text-emerald-900 border border-emerald-300"
                : "bg-rose-50 text-rose-900 border border-rose-300"
            }`}
          >
            {msg.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
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
              placeholder="ابحث عن عيادة أو تخصص..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-3 pr-9 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-extrabold text-slate-700 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-amber-500" />
              <span>فلترة الفروع:</span>
            </span>

            <button
              onClick={() => setActiveBranchFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeBranchFilter === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              جميع الفروع ({services.length})
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

        {/* Existing Clinics Grid (إدارة العيادات والتخصصات السابقة) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-500" />
              <span>إدارة العيادات والتخصصات السابقة ({filteredServices.length})</span>
            </h2>
          </div>

          {loading ? (
            <div className="py-12 text-center text-xs font-bold text-slate-500">جاري تحميل بيانات العيادات...</div>
          ) : filteredServices.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
              <Stethoscope className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-500">لا توجد عيادات مطابقة للبحث أو الفلتر المحدد.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((serv) => (
                <div
                  key={serv.id}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
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
                          <span className="bg-blue-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
                            العذيبة
                          </span>
                        )}
                        {serv.branchIds?.includes("amerat") && (
                          <span className="bg-emerald-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
                            العامرات
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5 space-y-2 text-right">
                      <h3 className="font-extrabold text-slate-900 text-base">{serv.titleAr}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-semibold">
                        {serv.descriptionAr || serv.shortDescriptionAr}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center gap-2 border-t border-slate-100 mt-4">
                    <button
                      onClick={() => openEditModal(serv)}
                      className="flex-1 py-2.5 bg-slate-100 hover:bg-amber-500 hover:text-slate-950 text-slate-800 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>تعديل التفاصيل</span>
                    </button>

                    <button
                      onClick={() => handleDelete(serv.id, serv.titleAr)}
                      className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
                      title="حذف العيادة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add/Edit Clinic Modal with Comprehensive Explanatory Tooltips */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 text-right my-8">
              
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-amber-500" />
                  <span>{editingService ? "تعديل تفاصيل العيادة والتخصص" : "إضافة عيادة جديدة وتخصص طبي"}</span>
                </h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">اسم العيادة / التخصص (بالعربية) *</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: قسم طب وتجميل الأسنان"
                      value={formData.titleAr}
                      onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <span className="text-[10px] text-slate-400 font-semibold mt-1 block">📌 الشرح: الاسم الذي يظهر في قائمة التخصصات والتذييل.</span>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 mb-1">اسم العيادة (بالإنجليزية)</label>
                    <input
                      type="text"
                      placeholder="Cosmetic Dentistry"
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left focus:outline-none focus:ring-2 focus:ring-amber-500"
                      dir="ltr"
                    />
                    <span className="text-[10px] text-slate-400 font-semibold mt-1 block">📌 الشرح: الاسم الإنجليزي في الرابط والمعاينات.</span>
                  </div>
                </div>

                {/* Branch Checkboxes */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label className="block text-xs font-extrabold text-slate-800">تحديد فروع توفر هذه العيادة *</label>
                  <p className="text-[10px] text-slate-500 font-semibold">📌 الشرح: حدد الفرع الذي تتوفر فيه هذه العيادة لفلترتها بالموقع.</p>
                  
                  <div className="flex items-center gap-4 pt-1">
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
                      <span>فرع العامرات</span>
                    </label>
                  </div>
                </div>

                {/* Live Image Preview & Upload Box */}
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <label className="block text-xs font-extrabold text-slate-800">صورة العيادة والتجهيزات *</label>
                  <p className="text-[10px] text-slate-500 font-semibold">📌 الشرح: يمكنك رفع صورة جديدة أو اختيار رابط صورة معتمدة.</p>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-white border border-slate-300 overflow-hidden flex-shrink-0 flex items-center justify-center shadow-sm">
                      {formData.image ? (
                        <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Eye className="w-6 h-6 text-slate-300" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-800 text-left dir-ltr"
                      />

                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors">
                        <Upload className="w-3.5 h-3.5 text-amber-400" />
                        <span>{uploadingImage ? "جاري الرفع..." : "رفع صورة جديدة"}</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">وصف مقتضب للعيادة *</label>
                  <textarea
                    rows={2}
                    required
                    placeholder="وصف مقتضب يظهر في البطاقة السريعة..."
                    value={formData.descriptionAr}
                    onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value, shortDescriptionAr: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-[10px] text-slate-400 font-semibold mt-1 block">📌 الشرح: السطران التعريفيان في الواجهة الرئيسية.</span>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">الشرح الطبي الشامل والخدمات المتاحة *</label>
                  <textarea
                    rows={4}
                    placeholder="فقرة تفصيلية تشرح الخدمات والأجهزة الطبية المتوفرة بالعيادة..."
                    value={formData.fullParagraphAr}
                    onChange={(e) => setFormData({ ...formData, fullParagraphAr: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-[10px] text-slate-400 font-semibold mt-1 block">📌 الشرح: المقال الكامل الشامل الذي يقابله المريض في صفحة العيادة.</span>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 bg-slate-200 text-slate-700 rounded-xl font-bold text-xs hover:bg-slate-300"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-black text-xs shadow-md"
                  >
                    {loading ? "جاري الحفظ..." : editingService ? "حفظ التعديلات" : "إضافة العيادة بنجاح"}
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

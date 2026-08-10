"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { UserCheck, Plus, Trash2, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { initialServices } from "@/lib/data-store";

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    titleAr: "",
    titleEn: "",
    specialtyId: initialServices[0]?.id || "cosmetic-dentistry",
    specialtyAr: initialServices[0]?.titleAr || "طب وتجميل الأسنان",
    image: "",
    experienceAr: "",
    availableDaysAr: "الأحد - الخميس (09:00 ص - 05:00 م)",
  });

  const [uploadingImage, setUploadingImage] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/doctors");
      const data = await res.json();
      if (data.success) {
        setDoctors(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    setMsg("");
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
        setMsg(data.isMock ? "تم استخدام مسار الصورة بنجاح (وضع العرض)" : "تم رفع الصورة بنجاح إلى AWS S3!");
      }
    } catch (err) {
      console.error(err);
      setMsg("خطأ أثناء الرفع إلى AWS S3");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleCreateDoctor = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/doctors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setDoctors([data.data, ...doctors]);
        setShowAddForm(false);
        setFormData({
          nameAr: "",
          nameEn: "",
          titleAr: "",
          titleEn: "",
          specialtyId: initialServices[0]?.id || "cosmetic-dentistry",
          specialtyAr: initialServices[0]?.titleAr || "طب وتجميل الأسنان",
          image: "",
          experienceAr: "",
          availableDaysAr: "الأحد - الخميس (09:00 ص - 05:00 م)",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!confirm("هل أنت تأكد من رغبتك في حذف هذا الطبيب من الكادر؟")) return;
    try {
      const res = await fetch(`/api/doctors?id=${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setDoctors(doctors.filter((d) => d.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">إدارة الأطباء والكادر الطبي</h1>
            <p className="text-xs text-slate-500 mt-1">
              إضافة أطباء جدد، رفع صورهم لـ AWS S3، وتعديل تخصصاتهم.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 bg-apex-blue hover:bg-apex-blue-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة طبيب جديد</span>
          </button>
        </div>

        {/* Add Doctor Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card animate-fade-in space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-3">إضافة طبيب استشاري جديد</h3>

            {msg && (
              <div className="p-3 bg-blue-50 text-apex-blue text-xs rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{msg}</span>
              </div>
            )}

            <form onSubmit={handleCreateDoctor} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">اسم الطبيب بالكامل (عربي) *</label>
                  <input
                    type="text"
                    required
                    placeholder="د. محمد بن راشد"
                    value={formData.nameAr}
                    onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apex-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الاسم باللغة الإنجليزية *</label>
                  <input
                    type="text"
                    required
                    placeholder="Dr. Mohammed Rashid"
                    value={formData.nameEn}
                    onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apex-blue"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">المسمى الوظيفي (عربي) *</label>
                  <input
                    type="text"
                    required
                    placeholder="استشاري جراحة الأسنان وتجميل الابتسامة"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apex-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">التخصص الطلي *</label>
                  <select
                    value={formData.specialtyId}
                    onChange={(e) => {
                      const selectedServ = initialServices.find((s) => s.id === e.target.value);
                      setFormData({
                        ...formData,
                        specialtyId: e.target.value,
                        specialtyAr: selectedServ ? selectedServ.titleAr : formData.specialtyAr,
                      });
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apex-blue"
                  >
                    {initialServices.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.titleAr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* AWS Photo Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">صورة الطبيب (رفع مباشر لـ AWS S3) *</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-apex-blue-light file:text-apex-blue hover:file:bg-apex-blue hover:file:text-white"
                  />
                  {uploadingImage && <span className="text-xs text-apex-blue font-bold">جاري الرفع إلى S3...</span>}
                </div>
                {formData.image && (
                  <p className="text-[11px] text-emerald-600 font-mono mt-1 truncate">
                    الرابط: {formData.image}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">نبذة عن الخبرة والدراسة</label>
                <textarea
                  rows={2}
                  placeholder="خبرة أكثر من 15 سنة في العيادات التخصصية..."
                  value={formData.experienceAr}
                  onChange={(e) => setFormData({ ...formData, experienceAr: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apex-blue"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-bold"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-apex-blue text-white rounded-xl text-xs font-bold shadow-md"
                >
                  حفظ الطبيب
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc) => (
            <div key={doc.id} className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm relative space-y-3">
              <div className="w-full h-48 rounded-2xl overflow-hidden bg-slate-100">
                <img src={doc.image} alt={doc.nameAr} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-slate-800 text-base">{doc.nameAr}</h4>
                <span className="text-xs text-apex-blue font-semibold block">{doc.specialtyAr}</span>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{doc.titleAr}</p>
              </div>
              <button
                onClick={() => handleDeleteDoctor(doc.id)}
                className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                حذف الطبيب
              </button>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
}

"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Stethoscope, Plus, CheckCircle2 } from "lucide-react";

export default function AdminServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const [formData, setFormData] = useState({
    titleAr: "",
    titleEn: "",
    slug: "",
    descriptionAr: "",
    image: "/wp-content/uploads/2026/04/HOME-SECTION-2.jpg",
  });

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/services");
      const data = await res.json();
      if (data.success) {
        setServices(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreateService = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setServices([...services, data.data]);
        setShowAddForm(false);
        setFormData({ titleAr: "", titleEn: "", slug: "", descriptionAr: "", image: "" });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">إدارة التخصصات والعيادات الطبية</h1>
            <p className="text-xs text-slate-500 mt-1">
              إضافة تعديل الأقسام الطبية، التخصصات الرئيسية وخدمات المركز.
            </p>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center gap-2 bg-apex-blue hover:bg-apex-blue-dark text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>إضافة تخصص / عيادة جديدة</span>
          </button>
        </div>

        {/* Add Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-card animate-fade-in space-y-4">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-3">إضافة قسم طبي جديد</h3>
            <form onSubmit={handleCreateService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">عنوان التخصص (عربي) *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: عيادة طب الأطفال والتغذية"
                    value={formData.titleAr}
                    onChange={(e) => setFormData({ ...formData, titleAr: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apex-blue"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">الرابط المباشر (Slug) *</label>
                  <input
                    type="text"
                    required
                    placeholder="pediatrics"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apex-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">وصف العيادة أو القسم *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="وصف تفصيلي للخدمات المقدمة في هذه العيادة..."
                  value={formData.descriptionAr}
                  onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-apex-blue"
                />
              </div>

              <div className="flex justify-end gap-2">
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
                  إضافة القسم
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Services List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((serv) => (
            <div key={serv.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3">
              <div className="h-40 rounded-2xl overflow-hidden bg-slate-100">
                <img src={serv.image} alt={serv.titleAr} className="w-full h-full object-cover" />
              </div>
              <h4 className="font-bold text-slate-800 text-lg">{serv.titleAr}</h4>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{serv.descriptionAr}</p>
            </div>
          ))}
        </div>

      </div>
    </AdminLayout>
  );
}

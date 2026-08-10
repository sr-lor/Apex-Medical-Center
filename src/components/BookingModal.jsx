"use client";

import { useState } from "react";
import { X, Calendar, User, Phone, Mail, FileText, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { initialDoctors, initialServices } from "@/lib/data-store";

export default function BookingModal({ isOpen, onClose, preselectedDoctorId = "" }) {
  const [formData, setFormData] = useState({
    branchId: "azaiba",
    patientName: "",
    phone: "",
    email: "",
    doctorId: preselectedDoctorId,
    specialty: "طب وتجميل الأسنان",
    date: "",
    time: "10:00 AM",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!isOpen) return null;

  const availableServices = initialServices.filter((s) =>
    s.branchIds?.includes(formData.branchId)
  );

  const availableDoctors = initialDoctors.filter((d) =>
    d.branchIds?.includes(formData.branchId)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const branchName = formData.branchId === "amerat" ? "فرع العامرات" : "فرع العذيبة";
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          notes: `[الفرع: ${branchName}] ${formData.notes}`,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(data.data || data.appointment);
      }
    } catch (err) {
      console.error("Booking error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-apex-gold/30 relative overflow-hidden text-right">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-apex-gold-light flex items-center justify-center text-apex-gold-deep">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold">حجز موعد في مركز القمة الطبي</h3>
              <p className="text-xs text-slate-500">اختر الفرع والطبيب والموعد المناسب لزيارتك</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {successMsg ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-2xl font-bold text-slate-900">تم تسجيل طلب الحجز بنجاح!</h4>
            <p className="text-slate-600 text-sm max-w-md mx-auto">
              شكراً لتواصلك مع مركز القمة الطبي. تم تسجيل موعدك برقم المرجع{" "}
              <span className="font-bold text-apex-navy">{successMsg.id}</span>. سيتصل بك فريق خدمة العملاء قريباً لتأكيد التوقيت.
            </p>
            <button
              onClick={() => {
                setSuccessMsg(null);
                onClose();
              }}
              className="mt-4 bg-apex-navy text-apex-gold font-bold px-8 py-3 rounded-2xl shadow-md hover:bg-slate-900"
            >
              إغلاق النافذة
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Branch Selection Field */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">اختر الفرع المطلوب *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const nextServices = initialServices.filter((s) => s.branchIds?.includes("azaiba"));
                    setFormData({
                      ...formData,
                      branchId: "azaiba",
                      specialty: nextServices[0]?.titleAr || "طب وتجميل الأسنان",
                      doctorId: "",
                    });
                  }}
                  className={`py-2.5 px-4 rounded-xl text-xs font-extrabold border transition-all flex items-center justify-center gap-1.5 ${
                    formData.branchId === "azaiba"
                      ? "bg-apex-navy text-apex-gold border-apex-gold/50 shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>فرع العذيبة (الرئيسي)</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const nextServices = initialServices.filter((s) => s.branchIds?.includes("amerat"));
                    setFormData({
                      ...formData,
                      branchId: "amerat",
                      specialty: nextServices[0]?.titleAr || "إدارة الوزن (سمنة)",
                      doctorId: "",
                    });
                  }}
                  className={`py-2.5 px-4 rounded-xl text-xs font-extrabold border transition-all flex items-center justify-center gap-1.5 ${
                    formData.branchId === "amerat"
                      ? "bg-apex-navy text-apex-gold border-apex-gold/50 shadow-md"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span>فرع العامرات</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الاسم الكامل *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  <input
                    type="text"
                    required
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    placeholder="مثال: أحمد بن سالم المعمري"
                    className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-apex-navy focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">رقم الهاتف *</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+968 9123 4567"
                    className="w-full pr-10 pl-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-apex-navy focus:bg-white outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">التخصص المطلوب</label>
                <select
                  value={formData.specialty}
                  onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-apex-navy focus:bg-white outline-none font-medium"
                >
                  {availableServices.map((serv) => (
                    <option key={serv.id} value={serv.titleAr}>
                      {serv.titleAr}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">اختر الطبيب (اختياري)</label>
                <select
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-apex-navy focus:bg-white outline-none font-medium"
                >
                  {availableDoctors.length > 0 ? (
                    <>
                      <option value="">أي طبيب متاح في هذا الفرع</option>
                      {availableDoctors.map((doc) => (
                        <option key={doc.id} value={doc.id}>
                          {doc.nameAr} - {doc.specialtyAr}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value="">موعد عام (سيتم التنسيق بواسطة خدمة العملاء)</option>
                  )}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">التاريخ المفضل *</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-apex-navy focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">الوقت المفضل</label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-apex-navy focus:bg-white outline-none"
                >
                  <option value="10:00 AM">10:00 صباحاً</option>
                  <option value="11:30 AM">11:30 صباحاً</option>
                  <option value="04:00 PM">04:00 مساءً</option>
                  <option value="06:30 PM">06:30 مساءً</option>
                  <option value="08:00 PM">08:00 مساءً</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ملاحظات أو تفاصيل أخرى</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="اكتب أي استفسار أو تفاصيل إضافية..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-apex-navy focus:bg-white outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-apex-gold to-apex-gold-dark text-slate-950 rounded-xl font-extrabold text-sm shadow-gold hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>جاري تسجيل الحجز...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>تأكيد طلب الحجز المباشر</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

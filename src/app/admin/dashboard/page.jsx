"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { initialAppointments } from "@/lib/data-store";
import { Calendar, CheckCircle2, Clock, XCircle, Search, Filter, Plus } from "lucide-react";

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [search, setSearch] = useState("");

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((apt) => (apt.id === id ? { ...apt, status: newStatus } : apt))
    );
  };

  const filtered = appointments.filter(
    (apt) =>
      apt.patientName.includes(search) ||
      apt.phone.includes(search) ||
      apt.doctorName.includes(search)
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">إدارة حجوزات المواعيد</h1>
            <p className="text-xs text-slate-500 mt-1">
              متابعة جميع طلبات حجز المواعيد القادمة من موقع مجمع القمة الطبي وتأكيدها.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-full">
              إجمالي الحجوزات: {appointments.length}
            </span>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
          <div className="relative flex-grow max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="البحث باسم المريض أو رقم الهاتف أو الطبيب..."
              className="w-full pr-10 pl-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-apex-navy"
            />
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 font-bold">
                <tr>
                  <th className="p-4">رقم الحجز</th>
                  <th className="p-4">اسم المريض</th>
                  <th className="p-4">رقم الهاتف</th>
                  <th className="p-4">التخصص / الطبيب</th>
                  <th className="p-4">التاريخ والوقت</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">إجراءات التغيير</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800 font-medium">
                {filtered.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-apex-navy">{apt.id}</td>
                    <td className="p-4 font-bold">{apt.patientName}</td>
                    <td className="p-4 font-mono">{apt.phone}</td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-900">{apt.doctorName}</div>
                      <div className="text-[10px] text-slate-500">{apt.specialty}</div>
                    </td>
                    <td className="p-4">
                      <div>{apt.date}</div>
                      <div className="text-[10px] text-slate-400">{apt.time}</div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold ${
                          apt.status === "مؤكد"
                            ? "bg-emerald-100 text-emerald-700"
                            : apt.status === "مكتمل"
                            ? "bg-blue-100 text-blue-700"
                            : apt.status === "ملغى"
                            ? "bg-rose-100 text-rose-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateStatus(apt.id, "مؤكد")}
                          className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg text-[10px] font-bold"
                        >
                          تأكيد
                        </button>
                        <button
                          onClick={() => updateStatus(apt.id, "مكتمل")}
                          className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-[10px] font-bold"
                        >
                          إكمال
                        </button>
                        <button
                          onClick={() => updateStatus(apt.id, "ملغى")}
                          className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded-lg text-[10px] font-bold"
                        >
                          إلغاء
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  Users, UserPlus, Shield, ShieldCheck, CheckCircle2, AlertCircle, Trash2, 
  Edit3, Key, Lock, Unlock, Check, X, Award, Stethoscope, UserCheck, Image, CreditCard
} from "lucide-react";

export default function AdminUsersPage() {
  const [employees, setEmployees] = useState([
    {
      id: "EMP-101",
      name: "حسام هابل (المدير العام)",
      email: "admin@srlor.com",
      role: "master_owner",
      roleLabel: "مدير النظام الرئيسي (Master)",
      permissions: { doctors: true, services: true, media: true, subscription: true, users: true },
      status: "active",
      createdAt: "2026-01-10",
    },
    {
      id: "EMP-102",
      name: "د. سارة البوسعيدي",
      email: "sara@apexmedicaloman.com",
      role: "medical_admin",
      roleLabel: "مشرف عيادات وأطباء",
      permissions: { doctors: true, services: true, media: true, subscription: false, users: false },
      status: "active",
      createdAt: "2026-02-01",
    },
    {
      id: "EMP-103",
      name: "أحمد الريامي",
      email: "ahmed@apexmedicaloman.com",
      role: "content_editor",
      roleLabel: "محرر محتوى ووسائط",
      permissions: { doctors: false, services: false, media: true, subscription: false, users: false },
      status: "active",
      createdAt: "2026-02-15",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    roleLabel: "موظف مخصص",
    permissions: { doctors: true, services: true, media: true, subscription: false },
  });

  const [msg, setMsg] = useState({ type: "", text: "" });

  const handleAddEmployee = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMsg({ type: "error", text: "يرجى إدخال اسم الموظف والبريد الإلكتروني." });
      return;
    }

    const newEmp = {
      id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      email: formData.email,
      role: "custom_staff",
      roleLabel: formData.roleLabel,
      permissions: formData.permissions,
      status: "active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setEmployees([...employees, newEmp]);
    setShowModal(false);
    setFormData({ name: "", email: "", roleLabel: "موظف مخصص", permissions: { doctors: true, services: true, media: true, subscription: false } });
    setMsg({ type: "success", text: `تمت إضافة الموظف (${newEmp.name}) وتحديد صلاحياته بنجاح!` });
  };

  const handleTogglePermission = (empId, key) => {
    setEmployees(employees.map(emp => {
      if (emp.id === empId) {
        if (emp.role === "master_owner" && key === "subscription") {
          alert("لا يمكن إلغاء صلاحية الاشتراك لمدير النظام الرئيسي.");
          return emp;
        }
        return {
          ...emp,
          permissions: {
            ...emp.permissions,
            [key]: !emp.permissions[key],
          },
        };
      }
      return emp;
    }));
  };

  const handleDeleteEmployee = (empId) => {
    const emp = employees.find(e => e.id === empId);
    if (emp?.role === "master_owner") {
      alert("لا يمكن حذف حساب مدير النظام الرئيسي (Master Owner).");
      return;
    }
    if (confirm(`هل أنت تأكد من رغبتك في حذف الموظف (${emp?.name})؟`)) {
      setEmployees(employees.filter(e => e.id !== empId));
      setMsg({ type: "success", text: "تم حذف الموظف من المنظومة بنجاح." });
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8 text-slate-900">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-amber-500" />
              <span>إدارة الموظفين وتحديد صلاحيات الأقسام</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold mt-1">
              إضافة وتعيين صلاحيات الموظفين على أجزاء لوحة التحكم مع تقييد خيار الدفع والبطاقات للمدير فقط.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-5 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-2xl shadow-md transition-all hover:scale-105 flex items-center gap-2 self-start md:self-auto"
          >
            <UserPlus className="w-4 h-4 text-slate-950" />
            <span>إضافة موظف جديد وتحديد صلاحياته</span>
          </button>
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

        {/* Security Rule Notice */}
        <div className="bg-slate-900 text-white p-5 rounded-3xl border border-amber-500/40 space-y-2 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-xs space-y-1">
            <h3 className="font-extrabold text-amber-400 text-sm">قانون حماية مفتاح المرور والدفع (Master Passkey Access)</h3>
            <p className="text-slate-300 leading-relaxed font-semibold">
              يستطيع الموظفون الدخول للوحة التحكم وتعديل الأطباء والخدمات والوسائط وفق الصلاحيات المحددة، بينما تظل **خانة الدفع والبطاقات مقفلة ومحمية حصرياً بمفتاح المدير الرئيسي عبر بصمة الإصبع/الوجه (Passkey)**.
            </p>
          </div>
        </div>

        {/* Employees Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-500" />
              <span>قائمة الموظفين ومصفوفة الصلاحيات</span>
            </h2>
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              إجمالي الموظفين: {employees.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-slate-50 text-slate-800 border-b border-slate-200 font-extrabold">
                <tr>
                  <th className="p-3.5">الموظف والبريد</th>
                  <th className="p-3.5">المسمى الوظيفي</th>
                  <th className="p-3.5 text-center">🩺 الأطباء</th>
                  <th className="p-3.5 text-center">🏢 العيادات</th>
                  <th className="p-3.5 text-center">🖼️ الوسائط</th>
                  <th className="p-3.5 text-center">💳 الدفع والبطاقات</th>
                  <th className="p-3.5 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-bold text-slate-900">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 space-y-0.5">
                      <div className="font-extrabold text-slate-900 text-sm">{emp.name}</div>
                      <div className="text-slate-500 font-mono text-[11px] dir-ltr text-right">{emp.email}</div>
                    </td>

                    <td className="p-3.5">
                      <span className={`inline-block px-3 py-1 text-[11px] font-extrabold rounded-lg ${
                        emp.role === "master_owner" 
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-slate-100 text-slate-800 border border-slate-200"
                      }`}>
                        {emp.roleLabel}
                      </span>
                    </td>

                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleTogglePermission(emp.id, "doctors")}
                        className={`p-1.5 rounded-lg border transition-all ${
                          emp.permissions.doctors
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : "bg-rose-50 text-rose-600 border-rose-200"
                        }`}
                      >
                        {emp.permissions.doctors ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>

                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleTogglePermission(emp.id, "services")}
                        className={`p-1.5 rounded-lg border transition-all ${
                          emp.permissions.services
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : "bg-rose-50 text-rose-600 border-rose-200"
                        }`}
                      >
                        {emp.permissions.services ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>

                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleTogglePermission(emp.id, "media")}
                        className={`p-1.5 rounded-lg border transition-all ${
                          emp.permissions.media
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : "bg-rose-50 text-rose-600 border-rose-200"
                        }`}
                      >
                        {emp.permissions.media ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>

                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => handleTogglePermission(emp.id, "subscription")}
                        className={`p-1.5 rounded-lg border transition-all ${
                          emp.permissions.subscription
                            ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                            : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                        }`}
                      >
                        {emp.permissions.subscription ? <Check className="w-4 h-4" /> : <Lock className="w-4 h-4 text-slate-400" />}
                      </button>
                    </td>

                    <td className="p-3.5 text-center">
                      {emp.role !== "master_owner" ? (
                        <button
                          onClick={() => handleDeleteEmployee(emp.id)}
                          className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
                          title="حذف الموظف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <span className="text-[10px] text-amber-700 font-bold bg-amber-50 px-2 py-1 rounded border border-amber-200">
                          مدير النظام 👑
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Employee Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 text-right">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-amber-500" />
                  <span>إضافة موظف جديد وتخصيص الصلاحيات</span>
                </h3>
                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">اسم الموظف *</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: د. محمد الخروصي"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">البريد الإلكتروني للموظف *</label>
                  <input
                    type="email"
                    required
                    placeholder="employee@apexmedicaloman.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 text-left placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    dir="ltr"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-slate-700 mb-1">المسمى الوظيفي</label>
                  <input
                    type="text"
                    placeholder="مثال: مشرف قسم الأسنان والعيادات"
                    value={formData.roleLabel}
                    onChange={(e) => setFormData({ ...formData, roleLabel: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Permissions Toggles */}
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <span className="text-xs font-black text-slate-900 block">تحديد أقسام لوحة التحكم المتاحة للموظف:</span>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                    <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={formData.permissions.doctors}
                        onChange={(e) => setFormData({ ...formData, permissions: { ...formData.permissions, doctors: e.target.checked } })}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                      />
                      <span>🩺 إدارة الأطباء</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={formData.permissions.services}
                        onChange={(e) => setFormData({ ...formData, permissions: { ...formData.permissions, services: e.target.checked } })}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                      />
                      <span>🏢 إدارة العيادات</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-100">
                      <input
                        type="checkbox"
                        checked={formData.permissions.media}
                        onChange={(e) => setFormData({ ...formData, permissions: { ...formData.permissions, media: e.target.checked } })}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                      />
                      <span>🖼️ مكتبة الوسائط</span>
                    </label>

                    <label className="flex items-center gap-2 p-2.5 bg-slate-100 rounded-xl border border-slate-300 text-slate-400 cursor-not-allowed opacity-60">
                      <input
                        type="checkbox"
                        disabled
                        checked={false}
                        className="w-4 h-4 rounded text-slate-400"
                      />
                      <span>🔒 الدفع (حُصري للمدير)</span>
                    </label>
                  </div>
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
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-black text-xs shadow-md"
                  >
                    حفظ وإضافة الموظف
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

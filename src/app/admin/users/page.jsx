"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  Users, UserPlus, Shield, ShieldCheck, CheckCircle2, AlertCircle, Trash2, 
  Edit3, Key, Lock, Unlock, Check, X, Award, Stethoscope, UserCheck, Image, CreditCard,
  MessageSquare, SlidersHorizontal, MapPin, RefreshCw, Search, Eye, EyeOff, Sparkles, Building2, UserX
} from "lucide-react";

const MODULE_DEFINITIONS = [
  { id: "doctors", label: "إدارة الأطباء والكادر الطبي", icon: UserCheck, color: "text-blue-600 bg-blue-50 border-blue-200" },
  { id: "services", label: "إدارة التخصصات والعيادات", icon: Stethoscope, color: "text-purple-600 bg-purple-50 border-purple-200" },
  { id: "footer", label: "إدارة تذييل الموقع والبيانات", icon: SlidersHorizontal, color: "text-amber-600 bg-amber-50 border-amber-200" },
  { id: "chats", label: "سجلات محادثات رين AI", icon: MessageSquare, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { id: "media", label: "مكتبة الوسائط والصور", icon: Image, color: "text-indigo-600 bg-indigo-50 border-indigo-200" },
  { id: "subscription", label: "إدارة الاشتراك والترخيص والبطاقات", icon: CreditCard, color: "text-rose-600 bg-rose-50 border-rose-200" },
  { id: "users", label: "إدارة الموظفين والصلاحيات (RBAC)", icon: Users, color: "text-slate-800 bg-slate-100 border-slate-300" },
];

const ROLE_TEMPLATES = [
  {
    key: "master_owner",
    label: "مدير النظام الرئيسي (Master)",
    description: "صلاحية الوصول والتحكم المطلق بكافة الأقسام والاشتراكات",
    permissions: { doctors: true, services: true, footer: true, chats: true, media: true, subscription: true, users: true },
  },
  {
    key: "medical_supervisor",
    label: "مشرف عيادات وأطباء",
    description: "صلاحية إدارة الأطباء، العيادات، وسجلات محادثات المرضى",
    permissions: { doctors: true, services: true, footer: false, chats: true, media: true, subscription: false, users: false },
  },
  {
    key: "content_editor",
    label: "محرر محتوى ووسائط",
    description: "صلاحية إدارة الصور والتذييل والمحتوى الإعلامي للموقع",
    permissions: { doctors: false, services: false, footer: true, chats: false, media: true, subscription: false, users: false },
  },
  {
    key: "reception_staff",
    label: "موظف استقبال ومتابعة",
    description: "صلاحية متابعة وسجلات محادثات رين AI وحجوزات المواعيد",
    permissions: { doctors: true, services: false, footer: false, chats: true, media: false, subscription: false, users: false },
  },
  {
    key: "custom",
    label: "موظف مخصص الصلاحيات",
    description: "تحديد الصلاحيات بشكل يدوي مفتاحاً بمفتاح حسب الحاجة",
    permissions: { doctors: false, services: false, footer: false, chats: true, media: false, subscription: false, users: false },
  },
];

export default function AdminUsersPage() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranchFilter, setSelectedBranchFilter] = useState("all");

  const [showModal, setShowModal] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "custom",
    roleLabel: "موظف مخصص الصلاحيات",
    branch: "all",
    branchLabel: "جميع الفروع (العذيبة & العامرات)",
    passkey: "",
    permissions: { doctors: true, services: true, footer: false, chats: true, media: true, subscription: false, users: false },
  });

  const [showPasskeyMap, setShowPasskeyMap] = useState({});
  const [msg, setMsg] = useState({ type: "", text: "" });

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setEmployees(data.employees || []);
      }
    } catch (err) {
      console.error("Error fetching employees:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const generatePasskey = () => {
    const randomPass = `apex-${Math.floor(1000 + Math.random() * 9000)}`;
    setFormData((prev) => ({ ...prev, passkey: randomPass }));
  };

  const handleOpenAddModal = () => {
    setEditingEmp(null);
    setFormData({
      name: "",
      email: "",
      role: "custom",
      roleLabel: "موظف مخصص الصلاحيات",
      branch: "all",
      branchLabel: "جميع الفروع (العذيبة & العامرات)",
      passkey: `apex-${Math.floor(1000 + Math.random() * 9000)}`,
      permissions: { doctors: true, services: true, footer: false, chats: true, media: true, subscription: false, users: false },
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (emp) => {
    setEditingEmp(emp);
    setFormData({
      name: emp.name,
      email: emp.email,
      role: emp.role || "custom",
      roleLabel: emp.roleLabel || "موظف مخصص",
      branch: emp.branch || "all",
      branchLabel: emp.branchLabel || "جميع الفروع",
      passkey: emp.passkey || `apex-${Math.floor(1000 + Math.random() * 9000)}`,
      permissions: { ...emp.permissions },
    });
    setShowModal(true);
  };

  const handleSelectRoleTemplate = (templateKey) => {
    const tmpl = ROLE_TEMPLATES.find((t) => t.key === templateKey);
    if (tmpl) {
      setFormData((prev) => ({
        ...prev,
        role: tmpl.key,
        roleLabel: tmpl.label,
        permissions: { ...tmpl.permissions },
      }));
    }
  };

  const handleSaveEmployee = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      setMsg({ type: "error", text: "يرجى إدخال اسم الموظف والبريد الإلكتروني." });
      return;
    }

    const branchLabel =
      formData.branch === "azaiba"
        ? "فرع العذيبة الرئيسي"
        : formData.branch === "amerat"
        ? "فرع العامرات"
        : "جميع الفروع (العذيبة & العامرات)";

    const payload = {
      action: editingEmp ? "update" : "create",
      employee: {
        id: editingEmp?.id,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        roleLabel: formData.roleLabel,
        branch: formData.branch,
        branchLabel,
        passkey: formData.passkey,
        permissions: formData.permissions,
      },
    };

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        setMsg({ type: "success", text: data.message || "تم حفظ بيانات الموظف بنجاح!" });
        setShowModal(false);
        fetchEmployees();
      } else {
        const errData = await res.json();
        setMsg({ type: "error", text: errData.error || "حدث خطأ أثناء حفظ البيانات." });
      }
    } catch (err) {
      console.error("Save employee error:", err);
      setMsg({ type: "error", text: "فشل الاتصال بالخادم." });
    }
  };

  const handleToggleStatus = async (emp) => {
    if (emp.role === "master_owner") {
      alert("لا يمكن تعليق حساب مدير النظام الرئيسي (Master Owner).");
      return;
    }

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "toggle_status", employee: { id: emp.id } }),
      });

      if (res.ok) {
        fetchEmployees();
      } else {
        const errData = await res.json();
        alert(errData.error || "فشل تغيير حالة الحساب");
      }
    } catch (err) {
      console.error("Status error:", err);
    }
  };

  const handleTogglePermissionInline = async (empId, permKey) => {
    const emp = employees.find((e) => e.id === empId);
    if (!emp) return;

    if (emp.role === "master_owner" && permKey === "subscription") {
      alert("لا يمكن إلغاء صلاحية الاشتراك لمدير النظام الرئيسي.");
      return;
    }

    const updatedPermissions = {
      ...emp.permissions,
      [permKey]: !emp.permissions[permKey],
    };

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          employee: { id: empId, permissions: updatedPermissions },
        }),
      });

      if (res.ok) {
        setEmployees(
          employees.map((e) => (e.id === empId ? { ...e, permissions: updatedPermissions } : e))
        );
      }
    } catch (err) {
      console.error("Inline perm toggle error:", err);
    }
  };

  const handleDeleteEmployee = async (empId) => {
    const emp = employees.find((e) => e.id === empId);
    if (emp?.role === "master_owner") {
      alert("لا يمكن حذف حساب مدير النظام الرئيسي (Master Owner).");
      return;
    }

    if (!confirm(`هل أنت تأكد من رغبتك في حذف حساب الموظف (${emp?.name}) نهائياً؟`)) return;

    try {
      const res = await fetch(`/api/admin/users?id=${empId}`, { method: "DELETE" });
      if (res.ok) {
        setEmployees(employees.filter((e) => e.id !== empId));
        setMsg({ type: "success", text: "تم حذف حساب الموظف بنجاح." });
      } else {
        const errData = await res.json();
        alert(errData.error || "فشل حذف الموظف");
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const term = searchTerm.toLowerCase();
    const matchesTerm =
      emp.name?.toLowerCase().includes(term) ||
      emp.email?.toLowerCase().includes(term) ||
      emp.id?.toLowerCase().includes(term) ||
      emp.roleLabel?.toLowerCase().includes(term);

    const matchesBranch =
      selectedBranchFilter === "all" || emp.branch === "all" || emp.branch === selectedBranchFilter;

    return matchesTerm && matchesBranch;
  });

  const activeEmployeesCount = employees.filter((e) => e.status === "active").length;
  const suspendedEmployeesCount = employees.filter((e) => e.status === "suspended").length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-apex-navy text-apex-gold flex items-center justify-center font-extrabold shadow-sm border border-apex-gold/30">
                <ShieldCheck className="w-5 h-5 text-apex-gold" />
              </div>
              <div>
                <h1 className="font-black text-xl text-slate-900">إدارة الموظفين وتحديد صلاحيات الأقسام (RBAC)</h1>
                <p className="text-xs text-slate-500">نظام إدارة الأدوار وتراخيص الوصول لأقسام لوحة التحكم بحسب الفروع والمسمى الوظيفي</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenAddModal}
              className="px-5 py-2.5 bg-apex-navy hover:bg-slate-900 text-apex-gold rounded-xl font-bold text-xs transition-colors flex items-center gap-2 border border-apex-gold/30 cursor-pointer shadow-md"
            >
              <UserPlus className="w-4 h-4 text-apex-gold" />
              <span>إضافة موظف جديد وتحديد صلاحياته</span>
            </button>

            <button
              onClick={fetchEmployees}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors border border-slate-200 cursor-pointer"
              title="تحديث البيانات"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* System Messages */}
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

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">إجمالي الموظفين</p>
              <h3 className="text-2xl font-black text-slate-900">{employees.length} موظف</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">الحسابات النشطة</p>
              <h3 className="text-2xl font-black text-emerald-600">{activeEmployeesCount} مفعل</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">الحسابات المجمدة</p>
              <h3 className="text-2xl font-black text-amber-600">{suspendedEmployeesCount} معلق</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <UserX className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">مديرو النظام (Master)</p>
              <h3 className="text-2xl font-black text-apex-navy">
                {employees.filter((e) => e.role === "master_owner").length} مدير
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-apex-gold/20 text-apex-gold flex items-center justify-center border border-apex-gold/40">
              <Shield className="w-6 h-6 text-slate-900" />
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
              placeholder="البحث باسم الموظف، البريد، الرقم الوظيفي، أو المسمى..."
              className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy font-medium"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 whitespace-nowrap">تصفية الفرع:</span>
            <select
              value={selectedBranchFilter}
              onChange={(e) => setSelectedBranchFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-apex-navy"
            >
              <option value="all">جميع الفروع</option>
              <option value="azaiba">فرع العذيبة الرئيسي</option>
              <option value="amerat">فرع العامرات</option>
            </select>
          </div>
        </div>

        {/* Staff Table / Cards */}
        {loading ? (
          <div className="bg-white p-12 rounded-3xl text-center text-slate-500 border border-slate-200">
            <RefreshCw className="w-8 h-8 text-apex-gold animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold">جاري تحميل بيانات الموظفين والصلاحيات...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEmployees.map((emp) => (
              <div
                key={emp.id}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all space-y-4"
              >
                {/* Employee Top Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-apex-navy text-apex-gold flex items-center justify-center font-black text-base shadow-sm border border-apex-gold/30">
                      {emp.role === "master_owner" ? <Shield className="w-6 h-6 text-apex-gold" /> : <UserCheck className="w-6 h-6 text-apex-gold" />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-extrabold text-base text-slate-900">{emp.name}</h3>
                        <span className="text-[11px] font-bold text-slate-400 dir-ltr">({emp.id})</span>
                        
                        <span
                          className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                            emp.status === "active"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {emp.status === "active" ? "حساب مُفعّل" : "حساب معلّق"}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 flex-wrap font-medium">
                        <span>{emp.email}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-apex-navy font-bold">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{emp.branchLabel || emp.branch}</span>
                        </span>
                        <span>•</span>
                        <span>تاريخ الإضافة: {emp.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions & Passkey Toggle */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* Passkey Reveal */}
                    <div className="bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 flex items-center gap-2 text-xs">
                      <Key className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-mono text-slate-700 font-bold dir-ltr">
                        {showPasskeyMap[emp.id] ? emp.passkey || "غير محدد" : "••••••••"}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setShowPasskeyMap((prev) => ({ ...prev, [emp.id]: !prev[emp.id] }))
                        }
                        className="text-slate-400 hover:text-slate-700"
                        title="إظهار/إخفاء رمز الدخول"
                      >
                        {showPasskeyMap[emp.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>

                    <button
                      onClick={() => handleToggleStatus(emp)}
                      disabled={emp.role === "master_owner"}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-colors cursor-pointer ${
                        emp.status === "active"
                          ? "bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200"
                          : "bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200"
                      } disabled:opacity-40`}
                    >
                      {emp.status === "active" ? "تجميد الحساب" : "إعادة التفعيل"}
                    </button>

                    <button
                      onClick={() => handleOpenEditModal(emp)}
                      className="p-2 text-slate-600 hover:text-apex-navy hover:bg-slate-100 rounded-xl transition-colors cursor-pointer border border-slate-200"
                      title="تعديل الموظف والصلاحيات"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {emp.role !== "master_owner" && (
                      <button
                        onClick={() => handleDeleteEmployee(emp.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer border border-slate-200"
                        title="حذف حساب الموظف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Permissions Matrix Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700">مصفوفة صلاحيات الوصول لأقسام لوحة التحكم:</span>
                    <span className="text-[11px] text-slate-400 font-medium">انقر على أي شارة لتمكين/إلغاء الصلاحية المباشرة</span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {MODULE_DEFINITIONS.map((mod) => {
                      const isAllowed = emp.permissions?.[mod.id];
                      const IconComp = mod.icon;
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => handleTogglePermissionInline(emp.id, mod.id)}
                          className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-all flex items-center gap-1.5 cursor-pointer ${
                            isAllowed
                              ? mod.color
                              : "bg-slate-50 text-slate-400 border-slate-200 line-through opacity-60 hover:opacity-100"
                          }`}
                        >
                          <IconComp className="w-3.5 h-3.5" />
                          <span>{mod.label}</span>
                          {isAllowed ? <Check className="w-3 h-3 text-emerald-600" /> : <X className="w-3 h-3 text-slate-400" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Create / Edit Employee Modal */}
        {showModal && (
          <div className="fixed inset-0 z-[10000] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 text-right">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 space-y-5 max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-apex-navy text-apex-gold flex items-center justify-center font-bold">
                    <UserPlus className="w-5 h-5 text-apex-gold" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {editingEmp ? `تعديل بيانات الموظف (${editingEmp.name})` : "إضافة موظف جديد وتحديد الصلاحيات"}
                    </h3>
                    <p className="text-xs text-slate-500">تخصيص معلومات الدخول والأدوار الوظيفية ومستويات الترخيص</p>
                  </div>
                </div>

                <button onClick={() => setShowModal(false)} className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEmployee} className="space-y-5">
                {/* 1. Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      اسم الموظف الكامل <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="مثال: د. أحمد البوسعيدي"
                      className="w-full px-3.5 py-2.5 bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">
                      البريد الإلكتروني المهني <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="employee@apexmedicaloman.com"
                      className="w-full px-3.5 py-2.5 bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy font-bold dir-ltr text-right"
                    />
                  </div>
                </div>

                {/* 2. Branch & Passkey */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">الفرع المسؤول عنه الموظف:</label>
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-white text-slate-900 border-2 border-slate-300 rounded-xl text-xs font-extrabold outline-none focus:ring-2 focus:ring-apex-navy cursor-pointer"
                    >
                      <option value="all" className="bg-white text-slate-900 font-bold py-2">جميع الفروع (العذيبة & العامرات)</option>
                      <option value="azaiba" className="bg-white text-slate-900 font-bold py-2">فرع العذيبة الرئيسي</option>
                      <option value="amerat" className="bg-white text-slate-900 font-bold py-2">فرع العامرات</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-900 mb-1">رمز الدخول والسر (Employee Passkey):</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formData.passkey}
                        onChange={(e) => setFormData({ ...formData, passkey: e.target.value })}
                        placeholder="رمز الدخول السري..."
                        className="flex-1 px-3.5 py-2.5 bg-white text-slate-900 placeholder-slate-400 border-2 border-slate-300 rounded-xl text-xs font-mono font-bold outline-none focus:ring-2 focus:ring-apex-navy text-left dir-ltr"
                      />
                      <button
                        type="button"
                        onClick={generatePasskey}
                        className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-xl text-xs font-bold border border-slate-300 whitespace-nowrap cursor-pointer"
                      >
                        توليد تلقائي
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Role Templates Selection */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">اختر قالب الدور الوظيفي (Pre-defined Role Template):</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {ROLE_TEMPLATES.map((tmpl) => (
                      <button
                        key={tmpl.key}
                        type="button"
                        onClick={() => handleSelectRoleTemplate(tmpl.key)}
                        className={`p-3 rounded-2xl border text-right transition-all cursor-pointer ${
                          formData.role === tmpl.key
                            ? "bg-apex-navy text-white border-apex-navy shadow-sm"
                            : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                        }`}
                      >
                        <div className="font-bold text-xs mb-0.5">{tmpl.label}</div>
                        <div className={`text-[10px] ${formData.role === tmpl.key ? "text-slate-300" : "text-slate-500"}`}>
                          {tmpl.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Granular Permissions Toggles */}
                <div className="space-y-3 border-t border-slate-100 pt-3">
                  <label className="block text-xs font-bold text-slate-800">
                    تخصيص مفاتيح الصلاحيات يدوياً لأقسام لوحة التحكم (Granular Permissions):
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {MODULE_DEFINITIONS.map((mod) => {
                      const isAllowed = formData.permissions[mod.id];
                      const IconComp = mod.icon;
                      return (
                        <label
                          key={mod.id}
                          className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-colors ${
                            isAllowed ? "bg-emerald-50/60 border-emerald-300 text-emerald-950" : "bg-slate-50 border-slate-200 text-slate-600"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <IconComp className={`w-4 h-4 ${isAllowed ? "text-emerald-600" : "text-slate-400"}`} />
                            <span className="text-xs font-bold">{mod.label}</span>
                          </div>

                          <input
                            type="checkbox"
                            checked={isAllowed}
                            onChange={() =>
                              setFormData({
                                ...formData,
                                permissions: {
                                  ...formData.permissions,
                                  [mod.id]: !formData.permissions[mod.id],
                                },
                              })
                            }
                            className="w-4 h-4 accent-apex-navy rounded cursor-pointer"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Submit Action */}
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
                    {editingEmp ? "حفظ التغييرات التحديثات" : "إضافة الموظف واعتماد الصلاحيات"}
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

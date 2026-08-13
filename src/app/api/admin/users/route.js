import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const usersFilePath = path.join(dataDir, "employees.json");

const initialEmployees = [
  {
    id: "EMP-101",
    name: "حسام هابل (المدير العام)",
    email: "admin@srlor.com",
    role: "master_owner",
    roleLabel: "مدير النظام الرئيسي (Master)",
    branch: "all",
    branchLabel: "جميع الفروع (العذيبة & العامرات)",
    passkey: "apex-master-2026",
    permissions: {
      doctors: true,
      services: true,
      footer: true,
      chats: true,
      media: true,
      subscription: true,
      users: true,
    },
    status: "active",
    lastActive: "الآن",
    createdAt: "2026-01-10",
  },
  {
    id: "EMP-102",
    name: "د. سارة البوسعيدي",
    email: "sara@apexmedicaloman.com",
    role: "medical_supervisor",
    roleLabel: "مشرف عيادات وأطباء",
    branch: "azaiba",
    branchLabel: "فرع العذيبة الرئيسي",
    passkey: "sara-apex-992",
    permissions: {
      doctors: true,
      services: true,
      footer: false,
      chats: true,
      media: true,
      subscription: false,
      users: false,
    },
    status: "active",
    lastActive: "منذ ساعتين",
    createdAt: "2026-02-01",
  },
  {
    id: "EMP-103",
    name: "أحمد الريامي",
    email: "ahmed@apexmedicaloman.com",
    role: "content_editor",
    roleLabel: "محرر محتوى ووسائط",
    branch: "amerat",
    branchLabel: "فرع العامرات",
    passkey: "ahmed-media-331",
    permissions: {
      doctors: false,
      services: false,
      footer: true,
      chats: false,
      media: true,
      subscription: false,
      users: false,
    },
    status: "active",
    lastActive: "أمس",
    createdAt: "2026-02-15",
  },
];

function ensureFileExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(usersFilePath)) {
    fs.writeFileSync(usersFilePath, JSON.stringify(initialEmployees, null, 2), "utf8");
  }
}

function readEmployees() {
  ensureFileExists();
  try {
    const raw = fs.readFileSync(usersFilePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading employees:", err);
    return initialEmployees;
  }
}

function writeEmployees(employees) {
  ensureFileExists();
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(employees, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing employees:", err);
  }
}

export async function GET() {
  const employees = readEmployees();
  return NextResponse.json({ employees });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { action, employee } = body;

    let employees = readEmployees();

    if (action === "create") {
      const newEmp = {
        id: `EMP-${Math.floor(100 + Math.random() * 900)}`,
        name: employee.name,
        email: employee.email,
        role: employee.role || "custom",
        roleLabel: employee.roleLabel || "موظف مخصص",
        branch: employee.branch || "all",
        branchLabel: employee.branchLabel || "جميع الفروع",
        passkey: employee.passkey || `emp-${Math.floor(1000 + Math.random() * 9000)}`,
        permissions: employee.permissions || {
          doctors: false,
          services: false,
          footer: false,
          chats: true,
          media: false,
          subscription: false,
          users: false,
        },
        status: "active",
        lastActive: "غير متاح",
        createdAt: new Date().toISOString().split("T")[0],
      };

      employees.unshift(newEmp);
      writeEmployees(employees);
      return NextResponse.json({ success: true, employee: newEmp, message: "تم إضاف الموظف بنجاح" });
    }

    if (action === "update") {
      const index = employees.findIndex((e) => e.id === employee.id);
      if (index >= 0) {
        employees[index] = { ...employees[index], ...employee };
        writeEmployees(employees);
        return NextResponse.json({ success: true, employee: employees[index], message: "تم تحديث البيانات بنجاح" });
      }
    }

    if (action === "toggle_status") {
      const index = employees.findIndex((e) => e.id === employee.id);
      if (index >= 0) {
        if (employees[index].role === "master_owner") {
          return NextResponse.json({ error: "لا يمكن تعليق حساب مدير النظام الرئيسي" }, { status: 400 });
        }
        employees[index].status = employees[index].status === "active" ? "suspended" : "active";
        writeEmployees(employees);
        return NextResponse.json({ success: true, employee: employees[index] });
      }
    }

    return NextResponse.json({ error: "إجراء غير معروف" }, { status: 400 });
  } catch (err) {
    console.error("POST Admin Users Error:", err);
    return NextResponse.json({ error: "فشل معالجة الطلب" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "معرف الموظف مطلوب" }, { status: 400 });
    }

    let employees = readEmployees();
    const target = employees.find((e) => e.id === id);

    if (target?.role === "master_owner") {
      return NextResponse.json({ error: "لا يمكن حذف حساب مدير النظام الرئيسي (Master Owner)" }, { status: 400 });
    }

    employees = employees.filter((e) => e.id !== id);
    writeEmployees(employees);

    return NextResponse.json({ success: true, message: "تم حذف الموظف بنجاح" });
  } catch (err) {
    console.error("DELETE Admin Users Error:", err);
    return NextResponse.json({ error: "فشل حذف الموظف" }, { status: 500 });
  }
}

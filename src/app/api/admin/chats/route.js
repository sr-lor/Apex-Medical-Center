import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "data");
const chatsFilePath = path.join(dataDir, "chat-logs.json");

function ensureFileExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(chatsFilePath)) {
    fs.writeFileSync(chatsFilePath, JSON.stringify([], null, 2), "utf8");
  }
}

function readChats() {
  ensureFileExists();
  try {
    const raw = fs.readFileSync(chatsFilePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading chat logs:", err);
    return [];
  }
}

function writeChats(chats) {
  ensureFileExists();
  try {
    fs.writeFileSync(chatsFilePath, JSON.stringify(chats, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing chat logs:", err);
  }
}

export async function GET() {
  const chats = readChats();
  return NextResponse.json({ chats });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { userProfile, messages, sessionId } = body;

    if (!sessionId || !messages) {
      return NextResponse.json({ error: "البيانات ناقصة" }, { status: 400 });
    }

    const chats = readChats();
    const existingIndex = chats.findIndex((c) => c.sessionId === sessionId);

    const chatEntry = {
      sessionId: sessionId || `session_${Date.now()}`,
      userProfile: userProfile || { name: "زائر جديد", email: "غير محدد" },
      messages: messages || [],
      updatedAt: new Date().toISOString(),
      createdAt: existingIndex >= 0 ? chats[existingIndex].createdAt : new Date().toISOString(),
    };

    if (existingIndex >= 0) {
      chats[existingIndex] = chatEntry;
    } else {
      chats.unshift(chatEntry);
    }

    writeChats(chats);
    return NextResponse.json({ success: true, chatEntry });
  } catch (err) {
    console.error("POST Admin Chat Error:", err);
    return NextResponse.json({ error: "فشل حفظ المحادثة" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const clearAll = searchParams.get("clearAll");

    if (clearAll === "true") {
      writeChats([]);
      return NextResponse.json({ success: true, message: "تم مسح كافة سجلات المحادثات" });
    }

    if (!sessionId) {
      return NextResponse.json({ error: "معرف الجلسة مطلوب" }, { status: 400 });
    }

    let chats = readChats();
    chats = chats.filter((c) => c.sessionId !== sessionId);
    writeChats(chats);

    return NextResponse.json({ success: true, message: "تم حذف المحادثة بنجاح" });
  } catch (err) {
    console.error("DELETE Admin Chat Error:", err);
    return NextResponse.json({ error: "فشل حذف المحادثة" }, { status: 500 });
  }
}

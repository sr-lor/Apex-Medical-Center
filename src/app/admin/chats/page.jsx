"use client";

import { useState, useEffect } from "react";
import AdminLayout from "@/components/AdminLayout";
import { 
  Sparkles, MessageSquare, Search, Trash2, Calendar, User, Mail, RefreshCw, Eye, X, Download, ShieldCheck, MessageCircle, AlertCircle
} from "lucide-react";

export default function AdminChatsPage() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const fetchChats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/chats");
      if (res.ok) {
        const data = await res.json();
        setChats(data.chats || []);
      }
    } catch (err) {
      console.error("Error fetching chats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  const handleDelete = async (sessionId) => {
    if (!confirm("هل أنت تأكد من رغبتك في حذف هذه المحادثة؟")) return;
    setDeletingId(sessionId);
    try {
      const res = await fetch(`/api/admin/chats?sessionId=${sessionId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setChats((prev) => prev.filter((c) => c.sessionId !== sessionId));
        if (selectedChat?.sessionId === sessionId) {
          setSelectedChat(null);
        }
      }
    } catch (err) {
      console.error("Error deleting chat:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (!confirm("تحذير: هل أنت متاكد من مسح جميع سجلات المحادثات نهائياً؟")) return;
    try {
      const res = await fetch("/api/admin/chats?clearAll=true", {
        method: "DELETE",
      });
      if (res.ok) {
        setChats([]);
        setSelectedChat(null);
      }
    } catch (err) {
      console.error("Error clearing chats:", err);
    }
  };

  const filteredChats = chats.filter((c) => {
    const term = searchTerm.toLowerCase();
    const nameMatch = c.userProfile?.name?.toLowerCase().includes(term);
    const contactMatch = c.userProfile?.contact?.toLowerCase().includes(term);
    const msgMatch = c.messages?.some((m) => m.text?.toLowerCase().includes(term));
    return nameMatch || contactMatch || msgMatch;
  });

  const totalMessagesCount = chats.reduce((acc, c) => acc + (c.messages?.length || 0), 0);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-apex-navy text-apex-gold flex items-center justify-center font-extrabold shadow-sm border border-apex-gold/30">
                <Sparkles className="w-5 h-5 text-apex-gold" />
              </div>
              <div>
                <h1 className="font-black text-xl text-slate-900">سجلات محادثات رين AI</h1>
                <p className="text-xs text-slate-500">استعراض وإدارة جميع استفسارات الزوار والردود المسجلة للذكاء الاصطناعي</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchChats}
              className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 border border-slate-200 cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>تحديث السجلات</span>
            </button>

            {chats.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 border border-rose-200 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
                <span>مسح كل السجلات</span>
              </button>
            )}
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">إجمالي المحادثات المسجلة</p>
              <h3 className="text-2xl font-black text-slate-900">{chats.length} زائر</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">إجمالي الرسائل المتبادلة</p>
              <h3 className="text-2xl font-black text-slate-900">{totalMessagesCount} رسالة</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <MessageCircle className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 font-medium mb-1">حالة نموذج AI</p>
              <h3 className="text-sm font-bold text-emerald-600 flex items-center gap-1.5 mt-1">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <span>رين برو (مُفعّل)</span>
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="البحث بالاسم، البريد الإلكتروني، أو نص المحادثة..."
              className="w-full pr-10 pl-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-navy font-medium"
            />
          </div>
          <div className="text-xs font-bold text-slate-500 whitespace-nowrap">
            عرض {filteredChats.length} من أصل {chats.length} محادثة
          </div>
        </div>

        {/* Chat Logs List */}
        {loading ? (
          <div className="bg-white p-12 rounded-3xl text-center text-slate-500 border border-slate-200">
            <RefreshCw className="w-8 h-8 text-apex-gold animate-spin mx-auto mb-3" />
            <p className="text-sm font-bold">جاري تحميل سجلات المحادثات...</p>
          </div>
        ) : filteredChats.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl text-center text-slate-500 border border-slate-200 space-y-2">
            <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-sm">لا توجد سجلات محادثات حتى الآن</h3>
            <p className="text-xs text-slate-400">ستظهر هنا أي محادثات يجريها زوار الموقع مع رين AI فوراً.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredChats.map((chat) => (
              <div
                key={chat.sessionId}
                className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* User Profile Info */}
                  <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-apex-navy/10 text-apex-navy flex items-center justify-center font-bold text-sm border border-apex-navy/20">
                        <User className="w-5 h-5 text-apex-navy" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-slate-900">{chat.userProfile?.name || "زائر جديد"}</h3>
                        <p className="text-[11px] text-slate-500 font-mono dir-ltr text-right">
                          {chat.userProfile?.contact || "بدون بريد/رقم"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDelete(chat.sessionId)}
                      disabled={deletingId === chat.sessionId}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                      title="حذف المحادثة"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Messages Summary */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-slate-500 text-[11px]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{new Date(chat.updatedAt).toLocaleDateString("ar-EG")}</span>
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded-full font-bold text-slate-700">
                        {chat.messages?.length || 0} رسالة
                      </span>
                    </div>

                    {/* Last Message Preview */}
                    {chat.messages && chat.messages.length > 0 && (
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 text-slate-700 text-[11px] line-clamp-2 leading-relaxed">
                        <span className="font-bold text-apex-navy">آخر رسالة: </span>
                        {chat.messages[chat.messages.length - 1].text}
                      </div>
                    )}
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => setSelectedChat(chat)}
                  className="w-full py-2.5 bg-apex-navy hover:bg-slate-900 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <Eye className="w-4 h-4 text-apex-gold" />
                  <span>عرض السجل الكامل للمحادثة</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Chat Transcript Modal */}
        {selectedChat && (
          <div className="fixed inset-0 z-[10000] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 text-right">
            <div className="bg-white rounded-3xl max-w-2xl w-full h-[650px] max-h-[90vh] shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
              {/* Modal Header */}
              <div className="bg-[#151112] text-white p-4 flex items-center justify-between border-b border-apex-gold/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-apex-gold/20 text-apex-gold flex items-center justify-center font-bold border border-apex-gold/30">
                    <User className="w-5 h-5 text-apex-gold" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">
                      محادثة: {selectedChat.userProfile?.name || "زائر جديد"}
                    </h3>
                    <p className="text-[11px] text-slate-300 dir-ltr text-right">
                      {selectedChat.userProfile?.contact} • {new Date(selectedChat.updatedAt).toLocaleString("ar-EG")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedChat(null)}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-50 text-xs">
                {selectedChat.messages?.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-start gap-2 max-w-[85%]">
                      {msg.sender === "bot" && (
                        <div className="w-7 h-7 rounded-xl bg-apex-navy text-apex-gold flex items-center justify-center flex-shrink-0 border border-apex-gold/30 mt-1">
                          <Sparkles className="w-3.5 h-3.5 text-apex-gold" />
                        </div>
                      )}
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 mb-1 block px-1">
                          {msg.sender === "user" ? selectedChat.userProfile?.name || "الزائر" : "رين AI"}
                        </span>
                        <div
                          className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-xs border ${
                            msg.sender === "user"
                              ? "bg-apex-navy text-white rounded-br-none border-apex-navy"
                              : "bg-white text-slate-800 rounded-bl-none border-slate-200 font-medium"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <span className="text-[10px] text-slate-400 mt-1 block px-1 dir-ltr text-left">
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 bg-white border-t border-slate-200 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium">
                  إجمالي الرسائل: {selectedChat.messages?.length || 0}
                </span>

                <button
                  onClick={() => setSelectedChat(null)}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors"
                >
                  إغلاق النافذة
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

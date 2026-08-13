"use client";

import { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Bot,
  Phone,
  ArrowLeft,
  User,
  Mail,
  RefreshCw,
  Info
} from "lucide-react";
import Link from "next/link";

// Helper function to render text nicely without raw ** markdown symbols
function renderFormattedText(text) {
  if (!text) return null;
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const innerText = part.slice(2, -2);
      return <strong key={index} className="font-extrabold text-amber-200">{innerText}</strong>;
    }
    return part;
  });
}

export default function ReenAIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const messagesEndRef = useRef(null);

  // User Lead Profile (stored in localStorage)
  const [userProfile, setUserProfile] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [contactInput, setContactInput] = useState("");
  const [sessionId, setSessionId] = useState("");

  const [messages, setMessages] = useState([]);

  // Listen for global custom events to open Reen AI with prefilled prompt
  useEffect(() => {
    const handleOpenReenChat = (e) => {
      setIsOpen(true);
      if (e.detail?.prompt) {
        setInputMsg(e.detail.prompt);
      }
    };

    window.addEventListener("open_reen_chat", handleOpenReenChat);
    return () => window.removeEventListener("open_reen_chat", handleOpenReenChat);
  }, []);

  // Load profile & messages from localStorage on mount
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem("apex_reen_user_profile");
      if (savedProfile) {
        setUserProfile(JSON.parse(savedProfile));
      }

      let savedSessionId = localStorage.getItem("apex_reen_session_id");
      if (!savedSessionId) {
        savedSessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        localStorage.setItem("apex_reen_session_id", savedSessionId);
      }
      setSessionId(savedSessionId);

      const savedMsgs = localStorage.getItem("apex_reen_chat_messages");
      if (savedMsgs) {
        setMessages(JSON.parse(savedMsgs));
      } else {
        const initText = savedProfile
          ? `أهلاً وسهلاً بك في مجمع القمة الطبي. 🏛️\n\nأنا **رين AI**، المساعد الذكي المعتمد لإجابة جميع استفساراتك حول خدماتنا وفروعنا (العذيبة والعامرات).`
          : "أهلاً وسهلاً بك في **مجمع القمة الطبي** 🏛️\n\nأنا **رين AI**، المساعد الذكي المعتمد للمجمع. يسعدني إجابة استفساراتك حول خدماتنا التخصصية.";

        setMessages([
          {
            id: 1,
            sender: "bot",
            text: initText,
            isNotice: true,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch (e) {
      console.warn("LocalStorage access warning:", e);
    }
  }, []);

  // Save messages to localStorage and sync to admin endpoint
  const saveAndSyncChat = (updatedMsgs, currentProfile = userProfile) => {
    try {
      localStorage.setItem("apex_reen_chat_messages", JSON.stringify(updatedMsgs));

      if (sessionId && currentProfile) {
        fetch("/api/admin/chats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            userProfile: currentProfile,
            messages: updatedMsgs,
          }),
        }).catch((err) => console.warn("Sync to admin failed:", err));
      }
    } catch (e) {
      console.warn("Storage sync error:", e);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleRegisterProfile = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    
    const finalName = nameInput.trim() || "زائر كريم";
    const profileObj = {
      name: finalName,
      contact: contactInput.trim() || "غير محدد",
      registeredAt: new Date().toISOString(),
    };

    setUserProfile(profileObj);
    localStorage.setItem("apex_reen_user_profile", JSON.stringify(profileObj));

    const welcomeMsgObj = {
      id: Date.now(),
      sender: "bot",
      text: `أهلاً وسهلاً بك ${finalName !== "زائر كريم" ? `أستاذ/أستاذة **${finalName}**` : ""} في مجمع القمة الطبي! ✨\n\nأنا **رين AI** المساعد الذكي المعتمد للمجمع. كيف يمكنني مساعدتك اليوم؟`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMsgs = [welcomeMsgObj];
    setMessages(newMsgs);
    saveAndSyncChat(newMsgs, profileObj);
  };

  const handleClearChat = () => {
    try {
      localStorage.removeItem("apex_reen_chat_messages");
      const resetMsg = [
        {
          id: Date.now(),
          sender: "bot",
          text: `تم بدء محادثة رسمية جديدة مع **رين AI** ✨\nيسعدني استقبال استفساراتك الخدمية والطبيّة العامة.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ];
      setMessages(resetMsg);
      saveAndSyncChat(resetMsg);
    } catch (e) {
      console.warn("Error clearing chat:", e);
    }
  };

  const handleSend = async (customText = null) => {
    const query = (customText || inputMsg).trim();
    if (!query) return;

    const userMsgObj = {
      id: Date.now(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMsgObj];
    setMessages(updatedMessages);
    if (!customText) setInputMsg("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: updatedMessages.slice(-6).map((m) => ({ sender: m.sender, text: m.text })),
          userProfile,
          sessionId,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const botMsgObj = {
          id: Date.now() + 1,
          sender: "bot",
          text: data.reply || "شكراً لتواصلك مع رين AI المساعد الذكي لمجمع القمة الطبي.",
          ctaAction: data.ctaAction || null,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        const finalMsgs = [...updatedMessages, botMsgObj];
        setMessages(finalMsgs);
        saveAndSyncChat(finalMsgs);
      } else {
        throw new Error("فشل الاتصال بمركز الذكاء الاصطناعي");
      }
    } catch (err) {
      console.warn("Falling back to fallback engine:", err);
      let botResponse = generateAIResponse(query);
      const finalMsgs = [...updatedMessages, botResponse];
      setMessages(finalMsgs);
      saveAndSyncChat(finalMsgs);
    } finally {
      setIsTyping(false);
    }
  };

  const generateAIResponse = (text) => {
    const q = text.toLowerCase();
    let responseText = "";
    let ctaAction = null;

    const isMedicalQuery =
      q.includes("ألم") || q.includes("الم") || q.includes("وجع") || q.includes("صداع") ||
      q.includes("علاج") || q.includes("دواء") || q.includes("أعراض") || q.includes("اعراض") ||
      q.includes("استشارة") || q.includes("تشخيص") || q.includes("أعاني") || q.includes("اعاني");

    if (isMedicalQuery) {
      responseText = `أهلاً بك. حرصاً منا على صحتك وسلامتك:\n\n• نقدم لك إرشادات أولية عامة لتوعيتك.\n• يُحظر تناول أي عقاقير طبية دون فحص إكلينيكي معلوم.\n\n⚠️ **تنبيه طبي هام جداً:**\nالمعلومات المقدمة من الذكاء الاصطناعي هي للتوعية العامة فقط ولا تُعتبر تشخيصاً طبياً أو استشارة صحية نهائية. لا بد من معاينة حالتك مباشرة من قِبل **طبيب حقيقي متخصص** في مجمع القمة الطبي.\n\n📞 **لطلب كشف طبي مباشر واستشارة أطبائنا:**\n• هاتف / واتساب المجمع: **+968 97031500**`;
      ctaAction = { type: "book", text: "التواصل والحجز مع طبيب متخصص عبر الواتساب" };
    } else if (q.includes("عامرات") || q.includes("العامرات")) {
      responseText =
        "✨ **خدمات فرع العامرات الرسمية:**\n\n" +
        "• **قسم السمنة وحقن إنقاص الوزن:** برامج مونجارو (Mounjaro®) وأوزمبيك برعاية طبيبة.\n" +
        "• **الجلدية والليزر:** إزالة الشعر وتجديد نضارة البشرة.\n" +
        "• **الطب العام:** فحوصات شاملة ورعاية صحية أولية.\n\n" +
        "📍 العنوان: العامرات - الشارع العام الرئيسي.";
      ctaAction = { type: "branch_link", href: "/services?branch=amerat", text: "تصفح خدمات فرع العامرات" };
    } else if (q.includes("عذيبة") || q.includes("العذيبة")) {
      responseText =
        "🏢 **خدمات فرع العذيبة الرئيسي:**\n\n" +
        "• **طب وتجميل الأسنان:** ابتسامة هوليود الرقمية، الزراعة، والتقويم.\n" +
        "• **الجراحة التجميلية:** تنسيق القوام ونحت الجسم.\n" +
        "• **الأمراض الجلدية:** الفحوصات والعلاج بالليزر.\n" +
        "• **جراحة العظام والمفاصل:** الفحص والمناظير.\n" +
        "• **الطب والتجميل النسائي**.\n" +
        "• **جراحات وتكميم المعدة والتخسيس**.\n\n" +
        "📍 العنوان: العذيبة - شارع السلطان قابوس.";
      ctaAction = { type: "branch_link", href: "/services?branch=azaiba", text: "تصفح خدمات فرع العذيبة" };
    } else if (q.includes("سمنة") || q.includes("حقن") || q.includes("مونجارو") || q.includes("تخسيس")) {
      responseText =
        "💉 **عيادة السمنة وحقن إنقاص الوزن:**\n\n" +
        "• علاج وتخسيس باستخدام **Mounjaro®** و **Ozempic®** ببروتوكول طبي آمن.\n" +
        "• متابعة المؤشرات الحيوية والتغذية.\n" +
        "• بالون وتكميم المعدة بالمنظار.\n\n" +
        "⚠️ ينبغي الخضوع لتقييم الطبيب قبل البدء بأي برنامج.";
      ctaAction = { type: "book", text: "حجز موعد بعيادة السمنة والتخسيس" };
    } else if (q.includes("اسنان") || q.includes("أسنان") || q.includes("هوليود")) {
      responseText =
        "🦷 **قسم طب وتجميل الأسنان المتقدم:**\n\n" +
        "• تصميم ابتسامة هوليود الرقمية (Veneers / E-max)\n" +
        "• زراعة الأسنان الفورية وتغطية الفراغات\n" +
        "• التقويم الشفاف غير المرئي\n" +
        "• علاج العصب والجذور بالليزر";
      ctaAction = { type: "book", text: "حجز موعد بعيادة الأسنان" };
    } else if (q.includes("طبيب") || q.includes("حجز") || q.includes("دكتور")) {
      responseText =
        "🩺 **حجز استشارة مع طبيب متخصص:**\n\n" +
        "لضمان تشخيص دقيق وخطة علاجية آمنة، نرحب بك بالحجز المباشر لدى كادرنا الطبي في مجمع القمة الطبي.\n\n" +
        "📞 **للتواصل وحجز الموعد مباشرة:**\n" +
        "• هاتف / واتساب المجمع: **+968 97031500**";
      ctaAction = { type: "book", text: "حجز موعدك الآن مع الطبيب عبر الواتساب" };
    } else {
      responseText =
        `أهلاً وسهلاً بك في **مجمع القمة الطبي**! 🌟\n\nيسعدني إجابة استفساراتك الرسمية عن الفروع والخدمات الطبية والتجميلية.`;
    }

    return {
      id: Date.now(),
      sender: "bot",
      text: responseText,
      ctaAction,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] text-right font-sans pointer-events-auto select-none">
      {/* Floating Trigger Badge Button */}
      {!isOpen && (
        <div className="relative group flex items-center justify-end">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="h-14 px-5 rounded-full bg-[#151112] hover:bg-slate-900 text-white shadow-[0_10px_35px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-105 flex items-center gap-3 border-2 border-apex-gold/70 cursor-pointer relative overflow-hidden group"
            aria-label="محادثة رين AI المساعد الذكي"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-apex-gold/20 via-amber-500/20 to-apex-gold/20 animate-pulse pointer-events-none"></div>

            <div className="relative flex items-center justify-center">
              <span className="animate-ping absolute inline-flex h-4 w-4 rounded-full bg-emerald-400 opacity-75"></span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-apex-gold via-amber-300 to-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md border border-white/20">
                <Bot className="w-5 h-5 text-slate-950" />
              </div>
            </div>

            <div className="flex flex-col text-right">
              <span className="text-xs font-black text-apex-gold leading-tight flex items-center gap-1.5">
                رين AI <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow inline-block" />
              </span>
              <span className="text-[10px] text-slate-300 font-medium">المساعد الذكي (متصل الآن)</span>
            </div>
          </button>
        </div>
      )}

      {/* Floating Modern Luxury Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-2 bottom-2 sm:bottom-6 sm:right-6 sm:left-auto w-auto sm:w-[420px] h-[85vh] sm:h-[630px] max-h-[92vh] bg-slate-900/98 backdrop-blur-xl rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.7)] border-2 border-apex-gold/60 flex flex-col overflow-hidden animate-fade-in text-right transition-all z-[99999]">
          
          {/* Top Luxury Header Bar */}
          <div className="bg-[#120F10] text-white px-4 py-3.5 flex items-center justify-between border-b border-apex-gold/30 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-apex-gold via-amber-400 to-apex-gold-dark text-slate-950 flex items-center justify-center font-extrabold shadow-md border border-apex-gold/50">
                  <Bot className="w-6 h-6 text-slate-950" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#120F10]"></span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-sm text-white tracking-wide">رين AI</h3>
                </div>
                <p className="text-[10px] text-amber-200/80">مجمع القمة الطبي • سلطنة عمان</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                title="شروط الاستخدام والتنبيه الطبي"
                className="p-2 text-slate-400 hover:text-apex-gold hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <Info className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleClearChat}
                title="بدء محادثة جديدة"
                className="p-2 text-slate-400 hover:text-apex-gold hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="إغلاق المحادثة"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Area: Registration Form OR Active Chat */}
          {!userProfile ? (
            /* Lead Registration Form */
            <div className="flex-1 p-6 bg-gradient-to-b from-[#181415] to-[#110D0E] flex flex-col justify-between overflow-y-auto text-white">
              <div className="space-y-4 my-auto">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-apex-gold/20 via-amber-400/20 to-transparent text-apex-gold flex items-center justify-center border border-apex-gold/40 mx-auto shadow-inner">
                  <Sparkles className="w-7 h-7 text-apex-gold" />
                </div>
                <div className="text-center space-y-1.5">
                  <h4 className="font-black text-white text-base">مرحباً بك في رين AI ✨</h4>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xs mx-auto font-light">
                    المساعد الذكي الافتراضي المعتمد لمجمع القمة الطبي. يرجى إدخال معلوماتك البسيطة لبدء الاستفسارات وحجز المواعيد.
                  </p>
                </div>

                <form onSubmit={handleRegisterProfile} className="space-y-3.5 pt-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-200 mb-1">
                      الاسم الكريم <span className="text-slate-400 font-normal">(اختياري)</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                      <input
                        type="text"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="أدخل اسمك الكامل (اختياري)..."
                        className="w-full pr-9 pl-3 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-gold font-medium text-white placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-200 mb-1">
                      رقم الواتساب أو البريد الإلكتروني <span className="text-slate-400 font-normal">(اختياري)</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
                      <input
                        type="text"
                        value={contactInput}
                        onChange={(e) => setContactInput(e.target.value)}
                        placeholder="رقم التواصل للحجز..."
                        className="w-full pr-9 pl-3 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs outline-none focus:ring-2 focus:ring-apex-gold font-medium text-white placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-apex-gold via-amber-400 to-apex-gold-dark text-slate-950 font-black text-xs rounded-xl transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-2 border border-apex-gold cursor-pointer"
                  >
                    <span>بدء المحادثة الرسمية</span>
                    <ArrowLeft className="w-4 h-4 text-slate-950" />
                  </button>
                </form>
              </div>

              {/* Privacy Footer Disclaimer */}
              <div className="pt-3 border-t border-white/10 text-center text-[10px] text-slate-400 leading-normal shrink-0">
                <p>🔒 المحادثات مخصصة للتوجيه الخدمي والتنظيمي العام.</p>
                <button
                  type="button"
                  onClick={() => setShowTermsModal(true)}
                  className="text-apex-gold font-bold underline hover:text-amber-300 mt-1 inline-block cursor-pointer"
                >
                  شروط الاستخدام والتنبيه الطبي
                </button>
              </div>
            </div>
          ) : (
            /* Active Chat Messages Screen */
            <div className="flex-1 flex flex-col min-h-0 bg-[#161214]">
              {/* Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div className="flex items-end gap-2 max-w-[92%]">
                      {msg.sender === "bot" && (
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-apex-gold to-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 border border-amber-300 mb-1 shadow-md">
                          <Bot className="w-4.5 h-4.5 text-slate-950" />
                        </div>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-md border ${
                          msg.sender === "user"
                            ? "bg-gradient-to-r from-apex-gold via-amber-400 to-amber-500 text-slate-950 font-bold rounded-br-none border-apex-gold"
                            : "bg-[#211B1D] text-slate-100 rounded-bl-none border-white/10 font-normal"
                        }`}
                      >
                        {renderFormattedText(msg.text)}

                        {/* Direct CTA Action Button */}
                        {msg.ctaAction && (
                          <div className="mt-3 pt-2.5 border-t border-white/15">
                            {msg.ctaAction.type === "book" ? (
                              <a
                                href="https://wa.me/96897031500?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D9%85%D8%AC%D9%85%D8%B9%20%D8%A7%D9%84%D9%82%D9%85%D8%A9%20%D8%A7%D9%84%D8%B7%D8%A8%D9%8A"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 px-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl font-extrabold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-emerald-400/40"
                              >
                                <Phone className="w-4 h-4" />
                                <span>{msg.ctaAction.text || "حجز استشارة مع طبيب عبر الواتساب (+968 97031500)"}</span>
                              </a>
                            ) : (
                              <Link
                                href={msg.ctaAction.href}
                                onClick={() => setIsOpen(false)}
                                className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-apex-gold rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-apex-gold/40"
                              >
                                <span>{msg.ctaAction.text}</span>
                                <ArrowLeft className="w-3.5 h-3.5" />
                              </Link>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {/* Animated Typing Indicator */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-amber-200 text-xs font-semibold pt-1">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-apex-gold to-amber-400 text-slate-950 flex items-center justify-center flex-shrink-0 border border-amber-300">
                      <Sparkles className="w-4 h-4 text-slate-950 animate-spin-slow" />
                    </div>
                    <div className="bg-[#211B1D] px-4 py-2 rounded-2xl border border-white/10 shadow-sm flex items-center gap-1.5 text-slate-200">
                      <span className="animate-bounce font-black text-apex-gold text-base leading-none">.</span>
                      <span className="animate-bounce delay-100 font-black text-apex-gold text-base leading-none">.</span>
                      <span className="animate-bounce delay-200 font-black text-apex-gold text-base leading-none">.</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Message Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="p-3 bg-[#181415] border-t border-apex-gold/30 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="اكتب استفسارك الرسمي لـ رين AI هنا..."
                  className="flex-1 px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs focus:ring-2 focus:ring-apex-gold focus:bg-white/15 outline-none font-medium text-white placeholder-slate-400"
                />
                <button
                  type="submit"
                  disabled={!inputMsg.trim()}
                  className="p-2.5 bg-gradient-to-r from-apex-gold to-amber-400 hover:from-amber-400 hover:to-apex-gold text-slate-950 rounded-xl transition-all disabled:opacity-40 flex-shrink-0 border border-amber-300 cursor-pointer shadow-md font-bold"
                  aria-label="إرسال الرسالة"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Terms of Use & Strict Medical Disclaimer Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 z-[10000] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 text-right">
          <div className="bg-[#181415] text-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border-2 border-apex-gold/50 space-y-4 max-h-[88vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div className="flex items-center gap-2.5 text-apex-gold">
                <ShieldAlert className="w-6 h-6 text-apex-gold" />
                <div>
                  <h3 className="font-extrabold text-sm text-white">شروط الاستخدام والتنبيه الطبي القانوني</h3>
                  <p className="text-[10px] text-slate-400">المساعد الذكي (رين AI) - مجمع القمة الطبي</p>
                </div>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Detailed Content */}
            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              
              {/* Highlighted Warning Box */}
              <div className="bg-amber-500/15 border-2 border-amber-500/40 p-4 rounded-2xl text-amber-200 text-xs font-medium space-y-1.5 shadow-inner">
                <div className="flex items-center gap-2 font-black text-amber-300 text-xs">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>تنبيه طبي صارم وإخلاء مسؤولية قانوني:</span>
                </div>
                <p className="leading-relaxed text-[11.5px]">
                  نظام **رين AI** أداة مساعدة قائمة على الذكاء الاصطناعي مخصصة فقط لتوفير المعلومات الخدمية، التنظيمية، والمواعيد بمجمع القمة الطبي. **الذكاء الاصطناعي لا يقدم استشارات طبية ولا يُعد بديلاً عن الطبيب البشري المعتمد.**
                </p>
              </div>

              {/* Detailed Points */}
              <div className="space-y-3 pt-1">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <h4 className="font-bold text-apex-gold text-xs flex items-center gap-1.5">
                    <Stethoscope className="w-4 h-4 text-apex-gold" /> 1. ضرورة التواصل والفحص لدى طبيب حقيقي
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    أي تقييم للأعراض، الأمراض، أو الخطط العلاجية يستدعي إجراء فحص سريري مباشر واختبارات معملية تحت إشراف أطبائنا المتخصصين المعتمدين في مجمع القمة الطبي. لا تعتمد مطلقاً على إجابات الذكاء الاصطناعي للتشخيص أو صرف العلاج.
                  </p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <h4 className="font-bold text-apex-gold text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-apex-gold" /> 2. إرشادات وتوعية صحية عامة فقط
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    الإجابات الصادرة حول التخصصات أو الجراحات التجميلية أو عيادات الأسنان وحقن التخسيس هي لأغراض التوعية العامة فقط، ولا تُعتبر توصية طبية ملزمة أو خطة علاجية مخصصة لواقعك الصحي.
                  </p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <h4 className="font-bold text-amber-400 text-xs flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" /> 3. حالات الطوارئ والحالات الحادة
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    في حال مواجهة آلام حادة، أعراض طارئة، أو نزيف، يُحظر استخدام المساعد الافتراضي، ويجب التوجه فوراً لأقرب قسم طوارئ في مستشفى حكومي أو الاتصال بالإسعاف.
                  </p>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/10 space-y-1">
                  <h4 className="font-bold text-apex-gold text-xs flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-apex-gold" /> 4. التواصل الهاتفي وحجز الاستشارات المباشرة
                  </h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    لحجز موعد استشارة طبية مع أطبائنا في فرعي العذيبة والعامرات، يسعدنا تواصلكم الهاتفي أو عبر الواتساب المباشر: **+968 97031500**.
                  </p>
                </div>
              </div>

            </div>

            {/* Accept Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowTermsModal(false)}
                className="w-full py-3 bg-gradient-to-r from-apex-gold via-amber-400 to-apex-gold-dark text-slate-950 font-black text-xs rounded-xl shadow-xl hover:shadow-2xl cursor-pointer border border-amber-300"
              >
                قرأت الشروط والتعليمات وأوافق عليها
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

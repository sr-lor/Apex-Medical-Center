"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, MessageSquare, X, Send, User, Bot, CheckCircle2, Calendar, MapPin, Phone, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function ReenAIChat({ onOpenBooking }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "أهلاً بك في مجمع القمة الطبي! 👋\nأنا **رين AI**، مساعدك الطبي الذكي. يسعدني إجابة استفساراتك حول الفروع (العذيبة والعامرات)، الخدمات الطبية والتجميلية، وحجز المواعيد.",
      quickReplies: [
        { label: "📍 عيادات فرع العامرات", action: "amerat_services" },
        { label: "🏢 عيادات فرع العذيبة", action: "azaiba_services" },
        { label: "📅 حجز موعد استشارة", action: "book_now" },
        { label: "💉 حقن إنقاص الوزن والتخسيس", action: "weight_injections" },
        { label: "🦷 زراعة وابتسامة الأسنان", action: "dentistry_info" },
        { label: "📞 أوقات العمل ورقم التواصل", action: "contact_info" },
      ],
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const handleSend = (customText = null, actionKey = null) => {
    const query = (customText || inputMsg).trim();
    if (!query && !actionKey) return;

    // Add user message
    const userMsgObj = {
      id: Date.now(),
      sender: "user",
      text: query || (actionKey === "amerat_services" ? "ما هي خدمات فرع العامرات؟" : "استفسار"),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsgObj]);
    if (!customText) setInputMsg("");
    setIsTyping(true);

    // AI Response generation delay
    setTimeout(() => {
      let botResponse = generateAIResponse(query, actionKey);
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
  };

  const generateAIResponse = (text, actionKey) => {
    const q = text.toLowerCase();

    let responseText = "";
    let ctaAction = null;
    let quickReplies = [
      { label: "📅 حجز موعد أونلاين", action: "book_now" },
      { label: "📍 استكشاف فرع العامرات", action: "amerat_services" },
      { label: "📞 أرقام التواصل", action: "contact_info" },
    ];

    if (actionKey === "amerat_services" || q.includes("عامرات") || q.includes("العامرات")) {
      responseText =
        "✨ **خدمات وعيادات فرع العامرات لمجمع القمة الطبي:**\n\n" +
        "1. **عيادة سمنة (إدارة الوزن):** حلول متقدمة لتخسيس الوزن، متابعة التغذية، وحقن التخسيس المعتمدة (مونجارو وأوزمبيك).\n" +
        "2. **عيادة ليزر والبشرة:** أحدث جلسات إزالة الشعر بالليزر المزدوج وتجديد نضارة البشرة.\n" +
        "3. **عيادة طب عام:** فحوصات روتينية، تشخيص دقيق، ورعاية متكاملة لجميع الفئات العمرية.\n\n" +
        "💡 *تنويه: كادر الأطباء بفرع العامرات قيد التحديث وسيتم إضافتهم قريباً جداً إلى المنصة.*";
      ctaAction = { type: "branch_link", href: "/services?branch=amerat", text: "تصفح خدمات فرع العامرات" };
    } else if (actionKey === "azaiba_services" || q.includes("عذيبة") || q.includes("العذيبة") || q.includes("الرئيسي")) {
      responseText =
        "🏢 **خدمات فرع العذيبة:**\n\n" +
        "يضم فرع العذيبة جميع التخصصات الاستشارية:\n" +
        "• طب وتجميل الأسنان وابتسامة هوليود الرقمية\n" +
        "• الجراحة التجميلية وتنسيق القوام بالفيزر\n" +
        "• طب الأمراض الجلدية والعناية بالبشرة\n" +
        "• جراحة العظام والمفاصل والمناظير\n" +
        "• الطب والتجميل النسائي والرعاية الخاصة\n" +
        "• جراحات وتكميم المعدة والتخسيس";
      ctaAction = { type: "branch_link", href: "/services?branch=azaiba", text: "تصفح خدمات فرع العذيبة" };
    } else if (actionKey === "weight_injections" || q.includes("سمنة") || q.includes("حقن") || q.includes("مونجارو") || q.includes("اوزمبيك") || q.includes("تخسيس")) {
      responseText =
        "💉 **قسم إدارة السمنة وحقن إنقاص الوزن الطبية:**\n\n" +
        "نوفر في مجمع القمة الطبي برامج متكاملة لإنقاص الوزن تحت إشراف أطباء واستشاريين متخصصين:\n" +
        "• حقن **Mounjaro® (مونجارو)** المعتمدة عالمياً\n" +
        "• حقن **Ozempic® (أوزمبيك)** و **Saxenda®**\n" +
        "• تقييم طبي كامل ومتابعة غذائية دورية مع أخصائي التغذية\n" +
        "• إجراءات بالون المعدة وتكميم المعدة بالمنظار";
      ctaAction = { type: "book", text: "حجز استشارة عيادة السمنة" };
    } else if (actionKey === "dentistry_info" || q.includes("اسنان") || q.includes("أسنان") || q.includes("هوليود") || q.includes("زراعة") || q.includes("تقويم")) {
      responseText =
        "🦷 **قسم طب وتجميل الأسنان بمجمع القمة الطبي:**\n\n" +
        "• تصميم ابتسامة هوليود الرقمية (Veneers & E-max)\n" +
        "• زراعة الأسنان الفورية بأحدث التقنيات الرقمية الموجهة\n" +
        "• التقويم الشفاف غير المرئي (Clear Aligners)\n" +
        "• سحب وعلاج العصب تحت المجهر في جلسة واحدة بدون ألم\n" +
        "• تبييض الأسنان بالليزر الآمن والفعال";
      ctaAction = { type: "book", text: "حجز موعد عيادة الأسنان" };
    } else if (actionKey === "contact_info" || q.includes("تواصل") || q.includes("رقم") || q.includes("وقت") || q.includes("عنوان") || q.includes("موقع")) {
      responseText =
        "📞 **معلومات التواصل وأوقات العمل بمجمع القمة الطبي:**\n\n" +
        "• **الهاتف والواتساب المباشر:** `+968 97031500`\n" +
        "• **البريد الإلكتروني:** `info@apexmedicaloman.com`\n" +
        "• **ساعات العمل:** من السبت إلى الخميس: 09:00 صباحاً - 09:00 مساءً (الجمعة عطلة أسبوعية)\n" +
        "• **فرع العذيبة:** مسقط - العذيبة - شارع السلطان قابوس\n" +
        "• **فرع العامرات:** مسقط - العامرات - الشارع العام";
      ctaAction = { type: "link", href: "/contact", text: "الانتقال لصفحة اتصل بنا ومواقع الفروع" };
    } else if (actionKey === "book_now" || q.includes("حجز") || q.includes("موعد") || q.includes("استشارة")) {
      responseText =
        "📅 **حجز موعد أونلاين في مجمع القمة الطبي:**\n\n" +
        "يمكنك اختيار الفرع والتخصص والتاريخ المناسب لزيارتك بسهولة. اضغط على الزر أدناه للبدء بالحجز المباشر فوراً.";
      ctaAction = { type: "book", text: "فتح نافذة الحجز المباشر الآن ⚡" };
    } else {
      responseText =
        "شكراً لتواصلك مع **رين AI**! 🌟\n" +
        "نحن يسعدنا تقديم أفضل رعاية طبية وتجميلية في سلطنة عمان. يمكنك اختيار أحد الاستفسارات الشائعة أدناه أو تحديد الفرع والتخصص المطلوب حجز موعد فيه.";
      ctaAction = { type: "book", text: "حجز موعد استشارة فورية" };
    }

    return {
      id: Date.now(),
      sender: "bot",
      text: responseText,
      ctaAction,
      quickReplies,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 text-right font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <div className="relative group">
          <button
            onClick={() => setIsOpen(true)}
            className="w-12 h-12 rounded-full bg-[#151112] hover:bg-slate-900 text-white shadow-2xl transition-transform duration-300 hover:scale-110 flex items-center justify-center border-2 border-apex-gold/40 relative overflow-hidden"
            aria-label="تحدث مع رين AI"
          >
            {/* Glowing Aura Ring */}
            <div className="absolute inset-0 bg-gradient-to-r from-apex-gold/20 via-amber-500/20 to-apex-gold/20 animate-pulse pointer-events-none"></div>

            {/* Status Indicator */}
            <span className="absolute top-1 right-1 flex h-2.5 w-2.5 z-10">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>

            <Sparkles className="w-5 h-5 text-apex-gold animate-spin-slow" />
          </button>

          {/* Tooltip on Hover */}
          <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block bg-[#151112] text-white text-[11px] font-bold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap border border-apex-gold/30 pointer-events-none">
            رين AI - المساعد الطبي الذكي ✨
          </div>
        </div>
      )}

      {/* Reen AI Floating Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[410px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-apex-gold/30 flex flex-col overflow-hidden animate-fade-in text-right">
          
          {/* Header */}
          <div className="bg-[#151112] text-white p-4 flex items-center justify-between border-b border-apex-gold/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-apex-gold to-apex-gold-dark text-slate-950 flex items-center justify-center font-extrabold shadow-md border border-apex-gold/40">
                  <Bot className="w-6 h-6 text-slate-950" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#151112]"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-extrabold text-sm text-white">رين AI</h3>
                  <span className="bg-apex-gold/20 text-apex-gold text-[10px] px-2 py-0.5 rounded-full border border-apex-gold/30 font-bold">
                    ذكاء طبي
                  </span>
                </div>
                <p className="text-[11px] text-slate-300">مجمع القمة الطبي (العذيبة & العامرات)</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div className="flex items-end gap-2 max-w-[88%]">
                  {msg.sender === "bot" && (
                    <div className="w-7 h-7 rounded-xl bg-apex-navy text-apex-gold flex items-center justify-center flex-shrink-0 border border-apex-gold/30 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-apex-gold" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl leading-relaxed whitespace-pre-line shadow-sm border ${
                      msg.sender === "user"
                        ? "bg-apex-navy text-white rounded-br-none border-apex-navy"
                        : "bg-white text-slate-800 rounded-bl-none border-slate-200/80 font-medium"
                    }`}
                  >
                    {msg.text}

                    {/* CTA inside Bot message */}
                    {msg.ctaAction && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100">
                        {msg.ctaAction.type === "book" ? (
                          <button
                            onClick={() => {
                              onOpenBooking();
                              setIsOpen(false);
                            }}
                            className="w-full py-2 px-3 bg-gradient-to-r from-apex-gold to-apex-gold-dark text-slate-950 rounded-xl font-extrabold text-xs shadow-sm hover:shadow transition-all flex items-center justify-center gap-1.5"
                          >
                            <Calendar className="w-3.5 h-3.5 text-slate-950" />
                            <span>{msg.ctaAction.text}</span>
                          </button>
                        ) : (
                          <Link
                            href={msg.ctaAction.href}
                            onClick={() => setIsOpen(false)}
                            className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-apex-navy rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-200"
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

                {/* Quick Reply Chips below bot message if available */}
                {msg.quickReplies && (
                  <div className="flex items-center gap-1.5 flex-wrap mt-3 max-w-[95%]">
                    {msg.quickReplies.map((qr, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSend(qr.label, qr.action)}
                        className="bg-white hover:bg-apex-gold-light/60 hover:border-apex-gold/50 text-slate-700 hover:text-slate-900 border border-slate-200 text-[11px] font-bold px-3 py-1.5 rounded-xl transition-all shadow-2xs"
                      >
                        {qr.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold pt-1">
                <div className="w-7 h-7 rounded-xl bg-apex-navy text-apex-gold flex items-center justify-center flex-shrink-0 border border-apex-gold/30">
                  <Sparkles className="w-3.5 h-3.5 text-apex-gold animate-spin-slow" />
                </div>
                <div className="bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1">
                  <span>رين AI يكتب الآن</span>
                  <span className="animate-bounce font-bold text-apex-gold">.</span>
                  <span className="animate-bounce delay-100 font-bold text-apex-gold">.</span>
                  <span className="animate-bounce delay-200 font-bold text-apex-gold">.</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="اكتب استفسارك لـ رين AI هنا..."
              className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-apex-navy focus:bg-white outline-none font-medium text-slate-800"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim()}
              className="p-2.5 bg-apex-navy hover:bg-slate-900 text-apex-gold rounded-xl transition-all disabled:opacity-50 flex-shrink-0 border border-apex-gold/30"
              aria-label="إرسال"
            >
              <Send className="w-4 h-4 text-apex-gold" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}

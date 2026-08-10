"use client";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { initialBranches } from "@/lib/data-store";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState("azaiba");
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const activeBranch = initialBranches.find((b) => b.id === selectedBranchId) || initialBranches[0];

  return (
    <div className="pt-32 pb-20 bg-[#0B0A0C] min-h-screen text-white">
      <div className="w-full px-4 sm:px-8 lg:px-12 space-y-16">
        
        {/* Banner Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-apex-gold text-xs font-extrabold px-4 py-1.5 rounded-full border border-apex-gold/30">
            <MessageSquare className="w-4 h-4 text-apex-gold" />
            فروعنا وتواصل معنا
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-white">
            يسعدنا تواصلكم في <span className="text-gradient-apex">مركز القمة الطبي</span>
          </h1>

          <p className="text-slate-300 text-base leading-relaxed font-light">
            تفضل بزيارتنا في فرع العذيبة أو فرع العامرات، أو تواصل معنا مباشرة لاستقبال استفساراتك ومواعيدك.
          </p>
        </div>

        {/* Branch Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {initialBranches.map((b) => (
            <div
              key={b.id}
              onClick={() => setSelectedBranchId(b.id)}
              className={`p-6 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 text-right ${
                selectedBranchId === b.id
                  ? "bg-[#151112] text-white border-apex-gold shadow-2xl scale-[1.02]"
                  : "bg-white/5 text-slate-300 border-white/10 hover:border-apex-gold/40 shadow-sm"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    selectedBranchId === b.id ? "bg-apex-gold text-slate-950" : "bg-white/10 text-apex-gold"
                  }`}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white">{b.nameAr}</h3>
                    <p className={`text-xs ${selectedBranchId === b.id ? "text-slate-300" : "text-slate-400"}`}>{b.locationAr}</p>
                  </div>
                </div>
              </div>

              <div className={`space-y-1.5 text-xs ${selectedBranchId === b.id ? "text-slate-300" : "text-slate-400"}`}>
                <p><b>العنوان:</b> {b.addressAr}</p>
                <p><b>أوقات العمل:</b> {b.workingHoursAr}</p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold">
                <span className={selectedBranchId === b.id ? "text-apex-gold" : "text-slate-400"}>
                  {selectedBranchId === b.id ? "الفرع المحدد حالياً ✓" : "انقر لعرض تفاصيل الفرع"}
                </span>
                <span dir="ltr">{b.phone}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Active Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6 text-right">
            <div className="bg-[#151112] p-6 rounded-3xl border border-apex-gold/20 shadow-2xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-apex-gold flex items-center justify-center flex-shrink-0 border border-apex-gold/30">
                <MapPin className="w-6 h-6 text-apex-gold" />
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-base">موقع {activeBranch.nameAr}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  {activeBranch.addressAr}
                </p>
                {activeBranch.mapUrl && (
                  <a
                    href={activeBranch.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 bg-apex-gold hover:bg-apex-gold-dark text-slate-950 px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm transition-all hover:scale-105 mt-1"
                  >
                    <MapPin className="w-3.5 h-3.5 text-slate-950" />
                    <span>فتح الموقع على خرائط جوجل (Google Maps 📍)</span>
                  </a>
                )}
              </div>
            </div>

            <div className="bg-[#151112] p-6 rounded-3xl border border-apex-gold/20 shadow-2xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-apex-gold flex items-center justify-center flex-shrink-0 border border-apex-gold/30">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base mb-1">أرقام التواصل والواتساب</h4>
                <p className="text-xs text-slate-400">الهاتف والواتساب المباشر:</p>
                <p className="text-sm font-extrabold text-apex-gold mt-1" dir="ltr">{activeBranch.phone}</p>
              </div>
            </div>

            <div className="bg-[#151112] p-6 rounded-3xl border border-apex-gold/20 shadow-2xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-apex-gold flex items-center justify-center flex-shrink-0 border border-apex-gold/30">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base mb-1">البريد الإلكتروني الرسمي</h4>
                <p className="text-xs text-slate-400">للاستفسارات والتقارير الطبية:</p>
                <p className="text-xs font-bold text-slate-200 mt-1">{activeBranch.email}</p>
              </div>
            </div>

            <div className="bg-[#151112] p-6 rounded-3xl border border-apex-gold/20 shadow-2xl flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 text-apex-gold flex items-center justify-center flex-shrink-0 border border-apex-gold/30">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-base mb-1">أوقات العمل الرسمية</h4>
                <p className="text-xs text-slate-300">{activeBranch.workingHoursAr}</p>
                <p className="text-xs text-slate-400 mt-0.5">الجمعة: العطلة الأسبوعية</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#151112] p-8 sm:p-10 rounded-3xl border border-apex-gold/20 shadow-2xl text-right">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <h3 className="text-2xl font-bold text-white">تم إرسال رسالتك بنجاح!</h3>
                <p className="text-slate-300 text-sm">
                  شكراً لتواصلك مع مركز القمة الطبي. سيتواصل بك أحد ممثلي الخدمة في أقرب وقت.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-apex-gold text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs"
                >
                  إرسال رسالة أخرى
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-extrabold text-white mb-6">أرسل لنا استفسارك المباشر</h3>
                
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">الاسم الكامل *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="مثال: سعيد بن عبد الله"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:ring-2 focus:ring-apex-gold outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">رقم الهاتف *</label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+968 9123 4567"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:ring-2 focus:ring-apex-gold outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">البريد الإلكتروني</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:ring-2 focus:ring-apex-gold outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">نص الرسالة أو الاستفسار *</label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="اكتب استفسارك هنا بالتفصيل..."
                    className="w-full p-4 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:ring-2 focus:ring-apex-gold outline-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-apex-gold to-apex-gold-dark text-slate-950 rounded-xl font-extrabold text-sm shadow-gold hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>إرسال الرسالة إلى خدمة العملاء</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

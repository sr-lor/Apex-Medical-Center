"use client";

import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { Upload, Image as ImageIcon, Copy, Check, CloudUpload, ShieldCheck } from "lucide-react";

export default function AdminMediaPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      name: "Alaa-apexmedicaloman.jpg",
      url: "/wp-content/uploads/2026/07/Alaa-apexmedicaloman.jpg",
      size: "160 KB",
      date: "2026-08-07",
    },
    {
      url: "/wp-content/uploads/2026/07/Belal-Haj-Hamed-apexmedicaloman.jpg",
      name: "Belal-Haj-Hamed-apexmedicaloman.jpg",
      size: "175 KB",
      date: "2026-08-07",
    },
    {
      url: "/wp-content/uploads/2026/04/laser_New.jpg",
      name: "laser_New.jpg",
      size: "919 KB",
      date: "2026-08-07",
    },
  ]);

  const [copiedUrl, setCopiedUrl] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setStatusMsg("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setUploadedFiles([
          {
            name: data.fileName || file.name,
            url: data.url,
            size: `${(file.size / 1024).toFixed(0)} KB`,
            date: new Date().toISOString().split("T")[0],
          },
          ...uploadedFiles,
        ]);

        setStatusMsg(
          data.isMock
            ? "تم إضافة الصورة بنجاح (وضع العرض المحلي). تفعيل مفاتيح AWS S3 في ملف .env سيُفعل الرفع السحابي الفوري."
            : "تم رفع الملف بنجاح وحفظه في حاوية AWS S3 السحابية!"
        );
        setFile(null);
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("فشل الرفع إلى خادم AWS S3.");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(""), 2000);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">مركز رفع وسائط صور AWS S3</h1>
            <p className="text-xs text-slate-500 mt-1">
              رفع وحفظ صور العيادات والأطباء مباشرة في التخزين السحابي لـ Amazon Web Services.
            </p>
          </div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4" />
            <span>AWS S3 S3Client Connected</span>
          </div>
        </div>

        {/* Upload Box */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-card text-center space-y-4">
          <div className="w-16 h-16 bg-apex-blue-light text-apex-blue rounded-2xl flex items-center justify-center mx-auto">
            <CloudUpload className="w-8 h-8 animate-bounce" style={{ animationDuration: '3s' }} />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800">رفع صورة جديدة إلى AWS S3</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              اختر ملف الصورة (PNG, JPG, WEBP) لرفعه وتوليد رابط سحابي مباشر لاستخدامه في العيادات والأطباء.
            </p>
          </div>

          {statusMsg && (
            <div className="p-3 bg-blue-50 text-apex-blue text-xs rounded-xl max-w-md mx-auto">
              {statusMsg}
            </div>
          )}

          <form onSubmit={handleUpload} className="max-w-md mx-auto space-y-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-900 file:text-white hover:file:bg-apex-blue"
            />

            <button
              type="submit"
              disabled={!file || uploading}
              className="w-full py-3 bg-apex-blue hover:bg-apex-blue-dark text-white font-bold rounded-xl text-xs shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              {uploading ? "جاري الرفع لـ AWS S3..." : "رفع الملف الآن"}
            </button>
          </form>
        </div>

        {/* Uploaded Files Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-card overflow-hidden">
          <div className="p-4 bg-slate-50 border-b font-bold text-sm text-slate-800 flex justify-between items-center">
            <span>الصور المرفوعة في التخزين</span>
            <span className="text-xs font-normal text-slate-500">إجمالي: {uploadedFiles.length} ملفات</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {uploadedFiles.map((fileItem, idx) => (
              <div key={idx} className="border rounded-2xl p-3 bg-slate-50 flex items-center gap-3">
                <img src={fileItem.url} alt={fileItem.name} className="w-14 h-14 rounded-xl object-cover border" />
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-xs text-slate-800 truncate">{fileItem.name}</h5>
                  <span className="text-[10px] text-slate-400 block">{fileItem.size} - {fileItem.date}</span>
                  <button
                    onClick={() => copyToClipboard(fileItem.url)}
                    className="mt-1 text-[11px] font-bold text-apex-blue hover:underline flex items-center gap-1"
                  >
                    {copiedUrl === fileItem.url ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">تم نسخ الرابط!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>نسخ رابط الصورة</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
}

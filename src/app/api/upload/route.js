import { NextResponse } from "next/server";
import { uploadToAWS } from "@/lib/aws-s3";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "لم يتم اختيار أي ملف للرفع" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Call AWS S3 upload helper
    const result = await uploadToAWS(buffer, file.name, file.type);

    return NextResponse.json({
      success: true,
      message: "تم رفع الملف بنجاح",
      url: result.url,
      isMock: result.isMock,
      fileName: file.name,
    });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "حدث خطأ أثناء الرفع إلى AWS S3" },
      { status: 500 }
    );
  }
}

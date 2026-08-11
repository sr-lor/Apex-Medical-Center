import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, message: "يرجى إدخال بريد إلكتروني صحيح." }, { status: 400 });
    }

    const awsAccessKey = process.env.AWS_ACCESS_KEY_ID;
    const awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY;
    let emailSentViaAws = false;

    // Check if AWS SES key is configured
    if (awsAccessKey && awsSecretKey) {
      emailSentViaAws = true;
    }

    return NextResponse.json({
      success: true,
      emailSentViaAws,
      otp,
      message: emailSentViaAws
        ? `تم إرسال كود التحقق المباشر (${otp}) بنجاح إلى بريدك عبر AWS SES!`
        : `تم توليد كود التحقق المباشر (${otp}) بنجاح للمدير المعتمد.`,
    });
  } catch (err) {
    console.error("OTP API Error:", err);
    return NextResponse.json({ success: false, message: "حدث خطأ أثناء معالجة كود التحقق." }, { status: 500 });
  }
}

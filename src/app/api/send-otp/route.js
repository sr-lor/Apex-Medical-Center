import { NextResponse } from "next/server";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ success: false, message: "يرجى إدخال بريد إلكتروني صحيح." }, { status: 400 });
    }

    const otpCode = otp || Math.floor(100000 + Math.random() * 900000).toString();
    const region = process.env.AWS_REGION || "us-east-1";
    const awsAccessKey = process.env.AWS_ACCESS_KEY_ID;
    const awsSecretKey = process.env.AWS_SECRET_ACCESS_KEY;
    let emailSentViaAws = false;

    if (awsAccessKey && awsSecretKey) {
      try {
        const sesClient = new SESClient({
          region,
          credentials: {
            accessKeyId: awsAccessKey,
            secretAccessKey: awsSecretKey,
          },
        });

        const senderEmail = process.env.AWS_SES_SENDER_EMAIL || "info@apexmedicaloman.com";

        const command = new SendEmailCommand({
          Source: `مجمع القمة الطبي <${senderEmail}>`,
          Destination: {
            ToAddresses: [email.trim()],
          },
          Message: {
            Subject: {
              Data: `🔐 كود التحقق الخاص بمجمع القمة الطبي: ${otpCode}`,
              Charset: "UTF-8",
            },
            Body: {
              Html: {
                Data: `
                  <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 30px; text-align: right; color: #1e293b;">
                    <div style="max-width: 550px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; padding: 30px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
                      <div style="text-align: center; margin-bottom: 25px;">
                        <h2 style="color: #0f172a; margin: 0; font-size: 22px;">مجمع القمة الطبي (Apex Medical Center)</h2>
                        <p style="color: #64748b; font-size: 13px; margin-top: 5px;">تأكيد وتوثيق كود التحقق المباشر عبر AWS SES</p>
                      </div>
                      
                      <div style="background-color: #f1f5f9; border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 25px; border: 1px solid #cbd5e1;">
                        <p style="margin: 0 0 10px 0; font-size: 13px; color: #475569; font-weight: bold;">رمز التحقق الخاص بك (OTP):</p>
                        <div style="font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #0284c7; font-family: monospace;">${otpCode}</div>
                        <p style="margin: 10px 0 0 0; font-size: 11px; color: #94a3b8;">هذا الكود صالِح لمدة 10 دقائق فقط.</p>
                      </div>
                      
                      <p style="font-size: 12px; color: #64748b; line-height: 1.6; margin: 0;">
                        إذا لم تطلب كود التحقق هذا، يرجى تجاهل هذه الرسالة.
                      </p>
                      
                      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 25px 0 15px 0;" />
                      <div style="text-align: center; font-size: 11px; color: #94a3b8;">
                        © 2026 مجمع القمة الطبي - سلطنة عمان. جميع الحقوق محفوظة.
                      </div>
                    </div>
                  </div>
                `,
                Charset: "UTF-8",
              },
            },
          },
        });

        await sesClient.send(command);
        emailSentViaAws = true;
        console.log("✅ AWS SES Email Sent Successfully via Send-OTP API!");
      } catch (err) {
        console.error("❌ AWS SES Email Send Error:", err.message);
      }
    }

    return NextResponse.json({
      success: true,
      emailSentViaAws,
      otp: otpCode,
      message: emailSentViaAws
        ? `تم إرسال كود التحقق المباشر (${otpCode}) بنجاح إلى بريدك عبر AWS SES!`
        : `تم توليد كود التحقق المباشر (${otpCode}) بنجاح.`,
    });
  } catch (err) {
    console.error("OTP API Error:", err);
    return NextResponse.json({ success: false, message: "حدث خطأ أثناء معالجة كود التحقق." }, { status: 500 });
  }
}

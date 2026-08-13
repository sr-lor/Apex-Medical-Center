import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const dataDir = path.join(process.cwd(), "data");
const accountFilePath = path.join(dataDir, "admin-account.json");

const defaultAccountData = {
  username: "admin",
  email: "admin@srlor.com",
  password: "apexmedical2026",
  passkey: "passkey_apex_2026_master_fast_login",
  pendingEmail: "",
  pendingOtp: "",
  otpExpiresAt: null,
  updatedAt: new Date().toISOString(),
};

function ensureFileExists() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(accountFilePath)) {
    fs.writeFileSync(accountFilePath, JSON.stringify(defaultAccountData, null, 2), "utf8");
  }
}

function readAccount() {
  ensureFileExists();
  try {
    const raw = fs.readFileSync(accountFilePath, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading admin account file:", err);
    return defaultAccountData;
  }
}

function writeAccount(data) {
  ensureFileExists();
  try {
    fs.writeFileSync(accountFilePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing admin account file:", err);
  }
}

async function sendAwsSesOtpEmail(toEmail, otpCode) {
  const region = process.env.AWS_REGION || "us-east-1";
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

  if (!accessKeyId || !secretAccessKey) {
    console.warn("AWS SES credentials not found in env.");
    return { success: false, reason: "بيانات اعتماد AWS SES غير مكتملة في متغيرات البيئة." };
  }

  try {
    const sesClient = new SESClient({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    const senderEmail = process.env.AWS_SES_SENDER_EMAIL || "info@apexmedicaloman.com";

    const command = new SendEmailCommand({
      Source: `مجمع القمة الطبي <${senderEmail}>`,
      Destination: {
        ToAddresses: [toEmail],
      },
      Message: {
        Subject: {
          Data: `🔐 كود التحقق الخاص ببريدك الإلكتروني: ${otpCode}`,
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: `
              <div dir="rtl" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; padding: 30px; text-align: right; color: #1e293b;">
                <div style="max-width: 550px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; padding: 30px; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05);">
                  <div style="text-align: center; margin-bottom: 25px;">
                    <h2 style="color: #0f172a; margin: 0; font-size: 22px;">مجمع القمة الطبي (Apex Medical Center)</h2>
                    <p style="color: #64748b; font-size: 13px; margin-top: 5px;">تأكيد وتوثيق بريد مدير النظام الإداري عبر AWS SES</p>
                  </div>
                  
                  <div style="background-color: #f1f5f9; border-radius: 16px; padding: 20px; text-align: center; margin-bottom: 25px; border: 1px solid #cbd5e1;">
                    <p style="margin: 0 0 10px 0; font-size: 13px; color: #475569; font-weight: bold;">رمز التحقق الخاص بك (OTP):</p>
                    <div style="font-size: 34px; font-weight: 900; letter-spacing: 8px; color: #0284c7; font-family: monospace;">${otpCode}</div>
                    <p style="margin: 10px 0 0 0; font-size: 11px; color: #94a3b8;">هذا الكود صالِح لمدة 10 دقائق فقط.</p>
                  </div>
                  
                  <p style="font-size: 12px; color: #64748b; line-height: 1.6; margin: 0;">
                    إذا لم تطلب كود التحقق هذا لصفحة إدارة الحساب، يرجى تجاهل هذه الرسالة.
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

    const result = await sesClient.send(command);
    console.log("✅ AWS SES Email Sent Successfully! MessageId:", result.MessageId);
    return { success: true, messageId: result.MessageId };
  } catch (err) {
    console.error("❌ AWS SES Send Email Error:", err.message);
    return { success: false, reason: err.message };
  }
}

export async function GET() {
  const account = readAccount();
  return NextResponse.json({
    account: {
      username: account.username,
      email: account.email,
      passkey: account.passkey,
      hasPasskey: !!account.passkey,
      updatedAt: account.updatedAt,
    },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { action } = body;
    let account = readAccount();

    // 1. Update Username
    if (action === "update_username") {
      const { username } = body;
      if (!username || username.trim().length < 3) {
        return NextResponse.json({ error: "اسم المستخدم يجب أن يتكون من 3 أحرف على الأقل." }, { status: 400 });
      }
      account.username = username.trim();
      account.updatedAt = new Date().toISOString();
      writeAccount(account);
      return NextResponse.json({ success: true, message: "تم تحديث اسم المستخدم بنجاح!", username: account.username });
    }

    // 2. Send Email OTP via AWS SES (Secure - No OTP returned in payload!)
    if (action === "send_email_otp") {
      const { newEmail } = body;
      if (!newEmail || !newEmail.includes("@")) {
        return NextResponse.json({ error: "يرجى إدخال بريد إلكتروني صحيح." }, { status: 400 });
      }

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      account.pendingEmail = newEmail.trim();
      account.pendingOtp = otpCode;
      account.otpExpiresAt = Date.now() + 10 * 60 * 1000;
      writeAccount(account);

      // Attempt AWS SES Email Sending
      const awsResult = await sendAwsSesOtpEmail(newEmail.trim(), otpCode);

      if (awsResult.success) {
        return NextResponse.json({
          success: true,
          emailSentViaAws: true,
          message: `تم إرسال كود التحقق بنجاح إلى صندوق الوارد لبريدك (${newEmail.trim()}) عبر AWS SES! يرجى مراجعة بريدك وإدخال الكود هنا.`,
        });
      } else {
        return NextResponse.json({
          success: true,
          emailSentViaAws: false,
          warning: `ملاحظة AWS SES: ${awsResult.reason}`,
          message: `تم إنشاء طلب التحقق لـ (${newEmail.trim()}). (إذا كان بريدك غير موثق في بيئة تجربة AWS SES، يرجى التوثيق في AWS Console).`,
        });
      }
    }

    // 3. Verify Email OTP
    if (action === "verify_email_otp") {
      const { otp } = body;
      if (!otp || otp.trim() !== account.pendingOtp) {
        return NextResponse.json({ error: "كود التحقق المدخل غير صحيح، يرجى مراجعة بريدك الإلكتروني والتحقق مجدداً." }, { status: 400 });
      }
      if (Date.now() > account.otpExpiresAt) {
        return NextResponse.json({ error: "انتهت صلاحية كود التحقق، يرجى طلب إرسال كود جديد." }, { status: 400 });
      }

      account.email = account.pendingEmail;
      account.pendingEmail = "";
      account.pendingOtp = "";
      account.otpExpiresAt = null;
      account.updatedAt = new Date().toISOString();
      writeAccount(account);

      return NextResponse.json({
        success: true,
        email: account.email,
        message: "تم توثيق وتأكيد البريد الإلكتروني الجديد بنجاح!",
      });
    }

    // 4. Update Password
    if (action === "update_password") {
      const { currentPassword, newPassword } = body;
      if (!currentPassword || currentPassword !== account.password) {
        return NextResponse.json({ error: "كلمة السر الحالية غير صحيحة." }, { status: 400 });
      }
      if (!newPassword || newPassword.length < 6) {
        return NextResponse.json({ error: "كلمة السر الجديدة يجب أن تتكون من 6 خانات على الأقل." }, { status: 400 });
      }

      account.password = newPassword;
      account.updatedAt = new Date().toISOString();
      writeAccount(account);

      return NextResponse.json({ success: true, message: "تم تغيير كلمة السر بنجاح!" });
    }

    // 5. Register / Update Quick Passkey
    if (action === "register_passkey") {
      const newPasskey = `passkey_apex_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      account.passkey = newPasskey;
      account.updatedAt = new Date().toISOString();
      writeAccount(account);

      return NextResponse.json({
        success: true,
        passkey: newPasskey,
        message: "تم إنشاء وتفعيل مفتاح التسجيل السريع (Quick Passkey) بنجاح!",
      });
    }

    return NextResponse.json({ error: "إجراء غير معروف" }, { status: 400 });
  } catch (err) {
    console.error("Admin Account API Error:", err);
    return NextResponse.json({ error: "حدث خطأ أثناء تحديث بيانات الحساب." }, { status: 500 });
  }
}

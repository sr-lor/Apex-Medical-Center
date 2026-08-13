import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const dataDir = path.join(process.cwd(), "data");
const chatsFilePath = path.join(dataDir, "chat-logs.json");

// Helper to save customer chat session locally on server
function saveLocalChatLog(sessionId, userProfile, message, botReply) {
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    let chats = [];
    if (fs.existsSync(chatsFilePath)) {
      try {
        chats = JSON.parse(fs.readFileSync(chatsFilePath, "utf8"));
      } catch (e) {
        chats = [];
      }
    }

    const currentSessionId = sessionId || `session_${Date.now()}`;
    const existingIdx = chats.findIndex((c) => c.sessionId === currentSessionId);

    const userMsgObj = {
      id: Date.now(),
      sender: "user",
      text: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const botMsgObj = {
      id: Date.now() + 1,
      sender: "bot",
      text: botReply.text || botReply.reply || botReply,
      ctaAction: botReply.ctaAction || null,
      quickReplies: botReply.quickReplies || null,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    if (existingIdx >= 0) {
      chats[existingIdx].messages.push(userMsgObj, botMsgObj);
      chats[existingIdx].updatedAt = new Date().toISOString();
      if (userProfile) chats[existingIdx].userProfile = userProfile;
    } else {
      chats.unshift({
        sessionId: currentSessionId,
        userProfile: userProfile || { name: "زائر جديد", contact: "غير محدد" },
        messages: [userMsgObj, botMsgObj],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    fs.writeFileSync(chatsFilePath, JSON.stringify(chats, null, 2), "utf8");
  } catch (err) {
    console.warn("⚠️ Failed to write local chat log:", err.message);
  }
}

function base64url(source) {
  let encoded = Buffer.from(source).toString("base64");
  return encoded.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function getServiceAccountAccessToken(keyObj) {
  const header = { alg: "RS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: keyObj.client_email,
    scope: "https://www.googleapis.com/auth/generative-language https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedClaim = base64url(JSON.stringify(claimSet));
  const signatureInput = `${encodedHeader}.${encodedClaim}`;

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signatureInput);
  const signature = signer.sign(keyObj.private_key, "base64");
  const encodedSignature = signature.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const jwt = `${signatureInput}.${encodedSignature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(`Token Error: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}

// -------------------------------------------------------------
// SYSTEM PROMPT & STRICT GUIDELINES FOR REEN AI
// -------------------------------------------------------------
const APEX_SYSTEM_PROMPT = `
أنت "رين AI" (Reen AI)، المساعد الذكي الرسمي والافتراضي لمجمع القمة الطبي (Apex Medical Center) في سلطنة عمان (فرعي العذيبة والعامرات).

ضوابط وقواعد الرد الإلزامية والرسمية:
1. الهوية والصفة الرسمية: أنت "المساعد الذكي لمجمع القمة الطبي". لا تصف نفسك كطبيب أو ممارس صحي إنساني، ولا تقدم تشخيصات طبية نهائية أو وصفات علاجية.
2. أسلوب الخطاب وطول الرد: تحدث بلغة عربية فصحى راقية ورسمية. قدم إجابات وافية ومتوسطة الطول تتناسب مع طبيعة استفسار المستخدم، مع توفير كافة التفاصيل والمعلومات المفيدة المطلوبة بأسلوب منظم وسلس دون اقتطاع مفرط أو إطالة غير مبررة.
3. التنبيه وإخلاء المسؤولية الطبي:
   - الذكاء الاصطناعي لا يقدم استشارات طبية نهائية ولا يُغني عن الفحص المباشر لدى الطبيب.
   - عند الاستفسار عن أعراض أو أدوية أو تشخيص، قدم توعية عامة متبوعة بـ:
   "⚠️ تنبيه طبي مهم: المعلومات استرشادية فقط ولا تُعتبر تشخيصاً طبياً. نوصيك باستشارة أحد أطبائنا المتخصصين في مجمع القمة الطبي."
   - الواتساب المباشر للحجز: +968 97031500.
4. الخدمات والتخصصات المتاحة بالفروع:
   - فرع العذيبة الرئيسي: طب وتجميل الأسنان (ابتسامة هوليود الرقمية، الزراعة، التقويم)، الجراحة التجميلية وتنسيق القوام، الجلدية والليزر والعناية بالبشرة، عظام ومفاصل، الطب والتجميل النسائي، جراحات السمنة والتكميم.
   - فرع العامرات: عيادة السمنة وحقن إنقاص الوزن (مونجارو Mounjaro® وأوزمبيك Ozempic® برعاية طبيبة)، الجلدية والتجميل والليزر، الطب العام والرعاية الأولية.
5. أوقات العمل والتواصل: السبت - الخميس: من 9:00 صباحاً حتى 9:00 مساءً. هاتف / واتساب: +968 97031500.
6. تنسيق الخط والنصوص: لا تستخدم نجوم التنسيق المزدوجة مثل ** في ردودك، واكتب النصوص صافية ومباشرة بدون رموز مارك داون خام.
`;

export async function POST(req) {
  try {
    const { message, history, userProfile, sessionId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "الرسالة مطلوبة" }, { status: 400 });
    }

    // Fair Usage Policy Check (سقف الاستخدام العادل لكل محادثة)
    if (Array.isArray(history) && history.length >= 16) {
      const fairUseNotice = `⚠️ تنبيه الاستخدام العادل (Fair Use Cap):\nلقد وصلت إلى الحد الأقصى للاستفسارات المتاحة في هذه الجلسة.\n\nيسعدنا مساعدتك وحجز موعد استشارتك مباشرة مع أطبائنا عبر الواتساب: +968 97031500`;
      return NextResponse.json({
        reply: fairUseNotice,
        ctaAction: { type: "book", text: "التواصل والحجز المباشر عبر الواتساب" },
        source: "fair_use_limit",
      });
    }

    let geminiResponseText = null;

    // 1. Try fetching service account key from file or env
    let keyObj = null;
    try {
      const keyFilePath = path.join(process.cwd(), "src", "apex-medical-key.json");
      if (fs.existsSync(keyFilePath)) {
        keyObj = JSON.parse(fs.readFileSync(keyFilePath, "utf8"));
      } else if (process.env.GEMINI_PRIVATE_KEY && process.env.GEMINI_CLIENT_EMAIL) {
        keyObj = {
          project_id: process.env.GEMINI_PROJECT_ID,
          client_email: process.env.GEMINI_CLIENT_EMAIL,
          private_key: process.env.GEMINI_PRIVATE_KEY.replace(/\\n/g, "\n"),
        };
      }
    } catch (e) {
      console.warn("Could not read Service Account key file:", e.message);
    }

    // 2. Call Official Production Gemini Models (Cheapest & Fastest Flash Models)
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (keyObj || apiKey) {
      try {
        let headers = { "Content-Type": "application/json" };
        if (keyObj) {
          const accessToken = await getServiceAccountAccessToken(keyObj);
          headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const contents = [];

        if (Array.isArray(history)) {
          history.slice(-6).forEach((h) => {
            if (h.sender === "user") {
              contents.push({ role: "user", parts: [{ text: h.text }] });
            } else if (h.sender === "bot") {
              contents.push({ role: "model", parts: [{ text: h.text }] });
            }
          });
        }

        contents.push({ role: "user", parts: [{ text: message }] });

        // Cheapest, fastest official production Flash models
        const candidateModels = ["gemini-flash-latest", "gemini-2.5-flash-lite"];

        const payload = {
          system_instruction: {
            parts: [{ text: APEX_SYSTEM_PROMPT }],
          },
          contents,
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 800, // Flexible medium-length responses up to 800 tokens
          },
        };

        for (const modelName of candidateModels) {
          try {
            const url = apiKey
              ? `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`
              : `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;

            const apiRes = await fetch(url, {
              method: "POST",
              headers,
              body: JSON.stringify(payload),
            });

            if (apiRes.ok) {
              const apiData = await apiRes.json();
              const textOutput = apiData.candidates?.[0]?.content?.parts?.[0]?.text;
              if (textOutput) {
                geminiResponseText = textOutput;
                console.log(`✅ Gemini AI (${modelName}) responded successfully!`);
                break; // Stop loop on success
              }
            } else {
              const errData = await apiRes.json().catch(() => ({}));
              console.warn(`⚠️ Gemini model ${modelName} returned status ${apiRes.status}:`, errData);
            }
          } catch (modelErr) {
            console.warn(`⚠️ Attempt with ${modelName} failed:`, modelErr.message);
          }
        }
      } catch (err) {
        console.warn("⚠️ Error calling Gemini API endpoint:", err.message);
      }
    }

    // 3. If Gemini Lite response received, save local log & return
    if (geminiResponseText) {
      saveLocalChatLog(sessionId, userProfile, message, { text: geminiResponseText });
      return NextResponse.json({
        reply: geminiResponseText,
        source: "gemini_lite_ai",
      });
    }

    // 4. Fallback Smart Engine
    const fallbackReply = generateFallbackResponse(message, userProfile);
    saveLocalChatLog(sessionId, userProfile, message, fallbackReply);

    return NextResponse.json({
      reply: fallbackReply.text,
      ctaAction: fallbackReply.ctaAction,
      quickReplies: fallbackReply.quickReplies,
      source: "apex_assistant_fallback",
    });
  } catch (error) {
    console.error("API Chat Error:", error);
    return NextResponse.json(
      { error: "حدث خطأ غير متوقع أثناء معالجة الطلب." },
      { status: 500 }
    );
  }
}

function generateFallbackResponse(text, userProfile) {
  const q = text.toLowerCase().trim();
  const userNameStr = userProfile?.name ? ` ${userProfile.name}` : "";

  // Medical consultation detection
  const isMedicalQuery =
    q.includes("ألم") || q.includes("الم") || q.includes("وجع") || q.includes("صداع") ||
    q.includes("علاج") || q.includes("دواء") || q.includes("أعراض") || q.includes("اعراض") ||
    q.includes("حرارة") || q.includes("التهاب") || q.includes("ضغط") || q.includes("سكر") ||
    q.includes("استشارة") || q.includes("نصيحة") || q.includes("عندي") || q.includes("اعاني") ||
    q.includes("أعاني");

  if (isMedicalQuery) {
    return {
      text: `أهلاً بك${userNameStr}. نسعد بتقديم التوعية الأولية:\n\n• يُفضل دائماً الراحة وتجنب تناول أي أدوية بدون تشخيص طبي معلوم.\n• في حال وجود أعراض مستمرة، يجب معاينة الحالة من قِبل الطبيب المختص لفحصك بدقة.\n\n⚠️ **تنبيه طبي مهم:** هذه المعلومات استرشادية فقط ولا تُعتبر تشخيصاً طبياً. يُرجى عدم الاعتماد عليها للتشخيص أو العلاج بدون كشف مباشر من الطبيب المختص.\n\n📞 **لطلب كشف طبي مباشر واستشارة أطبائنا:**\n• هاتف / واتساب المجمع: **+968 97031500** (فرع العذيبة & فرع العامرات)`,
      ctaAction: { type: "book", text: "حجز استشارة طبيب عبر الواتساب" },
      quickReplies: [
        { label: "🏢 عيادات العذيبة", action: "azaiba_services" },
        { label: "📍 عيادات العامرات", action: "amerat_services" },
      ],
    };
  }

  // Greetings
  if (q.includes("كيف حال") || q.includes("كيفك") || q.includes("شلونك") || q.includes("اخبارك") || q.includes("أخبارك")) {
    return {
      text: `أهلاً بك${userNameStr}! 😊 أنا بخير، وسعيدة بالتحدث معك.\nكيف أستطيع مساعدتك اليوم في مجمع القمة الطبي؟`,
      quickReplies: [
        { label: "🏢 فرع العذيبة", action: "azaiba_services" },
        { label: "📍 فرع العامرات", action: "amerat_services" },
        { label: "💉 حقن إنقاص الوزن", action: "weight_injections" },
      ],
    };
  }

  if (q.includes("من أنت") || q.includes("من انت") || q.includes("ما اسمك") || q.includes("عرفني")) {
    return {
      text: `أنا **رين AI** ✨ المساعد الذكي لمجمع القمة الطبي في سلطنة عمان. أساعدك بإجابات سريعة ومختصرة حول خدماتنا وعياداتنا وفروعنا.`,
      quickReplies: [
        { label: "🦷 عيادة الأسنان", action: "dentistry_info" },
        { label: "💉 عيادة التخسيس", action: "weight_injections" },
        { label: "📞 التواصل والعناوين", action: "contact_info" },
      ],
    };
  }

  if (q.includes("مرحبا") || q.includes("مرحباً") || q.includes("اهين") || q.includes("أاهلا") || q.includes("أهلاً") || q.includes("السلام عليكم") || q.includes("سلام")) {
    return {
      text: `وعليكم السلام ورحمة الله وبركاته! أهلاً بك${userNameStr} في مجمع القمة الطبي. كيف أستطيع مساعدتك؟`,
      quickReplies: [
        { label: "📍 فرع العامرات", action: "amerat_services" },
        { label: "🏢 فرع العذيبة", action: "azaiba_services" },
        { label: "🦷 عيادة الأسنان", action: "dentistry_info" },
      ],
    };
  }

  // Branches
  if (q.includes("عامرات") || q.includes("العامرات")) {
    return {
      text: "✨ **خدمات فرع العامرات:**\n• **إدارة السمنة والوزن:** حقن مونجارو وأوزمبيك المعتمدة برعاية طبيبة.\n• **الجلدية والليزر:** إزالة الشعر وتجديد البشرة.\n• **الطب العام:** فحوصات شاملة ورعاية أولية.\n📍 العامرات - الشارع العام.",
      ctaAction: { type: "branch_link", href: "/services?branch=amerat", text: "تصفح عيادات العامرات" },
      quickReplies: [
        { label: "💉 حقن مونجارو والتخسيس", action: "weight_injections" },
        { label: "📞 التواصل والواتساب", action: "contact_info" },
      ],
    };
  }

  if (q.includes("عذيبة") || q.includes("العذيبة") || q.includes("الرئيسي")) {
    return {
      text: "🏢 **خدمات فرع العذيبة الرئيسي:**\n• طب وتجميل الأسنان وابتسامة هوليود الرقمية\n• الجراحة التجميلية وتنسيق القوام\n• الجلدية والعناية بالبشرة\n• جراحة العظام والمفاصل والمناظير\n• الطب والتجميل النسائي\n• تكميم المعدة والتخسيس\n📍 العذيبة - شارع السلطان قابوس.",
      ctaAction: { type: "branch_link", href: "/services?branch=azaiba", text: "تصفح عيادات العذيبة" },
      quickReplies: [
        { label: "🦷 تجميل وزراعة الأسنان", action: "dentistry_info" },
        { label: "📞 التواصل والواتساب", action: "contact_info" },
      ],
    };
  }

  // Weight Management
  if (q.includes("سمنة") || q.includes("حقن") || q.includes("مونجارو") || q.includes("اوزمبيك") || q.includes("تخسيس") || q.includes("وزن")) {
    return {
      text: "💉 **قسم إدارة السمنة وحقن إنقاص الوزن:**\n• برامج حقن **Mounjaro®** و **Ozempic®** تحت إشراف طبي.\n• استشارات تغذية ومتابعة قياسات.\n• بالون وتكميم المعدة بالمنظار.",
      ctaAction: { type: "book", text: "حجز موعد عيادة التخسيس" },
      quickReplies: [
        { label: "📍 فرع العامرات", action: "amerat_services" },
        { label: "🏢 فرع العذيبة", action: "azaiba_services" },
      ],
    };
  }

  // Dentistry
  if (q.includes("اسنان") || q.includes("أسنان") || q.includes("هوليود") || q.includes("زراعة") || q.includes("تقويم")) {
    return {
      text: "🦷 **قسم طب وتجميل الأسنان:**\n• ابتسامة هوليود الرقمية (Veneers & E-max)\n• زراعة الأسنان الفورية وتصميم التركيبات\n• التقويم الشفاف غير المرئي (Clear Aligners)\n• علاج العصب والتبييض بالليزر.",
      ctaAction: { type: "book", text: "حجز موعد عيادة الأسنان" },
      quickReplies: [
        { label: "🏢 فرع العذيبة", action: "azaiba_services" },
        { label: "📞 أرقام التواصل", action: "contact_info" },
      ],
    };
  }

  // Contact Info
  if (q.includes("تواصل") || q.includes("رقم") || q.includes("وقت") || q.includes("عنوان") || q.includes("موقع") || q.includes("ساعات")) {
    return {
      text: "📞 **معلومات التواصل وأوقات العمل:**\n• **هاتف / واتساب المباشر:** `+968 97031500`\n• **ساعات العمل:** السبت - الخميس: 09:00 ص - 09:00 م\n• **فرع العذيبة:** شارع السلطان قابوس\n• **فرع العامرات:** الشارع العام",
      ctaAction: { type: "link", href: "/contact", text: "انتقل لصفحة الاتصل بنا ومواقع الفروع" },
      quickReplies: [
        { label: "🏢 عيادات العذيبة", action: "azaiba_services" },
        { label: "📍 عيادات العامرات", action: "amerat_services" },
      ],
    };
  }

  return {
    text: `أهلاً بك${userNameStr} في **مجمع القمة الطبي**! 🌟\nيسعدني إجابة استفساراتك حول الفروع (العذيبة والعامرات) والخدمات الطبية والتجميلية المتاحة.`,
    quickReplies: [
      { label: "📍 فرع العامرات", action: "amerat_services" },
      { label: "🏢 فرع العذيبة", action: "azaiba_services" },
      { label: "💉 حقن إنقاص الوزن", action: "weight_injections" },
      { label: "🦷 زراعة وابتسامة الأسنان", action: "dentistry_info" },
    ],
  };
}

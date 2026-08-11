import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeKey || "sk_test_mock", {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  try {
    const body = await request.json();
    const email = body.email || "admin@srlor.com";
    const isFreePeriod = body.isFreePeriod ?? true;
    const amount = isFreePeriod ? 0.00 : (body.amount || 3.465); // 0.00 OMR during 6-month free period
    const planName = body.planName || "باقة تشغيل كاملة لمجمع القمة الطبي (شركة SR LOR)";

    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create Stripe Checkout Session with prefilled customer_email & Card Saving
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email, // Prefill email so Stripe doesn't prompt repeatedly
        line_items: [
          {
            price_data: {
              currency: "omr",
              product_data: {
                name: planName,
                description: isFreePeriod
                  ? "فترة الدعم المجاني مفعّلة - حفظ البطاقة آمنة للتجديد المباشر بعد 6 أشهر"
                  : "باقة تشغيل كاملة بعد الخصم المباشر 65% (3.465 ر.ع. شهرياً)",
                images: ["https://apexmedicaloman.com/wp-content/uploads/2026/06/Apex_Log.png"],
              },
              unit_amount: Math.round(amount * 1000),
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_intent_data: { setup_future_usage: "off_session" },
        success_url: `${origin}/admin/subscription?success=true&email=${encodeURIComponent(email)}`,
        cancel_url: `${origin}/admin/subscription?canceled=true`,
      });
    } catch (err) {
      console.warn("Currency checkout fallback attempt:", err.message);
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: planName,
                description: isFreePeriod 
                  ? "Free 6-Month Support Period Active ($0 Charge - Save Card Only)"
                  : "Full Operating License for Apex Medical Center (Discounted Price 3.465 OMR)",
              },
              unit_amount: isFreePeriod ? 0 : 900,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_intent_data: { setup_future_usage: "off_session" },
        success_url: `${origin}/admin/subscription?success=true&email=${encodeURIComponent(email)}`,
        cancel_url: `${origin}/admin/subscription?canceled=true`,
      });
    }

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Checkout Gateway Error:", error);
    return NextResponse.json(
      { success: false, message: "حدث خطأ أثناء الاتصال ببوابة الدفع الإلكتروني" },
      { status: 500 }
    );
  }
}

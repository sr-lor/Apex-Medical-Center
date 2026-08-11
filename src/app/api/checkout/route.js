import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeKey || "sk_test_mock", {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  try {
    const body = await request.json();
    const amount = body.amount || 9.90; // Original 9.90 OMR / month
    const saveCardAutoRenewal = body.saveCardAutoRenewal ?? true;
    const planName = body.planName || "باقة تشغيل كاملة لمجمع القمة الطبي (شاملة الدعم والتطوير)";

    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create Stripe Checkout Session with Card Saving for Auto-Renewal
    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "omr",
              product_data: {
                name: planName,
                description: "باقة تشغيل كاملة - دعم 6 أشهر مجاني مقدم من الآنسة رفاه عبد القادر + خصم 65% لاحقاً",
                images: ["https://apexmedicaloman.com/wp-content/uploads/2026/06/Apex_Log.png"],
              },
              unit_amount: Math.round(amount * 1000), // OMR unit amount in baisa (9900 baisa)
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_intent_data: saveCardAutoRenewal
          ? { setup_future_usage: "off_session" }
          : undefined,
        success_url: `${origin}/admin/subscription?success=true`,
        cancel_url: `${origin}/admin/subscription?canceled=true`,
      });
    } catch (err) {
      console.warn("Stripe OMR currency checkout fallback attempt:", err.message);
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: planName,
                description: "Full Operating License for Apex Medical Center (Equivalent to 9.90 OMR)",
              },
              unit_amount: 2570, // $25.70 USD ~ 9.90 OMR
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        payment_intent_data: saveCardAutoRenewal
          ? { setup_future_usage: "off_session" }
          : undefined,
        success_url: `${origin}/admin/subscription?success=true`,
        cancel_url: `${origin}/admin/subscription?canceled=true`,
      });
    }

    return NextResponse.json({
      success: true,
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

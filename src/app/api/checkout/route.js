import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeKey || "sk_test_mock", {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  try {
    const body = await request.json();
    const amount = body.amount || 3.465; // Direct 65% discount applied (3.465 OMR)
    const saveCardAutoRenewal = body.saveCardAutoRenewal ?? true;
    const planName = body.planName || "باقة تشغيل كاملة لمجمع القمة الطبي (شاملة الخصم 65% ودعم رفاه عبد القادر)";

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
                description: "باقة تشغيل كاملة بعد الخصم المباشر 65% (3.465 ر.ع.) - دعم 6 أشهر مجاني مقدم من الآنسة رفاه عبد القادر",
                images: ["https://apexmedicaloman.com/wp-content/uploads/2026/06/Apex_Log.png"],
              },
              unit_amount: Math.round(amount * 1000), // 3465 baisa (3.465 OMR)
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
                description: "Full Operating License for Apex Medical Center (Discounted Price 3.465 OMR)",
              },
              unit_amount: 900, // $9.00 USD ~ 3.465 OMR
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

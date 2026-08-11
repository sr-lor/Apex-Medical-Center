import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripeKey || "sk_test_mock", {
  apiVersion: "2023-10-16",
});

export async function POST(request) {
  try {
    const body = await request.json();
    const amount = body.amount || 35; // 35 OMR default monthly plan
    const planName = body.planName || "الاشتراك الشهري لمجمع القمة الطبي (Apex Medical Center Platform)";

    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create a Stripe Checkout Session
    // Currency: omr (Omani Rial) or usd with conversion if OMR needs standard stripe account setup
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
                description: "ترخيص التشغيل الشهري ولوحة التحكم لمجمع القمة الطبي (العذيبة والعامرات)",
                images: ["https://apexmedicaloman.com/wp-content/uploads/2026/06/Apex_Log.png"],
              },
              unit_amount: Math.round(amount * 1000), // OMR has 3 decimal places (baisa)
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}/admin/subscription?success=true`,
        cancel_url: `${origin}/admin/subscription?canceled=true`,
      });
    } catch (err) {
      console.warn("Stripe OMR currency creation fallback attempt:", err.message);
      // Fallback to USD equivalent if OMR currency requires specific account activation in Stripe live dashboard
      session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: planName,
                description: "Monthly License Fee for Apex Medical Center Platform (Equivalent to 35.000 OMR)",
              },
              unit_amount: 9000, // $90 USD ~ 35 OMR
            },
            quantity: 1,
          },
        ],
        mode: "payment",
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

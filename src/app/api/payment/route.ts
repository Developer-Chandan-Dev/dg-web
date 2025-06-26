import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        const { price, pdfId, userId } = data;

        /* ---------- basic validation ---------- */
        if (price == null || !pdfId || !userId) {
            return NextResponse.json(
                { error: "Provide required fields: price, pdfId, userId" },
                { status: 400 }
            );
        }

        /* ---------- create checkout session ---------- */
        const session = await stripe.checkout.sessions.create({
            ui_mode: "embedded",
            mode: "payment",
            payment_method_types: ["card"],

            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        unit_amount: Math.round(Number(price) * 100), // ₹ → paise
                        product_data: {
                            // Stripe requires at least a name when using `product_data`
                            name: `PDF ${pdfId}`,
                            metadata: {
                                userId,
                                pdfId,
                            },
                        },
                    },
                    quantity: 1,
                },
            ],

            automatic_tax: { enabled: true },

            // NOTE: make sure `referer` exists in prod; fall back if not
            return_url: `${
                request.headers.get("referer") ?? process.env.NEXT_PUBLIC_BASE_URL
            }/paymentResult?session_id={CHECKOUT_SESSION_ID}`,
        });

        /* ---------- success ---------- */
        return NextResponse.json(
            {
                id: session.id,
                client_secret: session.client_secret,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Stripe Checkout error:", error);

        return NextResponse.json(
            { error: "Something went wrong while creating the session" },
            { status: 500 }
        );
    }
}

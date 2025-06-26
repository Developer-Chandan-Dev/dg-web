// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe'; // your Stripe instance
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  console.log("Webhook received");
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('Stripe webhook secret is not defined');
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      console.log('Payment succeeded:', event.id);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.log('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }
}

// import { NextRequest } from "next/server";
// import { stripe } from "@/lib/stripe"; // your Stripe instance
// import { headers } from "next/headers";
// import { createClient } from "@supabase/supabase-js";

// export async function POST(req: NextRequest) {
//   const body = await req.text();
//   const sig = headers().get("stripe-signature") as string;

//   console.log(process.env.STRIPE_WEBHOOK_SECRET!, 11);
//   let event;
//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (err) {
//     console.error("❌ Webhook Error:", err);
//     return new Response(`Webhook Error: ${err.message}`, { status: 400 });
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;
//     const userId = session.metadata.userId;
//     const pdfId = session.metadata.pdfId;

//     console.log(session, userId, pdfId, '28')

//     const supabase = createClient(
//       process.env.NEXT_PUBLIC_SUPABASE_URL!,
//       process.env.SUPABASE_SERVICE_ROLE_KEY!
//   );

//     const { error } = await supabase.from("purchases").insert({
//       user_id: userId,
//       pdf_id: pdfId,
//     });

//     if (error) {
//       console.error("❌ Supabase Insert Error:", error);
//     } else {
//       console.log("✅ Purchase recorded:", userId, pdfId);
//     }
//   }

//   return new Response("OK", { status: 200 });
// }

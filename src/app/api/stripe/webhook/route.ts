// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe'; // your Stripe instance (assuming it's configured with Stripe.js)
import { headers } from 'next/headers';
import { createSupabaseClient } from '@/lib/supabase'; // Assuming this correctly imports your Supabase client creation function
import Stripe from 'stripe'; // <--- IMPORTANT: Import Stripe for types

export async function POST(req: NextRequest) {
  // console.log("Webhook start", 8); // Removed unnecessary log for brevity
  const supabase = createSupabaseClient(); // Assuming this returns a correctly typed Supabase client
  let event: Stripe.Event; // <--- IMPORTANT: Declare event with Stripe.Event type

  try {
    const body = await req.text(); // <--- IMPORTANT: Always get the raw text body for verification
    // console.log(body, 12); // Removed unnecessary log
    const headersList = headers(); // No need for await here
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      console.error('Webhook Error: Stripe signature header is missing.'); // Added more specific error log
      return NextResponse.json({ error: 'Stripe signature is not defined' }, { status: 400 });
    }

    const webhookSecret: string | undefined = process.env.STRIPE_WEBHOOK_SECRET; // <--- IMPORTANT: Type as string | undefined
    if (!webhookSecret) {
      console.error('Webhook Error: STRIPE_WEBHOOK_SECRET is not defined in environment variables.'); // Added more specific error log
      // Return 500 as this is a server configuration error, not a client error
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    // IMPORTANT: Ensure your `stripe` instance in '@/lib/stripe' is initialized with your actual API version.
    // Example: new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
    // The previous error 'Type "2024-06-20" is not assignable to type "2025-05-28.basil"'
    // indicates that your `@stripe/stripe-js` or backend `stripe` package expects a different version string.
    // Please make sure your '@/lib/stripe' initialization includes `apiVersion` set to the exact version
    // from your Stripe Dashboard (Developers -> API Keys -> API Version).
    // If you don't have control over `stripe` instance, you might need to use `Stripe.webhooks.constructEvent` directly here.
    event = stripe.webhooks.constructEvent( // <--- IMPORTANT: Assign to typed event variable
      body,
      signature,
      webhookSecret // <--- Use the typed webhookSecret
    );

    // console.log("Event", event, 29); // Removed unnecessary log
    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      const session = event.data.object as Stripe.CheckoutSession; // <--- IMPORTANT: Type assertion for session

      const userId: string | undefined = session.metadata?.userId; // <--- IMPORTANT: Type assertion and optional chaining
      const pdfId: string | undefined = session.metadata?.pdfId; // <--- IMPORTANT: Type assertion and optional chaining

      // console.log(session, userId, pdfId, 38); // Removed unnecessary log
      if (userId && pdfId) { // Check if userId and pdfId are defined before using
        await supabase
          .from('purchases')
          .insert([
            {
              user_id: userId, // userId is now guaranteed to be string
              pdf_id: pdfId,   // pdfId is now guaranteed to be string
              // IMPORTANT: Consider storing more details like Stripe Session ID, amount_total, currency, customer email, etc.
              // Example: stripe_session_id: session.id, amount_paid: session.amount_total, currency: session.currency
            },
          ])
          .select();
        console.log(`Purchase recorded for user ${userId} and PDF ${pdfId}.`); // Added log for successful insertion
      } else {
        console.warn('Webhook received for checkout.session.completed but userId or pdfId metadata was missing.');
      }
    } else {
      console.log(`Unhandled Stripe event type: ${event.type}`); // Log for unhandled event types
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) { // Catch any type of error
    console.error('Webhook Error processing request:', error.message); // <--- IMPORTANT: Use error.message for clearer logs
    // Return appropriate status code based on the error
    const statusCode = error.statusCode || (error.message.includes('No signatures found') || error.message.includes('No such event')) ? 400 : 500;
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: statusCode });
  }
}

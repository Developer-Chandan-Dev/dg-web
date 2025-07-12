// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe'; // Assuming this imports a configured Stripe instance
import { headers } from 'next/headers'; // To get headers in App Router
import { createSupabaseClient } from '@/lib/supabase'; // Your Supabase client setup
import Stripe from 'stripe'; // Import Stripe types

export async function POST(req: NextRequest) {
  const supabase = createSupabaseClient();
  let event: Stripe.Event; // Declare event variable here for broader scope

  try {
    // 1. Get the raw request body as text
    // This is crucial for signature verification, as you've correctly implemented.
    const body = await req.text();
    console.log("Raw webhook body received:", body.substring(0, 500) + "..."); // Log first 500 chars for brevity

    // 2. Get the Stripe signature header
    const signature = headers().get('stripe-signature');

    if (!signature) {
      console.error('Webhook Error: Stripe signature header is missing.');
      return NextResponse.json({ message: 'Stripe signature is missing.' }, { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Webhook Error: STRIPE_WEBHOOK_SECRET is not set in environment variables.');
      // In a real application, you might want to throw an error during deployment if this is missing.
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    // 3. Construct the event using Stripe.webhooks.constructEvent
    // This function automatically verifies the signature and throws an error if invalid.
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
    console.log("Webhook event received and verified:", event.type);

    // 4. Handle the event based on its type
    // Niche-specific: focusing on successful payments for course access
    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      const session = event.data.object as Stripe.CheckoutSession; // Cast to specific Stripe type
      console.log("Checkout Session Data:", JSON.stringify(session, null, 2));

      // Extract metadata from the session
      const userId = session.metadata?.userId as string | undefined; // Ensure type is string
      const pdfId = session.metadata?.pdfId as string | undefined; // Ensure type is string
      const customerEmail = session.customer_details?.email; // Get customer email for receipts/communication
      const paymentIntentId = typeof session.payment_intent === 'string' ? session.payment_intent : session.payment_intent?.id;


      console.log(`Extracted Metadata: userId=${userId}, pdfId=${pdfId}, email=${customerEmail}`);

      if (!userId || !pdfId) {
        console.error('Webhook Error: Missing userId or pdfId in session metadata.');
        // Consider alerting your team if essential metadata is missing.
        return NextResponse.json({ message: 'Missing essential metadata.' }, { status: 400 });
      }

      // 5. Update your database to record the purchase and grant access
      // Niche-specific: recording the purchase of a course note PDF
      const { data: purchase, error } = await supabase
        .from('purchases') // Your purchases table
        .insert([
          {
            user_id: userId,
            pdf_id: pdfId,
            // stripe_session_id: session.id, // Store session ID for reference
            // stripe_payment_intent_id: paymentIntentId, // Store Payment Intent ID
            // amount_total: session.amount_total, // Store amount paid (in cents/paise)
            // currency: session.currency, // Store currency
            // customer_email: customerEmail, // Store customer email
            // Add any other relevant details like payment status, timestamp, etc.
          },
        ])
        .select() // Select the inserted row to confirm
        .single(); // Expecting a single row inserted

      if (error) {
        console.error('Supabase Error (recording purchase):', error.message);
        // Important: If this fails, the user might not get access.
        // Consider a retry mechanism or alert system.
        return NextResponse.json({ message: 'Failed to record purchase in database.' }, { status: 500 });
      }

      console.log("Purchase recorded successfully:", purchase);

      // Niche-specific: Trigger additional actions after successful purchase
      // - Send a thank you email with download link (using a separate service like Nodemailer, Resend, or SendGrid)
      // - Invalidate a cache for user's courses
      // - Update user's accessible courses list in your frontend if using real-time updates
    } else if (event.type === 'invoice.payment_succeeded') {
        // This is important if you introduce subscriptions later.
        // For one-time purchases, checkout.session.completed is usually sufficient.
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`Invoice payment succeeded: ${invoice.id}`);
        // Handle subscription renewals or other invoice-based payments
        // You might need to fetch the associated Checkout Session or Subscription to get metadata.
    } else if (event.type === 'charge.refunded' || event.type === 'charge.dispute.created') {
        // Niche-specific: Handle refunds or disputes
        console.log(`Handling refund or dispute for event type: ${event.type}`);
        // Update user access, mark as refunded in DB, notify admins, etc.
    }
    // ... add more event handlers as needed

    // 6. Return a 200 OK response to Stripe
    // Stripe expects a 200 OK within a reasonable time (usually a few seconds).
    // If you have long-running tasks, offload them to a queue/background job.
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    console.error('Webhook processing error:', error.message);
    // Return 400 for errors like signature mismatch, 500 for internal server errors.
    return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: error.statusCode || 500 });
  }
}

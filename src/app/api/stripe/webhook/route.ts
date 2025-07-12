// app/api/stripe/webhook/route.ts
// This is a server-side API Route, so no 'use client' is needed.

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe'; // Import Stripe library and its types
import { createClient, SupabaseClient } from '@supabase/supabase-js'; // Import Supabase types

// --- 1. Supabase Client Setup (Type-Safe and complete) ---
// This function creates and returns a Supabase client configured for server-side use.
const createSupabaseClient = (): SupabaseClient => {
  // Ensure environment variables are present at build/runtime.
  // Using '!' for non-null assertion as these should be set in .env.local/Vercel.
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    // In a real deployment, this error should prevent the server from starting or be caught during build.
    // For a webhook, it's critical these are set.
    throw new Error('Supabase environment variables (URL or Service Role Key) are not set.');
  }

  return createClient(
    supabaseUrl,
    supabaseServiceRoleKey,
    {
      auth: {
        persistSession: false, // Prevents session storage on the server
      },
    }
  );
};

// --- 2. Stripe Client Setup (Type-Safe) ---
// Initialize the Stripe client with your secret key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // Ensure your API version matches what you're using in your Stripe dashboard.
  // This helps ensure type compatibility with Stripe's event objects.
  apiVersion: '2024-06-20',
});

// --- 3. Main Webhook Handler ---
export async function POST(req: NextRequest): Promise<NextResponse> {
  const supabase: SupabaseClient = createSupabaseClient(); // Explicitly type the supabase client

  try {
    // A) Get the raw request body as a string. This is essential for Stripe's signature verification.
    const rawBody: string = await req.text();
    // For debugging, you might log a truncated version:
    // console.log("Raw webhook body received (truncated):", rawBody.substring(0, 200) + "...");

    // B) Get the Stripe signature header from the incoming request.
    const signature: string | null = headers().get('stripe-signature');
    if (!signature) {
      console.error('Webhook Error: Stripe signature header is missing.');
      return NextResponse.json({ message: 'Stripe signature is missing.' }, { status: 400 });
    }

    // C) Retrieve the webhook secret from environment variables.
    const webhookSecret: string | undefined = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Webhook Error: STRIPE_WEBHOOK_SECRET environment variable is not set.');
      // A 500 status indicates a server configuration error, not a client (Stripe) error.
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    // D) Construct the event using Stripe.webhooks.constructEvent.
    // This function verifies the signature using the raw body and secret.
    // If verification fails, it throws an error caught by the try/catch block.
    const event: Stripe.Event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      webhookSecret
    );

    console.log(`Webhook Event Verified. Type: ${event.type}`);

    // --- 4. Event-Specific Business Logic (Niche: Online Course Notes) ---

    // Handle 'checkout.session.completed' and 'checkout.session.async_payment_succeeded' events.
    // These indicate a successful purchase flow.
    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      // Cast the event data object to the specific Stripe type for full type safety.
      const session: Stripe.CheckoutSession = event.data.object as Stripe.CheckoutSession;

      // Extract metadata (userId, pdfId) you attached during session creation.
      // Use optional chaining and nullish coalescing to safely get metadata properties.
      const userId: string | undefined = session.metadata?.userId;
      const pdfId: string | undefined = session.metadata?.pdfId;
      const customerEmail: string | undefined = session.customer_details?.email; // Safely get customer email

      console.log(`Processing Checkout Session: ID=${session.id}, User ID=${userId}, PDF ID=${pdfId}, Customer Email=${customerEmail}`);

      // Crucial check: Ensure essential metadata is present for fulfillment.
      if (!userId || !pdfId) {
        console.error('Webhook Error: Missing userId or pdfId in checkout session metadata. Cannot fulfill purchase.');
        // Return 200 to Stripe (payment was successful from their side), but log a critical error for your system.
        return NextResponse.json({ message: 'Missing essential metadata for purchase fulfillment.' }, { status: 200 });
      }

      // Record the purchase in your Supabase database.
      // This is where you grant access to the course notes.
      const { data: purchaseData, error: insertError } = await supabase
        .from('purchases') // Your Supabase table name for purchases
        .insert({
          user_id: userId,
          pdf_id: pdfId,
          // stripe_session_id: session.id, // Store Stripe Session ID for reference
          // amount_paid: session.amount_total, // Store amount in smallest currency unit (e.g., cents)
          // currency: session.currency,
          // customer_email: customerEmail, // Store for receipts/communication
          // purchase_date: new Date().toISOString(), // Store the purchase timestamp
          // Add other relevant purchase details as per your 'purchases' table schema
        })
        .select() // Select the inserted row
        .single(); // Expect a single row to be inserted

      if (insertError) {
        console.error('Supabase Error (recording purchase):', insertError.message);
        // Again, return 200 to Stripe but log this as a critical internal error.
        return NextResponse.json({ message: 'Failed to record purchase in database.' }, { status: 200 });
      }

      console.log('Purchase recorded successfully:', purchaseData);

      // --- Niche-specific Post-Purchase Actions (Optional, but common) ---
      // 1. Send a confirmation email to `customerEmail` with a link to download the notes.
      // 2. Invalidate a cache that stores user's accessible PDFs to ensure immediate access.
      // 3. Trigger a background job for any long-running fulfillment tasks.

    } else if (event.type === 'charge.refunded') {
      // Handle refunds: Update your database to mark the purchase as refunded.
      const charge = event.data.object as Stripe.Charge;
      console.log(`Charge refunded: ${charge.id}. Associated Payment Intent: ${charge.payment_intent}`);
      // Implement logic to update 'purchases' table, revoke access, notify user.

    } else if (event.type === 'charge.dispute.created') {
      // Handle disputes: Alert your team, temporarily suspend access.
      const dispute = event.data.object as Stripe.Dispute;
      console.log(`Dispute created: ${dispute.id}. Associated Charge: ${dispute.charge}`);
      // Implement dispute handling logic.

    } else {
      // Log any unhandled event types for awareness, but don't error out.
      console.warn(`Unhandled webhook event type received: ${event.type}`);
    }

    // --- 5. Return a successful response to Stripe ---
    // A 200 OK status code is crucial for Stripe to stop retrying the webhook.
    return NextResponse.json({ received: true }, { status: 200 });

  } catch (error: any) {
    // --- 6. Centralized Error Handling for the Webhook ---
    // Log the error for debugging.
    console.error('Webhook processing failed:', error.message);

    // Return an appropriate HTTP status code to Stripe.
    // 400 for client-side errors (like invalid signature), 500 for server errors.
    const statusCode = error.statusCode || (error.message.includes('No signatures found') ? 400 : 500);
    return NextResponse.json(
      { error: `Webhook Error: ${error.message}` },
      { status: statusCode }
    );
  }
}

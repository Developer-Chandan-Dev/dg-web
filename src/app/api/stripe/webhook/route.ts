// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe'; // your Stripe instance
import { headers } from 'next/headers';
import { createSupabaseClient } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  console.log('Webhook received');

  const supabase = createSupabaseClient();
  try {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
      throw new Error('Stripe signature is not defined');
    }

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
      const session = event.data.object;

      const userId = session.metadata?.userId;
      const pdfId = session.metadata?.pdfId;

      if (userId && pdfId) {
        await supabase
          .from('purchases')
          .insert([
            {
              user_id: userId,
              pdf_id: pdfId,
            },
          ])
          .select();

      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.log('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook Error' }, { status: 400 });
  }
}


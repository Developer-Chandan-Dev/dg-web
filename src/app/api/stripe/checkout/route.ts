import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
  try {
    
    // 1) Get the price, pdfId, and userId from the request body
    const { price, pdfId, userId } = await req.json();

    if (!price || !pdfId || !userId) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // 2) Create a checkout session
    const session = await stripe.checkout.sessions.create({
      // payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: `Course #${pdfId}`,
            },
            unit_amount: price * 100, // In paise
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      // cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      metadata: {
        pdfId,
        userId,
      },
    });

    console.log(pdfId, userId, 38);

    // 3) Return the session URL
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.log('Error creating checkout session:', error);
    return NextResponse.json(
      { message: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}

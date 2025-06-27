'use client';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CustomButton from './CustomButton';

interface BuyProps {
  pdfId: string;
  price: number;
  userId: string | null;
}

export const Buy = ({ pdfId, price, userId }: BuyProps) => {
  const router = useRouter();
  const { isSignedIn } = useUser();

  const handleClick = async () => {
    if (!isSignedIn) {
      router.push('/sign-in'); // 👈 redirect to Clerk sign-in
      return;
    }

    try {
      // 1) Create a Stripe Checkout Session
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pdfId, price, userId }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create checkout session. Status code: ${res.status}`);
      }

      // 2) Redirect to Stripe-Checkout Page
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (error) {
      console.log('Error creating checkout session:', error);
    }
  };

  return <CustomButton onClick={handleClick}>Buy Now</CustomButton>;
};

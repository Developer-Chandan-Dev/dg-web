// app/success/page.tsx
import { stripe } from '@/lib/stripe';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>; // Define searchParams as a Promise
}) {
  const resolvedSearchParams = await searchParams; // Resolve the Promise
  const sessionId = resolvedSearchParams?.session_id;

  if (!sessionId) {
    throw new Error('Session ID is required');
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  // Verify payment status
  if (session.payment_status !== 'paid') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2"> Payment Processing!</h1>
          <p className="text-gray-600">
            Your payment is still being processed. Please wait a moment
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">✅ Payment Successful!</h1>
        <p className="text-gray-600">Your session ID: {sessionId}</p>
      </div>
    </div>
  );
}

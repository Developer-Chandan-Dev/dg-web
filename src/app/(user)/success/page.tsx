import { PageProps } from "@/types/next";
// import { Metadata } from "next";
import React from "react";

// interface SuccessPageProps {
//   searchParams: {
//     payment_id?: string;
//     order_id?: string;
//   };
// }

export default async function SuccessPage({
  searchParams,
}: PageProps<{ payment_id: string; order_id: string }>): Promise<React.JSX.Element> {
  // Await the searchParams to resolve the promise
  const awaitedSearchParams = await searchParams;

  const paymentId = awaitedSearchParams?.payment_id;
  const orderId = awaitedSearchParams?.order_id;
  // Basic validation: Ensure a payment ID is present
  if (!paymentId) {
    // If paymentId is missing, it suggests an incomplete or incorrect redirect.
    // You might want to redirect to a generic error page or home page.
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-[#00000003] hover:bg-[#0000000f] dark:bg-[#ffffff0a] hover:dark:bg-[#ffffff14] rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Payment Error!
          </h1>
          <p className="text-gray-700 mb-4">
            It seems there was an issue confirming your payment.
            <br />
            No payment ID found.
          </p>
          <p className="text-gray-600 text-sm">
            Please check your email for a confirmation or contact support if you
            believe this is an error.
          </p>
        </div>
      </div>
    );
  }

  // --- No direct API calls to Razorpay needed here ---
  // The verification should have happened on your backend via /api/razorpay/verify-payment
  // or your Razorpay webhook. This page simply displays the success.

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="text-center p-6 bg-[#00000003] hover:bg-[#0000000f] dark:bg-[#ffffff0a] hover:dark:bg-[#ffffff14] rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Payment Successful!
        </h1>
        <p className="text-gray-700 mb-2">Thank you for your purchase!</p>
        <p className="text-gray-600 mb-4">
          Your course notes are now accessible.
        </p>

        {/* Display Razorpay Payment ID */}
        <p className="text-sm text-gray-500">
          Payment ID:{" "}
          <span className="font-mono text-gray-800">{paymentId}</span>
        </p>
        {/* Optionally display Order ID if you pass it */}
        {orderId && (
          <p className="text-sm text-gray-500">
            Order ID: <span className="font-mono text-gray-800">{orderId}</span>
          </p>
        )}

        {/* Add a button to go to the courses or dashboard */}
        <div className="mt-6">
          <p
            // href="/dashboard/my-courses" // Adjust this path to your user's course dashboard
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Visit Your Downloads Section
          </p>
        </div>
      </div>
    </div>
  );
}

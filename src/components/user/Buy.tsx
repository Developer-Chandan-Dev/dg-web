"use client";
import Script from "next/script";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";
import { useState } from "react";

// Declare global `window.Razorpay` for TypeScript
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => any;
  }
}

// Define a basic interface for Razorpay options for better type safety
interface RazorpayOptions {
  key: string;
  amount: number; // in paise
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => Promise<void>;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: {
    [key: string]: string | number;
  };
  theme?: {
    color: string;
  };
}

// Props for the Buy component
interface BuyProps {
  pdfId: string;
  price: number; // Price in your base currency (e.g., INR)
  userId: string | null; // userId can be null if user is not signed in
}

export const Buy = ({ pdfId, price, userId }: BuyProps) => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false); // <--- NEW STATE: Track Razorpay script load

  const handlePayment = async () => {
    // 1. Initial checks: User signed in, essential data available, and Razorpay script loaded
    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }
    if (!userId) {
      alert("User ID is missing. Please sign in again.");
      router.push("/sign-in");
      return;
    }
    // <--- IMPORTANT FIX: Check if Razorpay script is loaded before proceeding ---
    if (!isRazorpayLoaded || typeof window.Razorpay === 'undefined') {
        alert("Payment system is not ready. Please try again in a moment.");
        console.error("Razorpay script not loaded yet or window.Razorpay is undefined.");
        return;
    }

    setIsProcessing(true);

    try {
      // 2. Call your backend API to create a Razorpay Order
      const orderCreationResponse = await fetch("/api/razorpay/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pdfId, price, userId }),
      });

      if (!orderCreationResponse.ok) {
        const errorData = await orderCreationResponse.json();
        throw new Error(errorData.error || "Failed to create order on backend.");
      }

      const orderData = await orderCreationResponse.json();
      console.log("Razorpay Order created on backend:", orderData);

      if (!orderData.id || !orderData.amount || !orderData.currency || !orderData.key_id) {
        throw new Error("Missing essential order details from backend for checkout initialization.");
      }

      // 3. Prepare Razorpay Checkout options
      const options: RazorpayOptions = {
        key: orderData.key_id,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Skillsbazzar2",
        description: "Purchase Course Notes",
        order_id: orderData.id,

        // 4. Payment Handler (called on successful client-side payment)
        handler: async (paymentResponse) => {
          console.log("Client-side payment successful callback:", paymentResponse);
          setIsProcessing(true); // Keep processing true during verification

          try {
            // CRITICAL SECURITY STEP: Send payment response to your backend for verification
            const verificationResponse = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                pdfId: pdfId,
                userId: userId,
              }),
            });

            if (!verificationResponse.ok) {
              const errorData = await verificationResponse.json();
              throw new Error(errorData.error || "Payment verification failed on backend.");
            }

            const verificationResult = await verificationResponse.json();
            if (verificationResult.success) {
              console.log("Payment successfully verified and recorded on backend.");
              router.push(`/success?payment_id=${paymentResponse.razorpay_payment_id}`);
            } else {
              throw new Error(verificationResult.message || "Payment verification failed unexpectedly.");
            }
          } catch (verificationError: any) {
            console.error("Error during payment verification process:", verificationError);
            alert("Payment verification failed. Please contact support.");
            router.push(`/failed?error=${encodeURIComponent(verificationError.message || 'verification_failed')}`);
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user?.fullName || "Customer Name",
          email: user?.emailAddresses?.[0]?.emailAddress || "example@example.com",
        },
        notes: {
          pdfId: pdfId,
          userId: userId,
        },
        theme: {
          color: "#3399CC",
        },
      };

      // 5. Create and open the Razorpay payment modal
      const rzp1 = new window.Razorpay(options);
      rzp1.open();

      // 6. Add a listener for payment failure (client-side, before handler is called)
      rzp1.on('payment.failed', function (paymentFailureResponse: any) {
        console.error("Razorpay Payment Failed (Client-side):", paymentFailureResponse);
        alert("Payment failed: " + paymentFailureResponse.error.description || "Please try again.");
        setIsProcessing(false);
        router.push(`/failed?error=${encodeURIComponent(paymentFailureResponse.error.code || 'payment_failed')}`);
      });

    } catch (error: any) {
      console.error("Error initiating payment process:", error);
      alert("Could not start payment. " + (error.message || "Please try again later."));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Load Razorpay Checkout SDK script */}
      <Script
        id="razorpay-checkout-script"
        src="https://checkout.razorpay.com/v1/checkout.js"
        // <--- IMPORTANT FIX: Change strategy for earlier load ---
        strategy="afterInteractive" // Loads after hydration, typically before user interaction
        onLoad={() => {
          // <--- IMPORTANT FIX: Set state when script is loaded ---
          console.log("Razorpay script loaded successfully.");
          setIsRazorpayLoaded(true);
        }}
        onError={(e) => {
          console.error("Failed to load Razorpay script:", e);
          alert("Payment system could not load. Please check your internet connection.");
        }}
      />

      <CustomButton onClick={handlePayment} disabled={isProcessing || !isRazorpayLoaded}>
        {isProcessing ? "Processing..." : (!isRazorpayLoaded ? "Loading Payment System..." : "Buy Now")}
      </CustomButton>
    </>
  );
};



  // const handleClick = async () => {
  //   if (!isSignedIn) {
  //     router.push("/sign-in"); // 👈 redirect to Clerk sign-in
  //     return;
  //   }

  //   try {
  //     // 1) Create a Stripe Checkout Session
  //     const res = await fetch("/api/stripe/checkout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ pdfId, price, userId }),
  //     });

  //     if (!res.ok) {
  //       throw new Error(
  //         `Failed to create checkout session. Status code: ${res.status}`
  //       );
  //     }

  //     // 2) Redirect to Stripe-Checkout Page
  //     const data = await res.json();
  //     if (data.url) window.location.href = data.url;
  //   } catch (error) {
  //     console.log("Error creating checkout session:", error);
  //   }
  // };
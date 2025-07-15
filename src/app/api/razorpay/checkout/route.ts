import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

// --- Type Definition for incoming request body ---
interface CreateOrderRequestBody {
  pdfId: string; // Assuming pdfId is a string identifier
  price: number; // Assuming price is a number (e.g., integer in rupees, not paise)
  userId: string; // Assuming userId is a string identifier
}

// --- Initialize Razorpay instance ---
// IMPORTANT: Ensure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET are set in your .env.local (development)
// and Vercel/production environment variables.
// Using '!' asserts that these variables will be defined at runtime.
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!, // Add '!' for non-null assertion
  key_secret: process.env.RAZORPAY_KEY_SECRET!, // Add '!' for non-null assertion
});

export async function POST(request: NextRequest) {
  try {
    // 1. Parse and type the request body
    const { pdfId, price, userId }: CreateOrderRequestBody =
      await request.json();

    // 2. Input Validation (Crucial for API robustness)
    if (typeof pdfId !== "string" || !pdfId) {
      return NextResponse.json(
        { error: "Invalid or missing pdfId" },
        { status: 400 }
      );
    }
    if (typeof price !== "number" || price <= 0) {
      // Price should be a positive number
      return NextResponse.json(
        { error: "Invalid or missing price" },
        { status: 400 }
      );
    }
    if (typeof userId !== "string" || !userId) {
      return NextResponse.json(
        { error: "Invalid or missing userId" },
        { status: 400 }
      );
    }

    // 3. Create a Razorpay Order
    const options = {
      amount: price * 100, // Amount in paise (Razorpay expects smallest unit)
      currency: "INR", // Ensure this matches your Razorpay account currency
       receipt: `rcpt_${userId.substring(0,4)}_${String(Date.now()).slice(-6)}`, 
      notes: {
        userId: userId, // Ensure userId is passed as string
        pdfId: pdfId, // Ensure pdfId is passed as string
      },
      // You can add more options if needed, e.g., prefill customer details
      // https://razorpay.com/docs/api/orders/#create-an-order
    };

    // Use try-catch around external API calls for more granular error handling
    const order = await razorpay.orders.create(options);

    // 4. Return the order details to the client
    return NextResponse.json(
      {
        id: order.id,
        currency: order.currency,
        amount: order.amount,
        // It's common to also return the public key_id to the client
        // for initializing the Razorpay Checkout form.
        key_id: process.env.RAZORPAY_KEY_ID,
      },
      { status: 200 }
    );
  } catch (error: any) {
    // Explicitly type error as 'any' or 'unknown' and then check
    console.error("Error creating Razorpay order:", error);

    let errorMessage = "Failed to create Razorpay order";
    let statusCode = 500;

    // Check if it's a known error structure from Razorpay or a network error
    if (error.response && error.response.data) {
      errorMessage =
        error.response.data.description ||
        error.response.data.message ||
        errorMessage;
      statusCode = error.response.status || statusCode;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}

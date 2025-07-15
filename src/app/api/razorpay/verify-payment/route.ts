// src/app/api/razorpay/verify-payment/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
// import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createSupabaseClient } from "@/lib/supabase";

export async function POST(req: NextRequest): Promise<NextResponse> {
  const supabase = createSupabaseClient();

  try {
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      pdfId, // Destructure pdfId
      userId, // Destructure userId
    } = await req.json();

    console.log("Verification request received:", {
      razorpay_payment_id,
      razorpay_order_id,
      pdfId,
      userId,
    });

    if (
      !razorpay_payment_id ||
      !razorpay_order_id ||
      !razorpay_signature ||
      !pdfId ||
      !userId
    ) {
      console.error(
        "Verification Error: Missing required payment details or metadata."
      );
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required payment details or metadata for verification.",
        },
        { status: 400 }
      );
    }

    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!razorpayKeySecret) {
      console.error(
        "Verification Error: RAZORPAY_KEY_SECRET is not set in environment variables."
      );
      return NextResponse.json(
        {
          success: false,
          error: "Server configuration error: Razorpay secret not set.",
        },
        { status: 500 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature === razorpay_signature) {
      console.log("Razorpay Signature Verified Successfully!");

      // --- Database Update: Mark purchase as completed and store details ---
      // IMPORTANT: How you update/insert depends on your exact purchases table schema
      // and how you create the initial "pending" purchase entry (if any).

      // Option A: If you created a 'pending' purchase entry linked by razorpay_order_id
      // (This is often done right after creating the Razorpay order)
      const { data: updatedPurchase, error: updateError } = await supabase
        .from("purchases") // Your Supabase 'purchases' table
        .insert({
        pdf_id: pdfId, // Make sure your column name matches (e.g., pdf_id or pdfId)
        user_id: userId, // Make sure your column name matches (e.g., user_id or userId)
        razorpay_payment_id: razorpay_payment_id, // Store the payment ID
          razorpay_order_id: razorpay_order_id, // Find the record using the order ID
        })
        .select();

      if (updateError) {
        console.error(
          "Supabase Error (updating purchase status after verification):",
          updateError.message
        );
        return NextResponse.json(
          {
            success: false,
            error: "Failed to update purchase status in database.",
          },
          { status: 500 }
        );
      }

      console.log("Purchase record updated successfully:", updatedPurchase);

      return NextResponse.json(
        { success: true, message: "Payment verified successfully!" },
        { status: 200 }
      );
    } else {
      console.warn(
        "Razorpay Signature Verification Failed: Mismatch detected."
      );
      return NextResponse.json(
        {
          success: false,
          error: "Payment signature verification failed. Possible tampering.",
        },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error("Error during payment verification:", error.message);
    return NextResponse.json(
      {
        success: false,
        error: `Internal server error during verification: ${error.message}`,
      },
      { status: 500 }
    );
  }
}

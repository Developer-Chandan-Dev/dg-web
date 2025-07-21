// src/utils/save-user-to-supabase.ts

import { createSupabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export async function saveUserToSupabase() {
  const supabase = createSupabaseClient();
  const { userId } = await auth(); // get Clerk user ID

  if (!userId) return;

  // Check if user already exists
  const { data: existingUser, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("userId", userId)
    .single(); // Ensure your 'id' column in Supabase is named 'user_id' for this to match

  // If existingUser is not null, the user already exists, so we return.
  if (existingUser) {
    console.log("User already exists in Supabase. Skipping insert.");
    return;
  }

  // Handle fetchError:
  // If fetchError exists AND its code is NOT PGRST116 (no rows found),
  // then it's a genuine error we should halt for.
  // PGRST116 simply means no user was found, which is expected for new users.
  if (fetchError && fetchError.code !== 'PGRST116') {
    console.error("Error fetching user from Supabase:", fetchError);
    return; // Halt for genuine errors
  }

  // If we reach here, it means the user does not exist in Supabase (existingUser is null,
  // and either fetchError is null or it's PGRST116 which we've decided to ignore).
  console.log("User not found in Supabase. Proceeding to fetch Clerk details and insert.");

  // Get Clerk user details from Clerk API
  const res = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${process.env.CLERK_SECRET_KEY!}`,
    },
  });

  if (!res.ok) {
    console.error("Error fetching user details from Clerk API:", await res.text());
    return; // Handle Clerk API errors
  }

  const user = await res.json();

  // Note: Clerk's `id` is the `userId` passed to this function,
  // which you're using for the `user_id` column in Supabase.
  // Ensure your Supabase table schema correctly reflects this.
  const fullName = user.first_name + (user.last_name ? " " + user.last_name : ""); // Handle cases where last_name might be null
  const email = user.email_addresses?.[0]?.email_address;

  // Insert into Supabase
  const { error: insertError } = await supabase.from("users").insert([
    {
      userId: userId, // Assuming your column is named 'user_id'
      full_name: fullName,
      email,
    },
  ]);

  if (insertError) {
    console.error("Error inserting user into Supabase:", insertError);
  } else {
    console.log("User successfully inserted into Supabase:", userId);
  }
}
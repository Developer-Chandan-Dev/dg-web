import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import {createSupabaseClient} from "@/lib/supabase";

export async function POST(req: Request) {
    const { clerkUserId, email } = await req.json();

    const supabase = createSupabaseClient();

    const { data } = await supabase.from("users").select();
    console.log(data, 12);

    const { error } = await supabase
        .from("users")
        .upsert([{ clerk_user_id: clerkUserId, email }], {
            onConflict: "clerk_user_id",
        });

    console.log(data, error, '17');

    if (error) return NextResponse.json({ error }, { status: 500 });

    return NextResponse.json({ success: true });
}

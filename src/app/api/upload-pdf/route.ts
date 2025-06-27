// /app/api/upload-pdf/route.ts
import { getAuth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
    const { userId } = getAuth(req);

    if (userId !== "user_2ydSJTme16ok5Kmq8ngFLijfABI") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const formData = await req.formData();

    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);

    const buffer = Buffer.from(await file.arrayBuffer());

    const { data: uploaded, error: uploadError } = await supabase.storage
        .from("pdfs")
        .upload(`pdfs/${Date.now()}-${file.name}`, buffer, {
            contentType: file.type,
        });

    if (uploadError) {
        return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { error: dbError } = await supabase.from("pdf_courses").insert({
        title,
        description,
        price,
        file_url: uploaded?.path,
        // created_by: userId,
    });

    if (dbError) {
        return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}

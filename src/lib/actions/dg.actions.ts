"use server";
import { auth } from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";
import {createClient} from "@supabase/supabase-js";

// Action for uploading pdfs
export async function uploadPdfAction(formData: FormData) {
    const { userId } = await auth();
    if (userId !== "user_2ydSJTme16ok5Kmq8ngFLijfABI") {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const file = formData.get("file") as File;
    const thumbnail = formData.get("thumbnail") as File | null;

    const buffer = Buffer.from(await file.arrayBuffer());

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 📤 Upload PDF
    const { data: uploaded, error: uploadError } = await supabase.storage
        .from("pdfs")
        .upload(`pdfs/${Date.now()}-${file.name}`, buffer, {
            contentType: file.type,
        });

    if (uploadError) throw new Error(uploadError.message);

    // 🖼️ Upload Thumbnail (optional)
    let thumbnail_url: string | null = null;

    if (thumbnail instanceof File && thumbnail.size > 0) {
        const thumbBuffer = Buffer.from(await thumbnail.arrayBuffer());

        const { data: thumbUploaded, error: thumbError } = await supabase.storage
            .from("pdfs")
            .upload(`thumbnails/${Date.now()}-${thumbnail.name}`, thumbBuffer, {
                contentType: thumbnail.type,
            });

        if (thumbError) throw new Error(thumbError.message);
        thumbnail_url = thumbUploaded?.path || null;
    }

    // 📝 Insert into DB
    const { error: dbError } = await supabase.from("pdf_courses").insert({
        title,
        description,
        price,
        file_url: uploaded?.path,
        thumbnail_url,
        // created_by: userId,
    });

    if (dbError) throw new Error(dbError.message);

    return { success: true };
}

// Action for getting all pdfs
export const getAllCourses = async ({limit = 10, page = 1, title=""}: GetAllCourses) => {

    const supabase = createSupabaseClient();

    let query = supabase
        .from("pdf_courses")
        .select("id, title, description, price, thumbnail_url, created_at")
        .eq("disabled", false); // 👈 only get enabled courses

    if (title) {
        query = query.ilike('title', `%${title}%`);
    }
    query = query.range((page - 1) * limit, page * limit - 1);

    const {data: pdfs, error } = await query;

    if(error) throw new Error(error.message);

    return pdfs;
}

// Get course by Id
export const getCourseById = async (id: string) => {
    const supabase = createSupabaseClient();
    const { data: pdf, error } = await supabase
        .from("pdf_courses")
        .select("id, title, description, price, thumbnail_url, created_at")
        .match({ disabled: false, "id": id });

    if (error) throw new Error(error.message);
    return pdf[0]; // always return single result
};

// Action for purchase pdfs
export const purchasePdfAction = async (pdfId: string) => {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { error } = await supabase.from("purchases").insert({
        user_id: userId,
        pdf_id: pdfId,
    });

    if (error) throw new Error(error.message);

    return { success: true };
};


export const downloadPdfAction = async (pdfId: string) => {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized");

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: purchase } = await supabase
        .from("purchases")
        .select()
        .eq("user_id", userId)
        .eq("pdf_id", pdfId)
        .single();

    if (!purchase) throw new Error("Not purchased");

    const { data: pdf } = await supabase
        .from("pdf_courses")
        .select("file_url")
        .eq("id", pdfId)
        .single();

    if (!pdf) throw new Error("PDF not found");

    const { data: url } = await supabase.storage
        .from("pdfs")
        .createSignedUrl(pdf.file_url, 120); // valid 120 sec

    if (!url) throw new Error("Failed to generate link");

    return { url: url.signedUrl };
};


// Action for updating pdfs
export async function updatePdfCourseAction(id: string, formData: FormData) {
    const { userId } = await auth();
    if (userId !== "user_2ydSJTme16ok5Kmq8ngFLijfABI") {
        throw new Error("Unauthorized");
    }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);

    const newPdfRaw = formData.get("file");
    const newThumbRaw = formData.get("thumbnail");

    const newPdf = newPdfRaw instanceof File && newPdfRaw.size > 0 ? newPdfRaw : null;
    const newThumb = newThumbRaw instanceof File && newThumbRaw.size > 0 ? newThumbRaw : null;

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 🧾 Get old course
    const { data: old, error: oldError } = await supabase
        .from("pdf_courses")
        .select("*")
        .eq("id", id)
        .single();

    if (oldError || !old) throw new Error("Course not found");

    let file_url = old.file_url;
    let thumbnail_url = old.thumbnail_url;

    // ✅ Replace PDF if provided
    if (newPdf) {
        await supabase.storage.from("pdfs").remove([old.file_url]);
        const buffer = Buffer.from(await newPdf.arrayBuffer());
        const { data: uploaded, error } = await supabase.storage
            .from("pdfs")
            .upload(`pdfs/${Date.now()}-${newPdf.name}`, buffer, {
                contentType: newPdf.type,
            });

        if (error) throw new Error("Failed to upload new PDF");
        file_url = uploaded?.path!;
    }

    // ✅ Replace Thumbnail if provided
    if (newThumb) {
        if (old.thumbnail_url) {
            await supabase.storage.from("pdfs").remove([old.thumbnail_url]);
        }
        const buffer = Buffer.from(await newThumb.arrayBuffer());
        const { data: uploaded, error } = await supabase.storage
            .from("pdfs")
            .upload(`thumbnails/${Date.now()}-${newThumb.name}`, buffer, {
                contentType: newThumb.type,
            });

        if (error) throw new Error("Failed to upload new thumbnail");
        thumbnail_url = uploaded?.path!;
    }

    // 📥 Update DB
    const { error: updateError } = await supabase
        .from("pdf_courses")
        .update({
            title,
            description,
            price,
            file_url,
            thumbnail_url,
        })
        .eq("id", id);

    if (updateError) throw new Error(updateError.message);

    return { success: true };
}


// Action for deleting a PDF course
export async function deletePdfCourseAction(id: string) {
    const { userId } = await auth();
    if (userId !== "user_2ydSJTme16ok5Kmq8ngFLijfABI") {
        throw new Error("Unauthorized");
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 🧾 Fetch the course to get file paths
    const { data, error: fetchError } = await supabase
        .from("pdf_courses")
        .select("file_url, thumbnail_url")
        .eq("id", id)
        .single();

    if (fetchError || !data) {
        throw new Error("PDF course not found");
    }

    // 🧹 Prepare files to delete
    const removeList: string[] = [];
    if (data.file_url) removeList.push(data.file_url);
    if (data.thumbnail_url) removeList.push(data.thumbnail_url);

    if (removeList.length > 0) {
        const { error: removeError } = await supabase.storage
            .from("pdfs")
            .remove(removeList);

        if (removeError) {
            throw new Error("Failed to delete storage files");
        }
    }

    // 🗑️ Delete DB record
    const { error: deleteError } = await supabase
        .from("pdf_courses")
        .delete()
        .eq("id", id);

    if (deleteError) {
        throw new Error(deleteError.message);
    }

    return { success: true };
}

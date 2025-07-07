'use server';

import { auth } from '@clerk/nextjs/server';
import { createSupabaseClient } from '../supabase';

export const purchaseCourse = async (pdfId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error('Unauthorized');

  const supabase = createSupabaseClient();

  const { error } = await supabase.from('purchases').insert({
    user_id: userId,
    pdf_id: pdfId,
  });

  if (error) throw new Error(error.message);

  return { success: true };
};

export const downloadPdfAction = async (pdfId: string) => {
  const { userId } = await auth();

  if (!userId) throw new Error('Unauthorized');

  const supabase = createSupabaseClient();

  const { data: purchase } = await supabase
    .from('purchases')
    .select()
    .eq('user_id', userId)
    .eq('pdf_id', pdfId)
    .single();

  if (!purchase) throw new Error('Not purchased');

  const { data: pdf } = await supabase
    .from('pdf_courses')
    .select('file_url')
    .eq('id', pdfId)
    .single();

  if (!pdf) throw new Error('PDF not found');

  const { data: url } = await supabase.storage
    .from('pdfs')
    .createSignedUrl(pdf.file_url, 120); // valid 120 sec

  if (!url) throw new Error('Failed to generate link');

  return { url: url.signedUrl };
};

// export const

export const hasUserPurchased = async (userId: string, pdfId: string) => {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('purchases')
    .select('id')
    .eq('user_id', userId) // use `customer_id` or `user_id` based on your column
    .eq('pdf_id', pdfId)
    .single(); // only need one row to confirm purchase

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = No rows found, which is OK for this case
    console.error('Error checking purchase:', error.message);
    throw new Error(error.message);
  }

  return !!data; // return true if a purchase exists
};

type PurchasedCourse = {
  id: string; // purchase id
  user_id: string; // user id
  purchased_at: string, // purchase timestamp
  pdf_courses: {
    id: string;
    title: string;
    price: number;
    // thumbnail_url: string;
    // file_url: string;
  };
};

export async function getPurchasedCoursesById(userId: string) {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from('purchases')
    .select('id, userId, purchased_at, pdf_courses(id,title, price)')
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching purchases:', error.message);
    return [];
  }

  return (data as unknown as PurchasedCourse[]).map((item) => ({
    purchaseId: item.id,
    userId: item.user_id,
    purchasedAt: item.purchased_at,
    title: item.pdf_courses.title,
    price: item.pdf_courses.price,
    // thumbnailUrl: item.pdf_courses.thumbnail_url,
    // downloadUrl: item.pdf_courses.file_url,
  }));
}

export async function getPurchasedCourses() {
  const supabase = createSupabaseClient();
  console.log('Fetching all purchases');
  const { data, error } = await supabase
    .from('purchases')
    .select('id, user_id, purchased_at, pdf_courses(id,title, price)');

  if (error) {
    console.error('Error fetching purchases:', error.message);
    return [];
  }
  console.log(data, '121');
  return (data as unknown as PurchasedCourse[]).map((item) => ({
    purchaseId: item.id,
    userId: item.user_id,
    purchasedAt: item.purchased_at,
    title: item.pdf_courses.title,
    price: item.pdf_courses.price,
    // thumbnailUrl: item.pdf_courses.thumbnail_url,
    // downloadUrl: item.pdf_courses.file_url,
  }));
}

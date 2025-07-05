// src/app/(user)/courses/[id]/page.tsx

import { Metadata } from 'next';
import Image from 'next/image';
import type { PageProps } from '@/types/next';
import { IndianRupee } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { getCourseById } from '@/lib/actions/pdf_courses.actions';
import { hasUserPurchased } from '@/lib/actions/purchases.action';
import { Buy } from '@/components/user/Buy';
import { Download } from '@/components/user/Download';

// ✅ DO NOT declare any custom interface for params
export async function generateMetadata({
  params,
}: PageProps<{ id: string }>): Promise<Metadata> { // Add generic type for params
  const resolvedParams = await params; // Await params
  const course = await getCourseById(resolvedParams.id);

  return {
    title: course?.title
      ? `${course.title} - Courses`
      : 'Course | Skillsbazzar2',
    description: course?.description || 'Detailed course information.',
    openGraph: {
      title: course?.title || 'Course | Skillsbazzar2',
      description: course?.description || 'Detailed course information.',
      images: [
        {
          url: course?.thumbnail_url
            ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/pdfs/${course.thumbnail_url}`
            : '/images/preview-image.webp',
        },
      ],
    },
  };
}

export default async function CoursePage({ params }: PageProps<{ id: string }>) { // Add generic type for params
  const resolvedParams = await params; // Await params
  const pdf = await getCourseById(resolvedParams.id);
  const { userId } = await auth();

  const alreadyPurchased = pdf?.id
    ? await hasUserPurchased(userId || '', pdf.id)
    : false;

  return (
    <section className="w-full xl:w-[1200px] h-auto mx-auto">
      <div className="flex items-center justify-center flex-col w-full text-center mx-auto py-10">
        <div className="lg:flex px-10 py-10 h-auto justify-between items-center w-full text-left mx-auto ">
          <div className="lg:w-[45%] flex items-center justify-center flex-col">
            <Image
              src={
                pdf?.thumbnail_url
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/pdfs/${pdf.thumbnail_url}`
                  : '/images/preview-image.webp'
              }
              className="rounded-full max-lg:mx-auto w-[300px] p-2 ring-5 ring-cyan-500 shadow-lg shadow-cyan-700"
              alt="PDF Thumbnail"
              width={450}
              height={450}
            />
            <div className="w-80 h-auto bg-[#0000000a] dark:bg-[#ffffff12] rounded-[6px] flex items-center justify-center flex-col py-3 mt-7 shadow-lg shadow-cyan-700/50">
              <div className="flex items-center gap-4 justify-center flex-col pb-2 mt-4">
                <p className="py-1 flex items-center gap-x-[2px]">
                  <IndianRupee className="size-4" />
                  <span>{pdf?.price ? `${pdf.price}.00` : 'Not Added'}</span>
                </p>
                {!userId ? (
                  <p className="text-red-500">
                    Please sign in to buy this course.
                  </p>
                ) : alreadyPurchased ? (
                  <Download pdfUrl={pdf?.file_url || ''} />
                ) : (
                  <Buy
                    pdfId={pdf?.id || ''}
                    price={pdf?.price || 0}
                    userId={userId}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-[45%]">
            <h2 className="py-3 max-lg:mt-5">{pdf?.title || 'Course Title'}</h2>
            <p className="py-2">
              {pdf?.description || 'No description available.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
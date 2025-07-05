// app/(user)/courses/[id]/page.tsx
import { Metadata } from 'next';
import Image from 'next/image';
import { Buy } from '@/components/user/Buy';
import { getCourseById } from '@/lib/actions/pdf_courses.actions';
import { IndianRupee } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { hasUserPurchased } from '@/lib/actions/purchases.action';
import { Download } from '@/components/user/Download';

type PageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const course = await getCourseById(params.id);

  return {
    title: course?.title ? `${course.title} - Courses` : 'Course | Skillsbazzar2',
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

const CoursePage = async ({ params }: PageProps) => {
  const pdf = await getCourseById(params.id);
  const { userId } = await auth();

  const alreadyPurchased = pdf?.id
    ? await hasUserPurchased(userId || '', pdf.id)
    : false;

  return (
    <section className="w-full xl:w-[1200px] mx-auto">
      <div className="flex flex-col items-center py-10 text-center">
        <div className="lg:flex justify-between items-center w-full px-10">
          <div className="lg:w-[45%] flex flex-col items-center">
            <Image
              src={
                pdf?.thumbnail_url
                  ? `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/pdfs/${pdf.thumbnail_url}`
                  : '/images/preview-image.webp'
              }
              className="rounded-full w-[300px] p-2 ring-4 ring-cyan-500 shadow-lg"
              alt="PDF Thumbnail"
              width={450}
              height={450}
            />
            <div className="w-80 mt-7 bg-[#0000000a] dark:bg-[#ffffff12] rounded-[6px] py-3 shadow-lg">
              <div className="flex flex-col gap-4 items-center">
                <p className="flex items-center gap-1">
                  <IndianRupee className="size-4" />
                  <span>{pdf?.price ? `${pdf.price}.00` : 'Not Added'}</span>
                </p>
                {!userId ? (
                  <p className="text-red-500">Please sign in to buy this course.</p>
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

          <div className="lg:w-[45%] mt-10 lg:mt-0">
            <h2 className="py-3">{pdf?.title || 'Course Title'}</h2>
            <p>{pdf?.description || 'No description available.'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePage;

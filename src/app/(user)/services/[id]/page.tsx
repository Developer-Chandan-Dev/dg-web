import Image from 'next/image';
import { Buy } from '@/components/user/Buy';
import { getCourseById } from '@/lib/actions/dg.actions';
import { IndianRupee } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';

const CoursePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const resolvedParams = await params; // Resolve the params if it's a Promise
  const pdf = await getCourseById(resolvedParams.id);
  const { userId } = await auth(); // ✅ Correctly extract userId from Clerk

  return (
    <section className="w-full xl:w-[1200px] h-auto mx-auto">
      <div className="flex items-center justify-center flex-col w-full text-center mx-auto py-10">
        <div className="lg:flex px-10 py-10 h-auto justify-between items-center w-full text-left mx-auto ">
          <div className="lg:w-[45%] flex items-center justify-center flex-col">
            <Image
              src={
                `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pdfs/${pdf?.thumbnail_url}` ||
                '/images/courses/affiliate-marketing.jpg'
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
                  <span>{pdf?.price || 'Not Added'}.00</span>
                </p>
                <Buy pdfId={pdf?.id} price={pdf?.price} userId={userId} />{' '}
                {/* ✅ Pass userId */}
              </div>
            </div>
          </div>

          <div className="lg:w-[45%]">
            <h2 className="py-3 max-lg:mt-5">{pdf?.title || 'Course Title'}</h2>
            <p className="py-2">{pdf?.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoursePage;

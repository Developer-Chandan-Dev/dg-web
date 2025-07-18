import Image from "next/image";
import { getAllCourses } from "@/lib/actions/pdf_courses.actions";
import Link from "next/link";

export const dynamic = "force-dynamic"; // OR omit if you remove all dynamic logic

export default async function CoursesPage() {
  const pdfs = await getAllCourses({ title: "" });

  return (
    <section className="w-full xl:w-[1200px] h-auto mx-auto">
      <div className="flex h-96 items-center justify-center flex-col w-full text-center mx-auto">
        <div className="w-[90%] sm:w-[60%] lg:w-[50%]">
          <h1 className="py-3">Our Courses</h1>
          <p className="py-2">
            {process.env.NEXT_PUBLIC_WEBSITE_NAME} is an online platform for
            Digital Marketing Courses. You can download knowledgeable courses
            from here and get PDFs for reading. Browse our curated list of
            digital marketing courses. Learn SEO, social media, email marketing,
            and more — anytime, anywhere.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center sm:w-[600px] md:w-[750px] lg:w-[1000px] xl:w-[1200px] gap-4 py-10 flex-wrap">
        {pdfs.map((course) => (
          <div
            key={course.id}
            className="feature-card w-72 px-5 h-auto pt-6 pb-4 flex-center text-center"
          >
            <Link href={`/courses/${course.id}`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pdfs/${course.thumbnail_url}`}
                alt={course.title}
                width={245}
                height={150}
                className="h-40 rounded-lg overflow-hidden object-cover"
              />
              <h4 className="font-semibold mt-3 py-2">{course.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

import React from 'react';
import Image from 'next/image';
import { getAllCourses } from '@/lib/actions/dg.actions';
import Link from 'next/link';
import CustomButton from '@/components/user/CustomButton';

const FeaturedCourses = async () => {
  const featuredCourses = await getAllCourses({ title: '', limit: 4 });

  return (
    <section className="py-20 w-full h-auto">
      <div className="flex items-center xl:w-[1200px] justify-center flex-col w-full text-center mx-auto">
      <div className={"w-11/12 md:w-[50%]"}>
          <h2 className="py-3">
            Featured Digital{' '}
            <span className="gradient-text">
              Marketing
              <br /> Courses
            </span>
          </h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab
            accusamus adipisci alias aliquam animi consectetur dignissimos...
          </p>
        </div>

        <div className="flex items-center justify-center w-full gap-4 py-10 flex-wrap">
          {featuredCourses?.map(
            (course: { id: string; title: string; thumbnail_url?: string }) => (
              <Link key={course.id} href={`/services/${course.id}`}>
                <div className="feature-card w-72 px-5 h-auto pt-6 pb-4 flex-center text-center cursor-pointer">
                <Image
                    src={
                      course.thumbnail_url
                        ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/pdfs/${course.thumbnail_url}`
                        : '/images/courses/affiliate-marketing.jpg'
                    }
                    alt={course.title}
                    width={245}
                    height={150}
                    className="h-40 rounded-lg object-cover"
                  />
                  <h4 className="font-semibold mt-3 py-2">{course.title}</h4>
                </div>
              </Link>
            )
          )}
        </div>
        <div>
          <Link href={'/services'}>
            <CustomButton>Explore more...</CustomButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;

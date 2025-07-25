import React from "react";
import HeroSection from "@/components/user/HeroSection";
import { Globe, Lightbulb, MapPinned, Settings } from "lucide-react";
import SmallCard from "@/components/user/SmallCard";
import MediumCard from "@/components/user/MediumCard";
import HomeCarousel from "@/components/user/HomeCarousel";
import TestimonialCard from "@/components/user/TestimonialCard";
import { ourExperts, testimonials } from "@/constants";
import CustomButton from "@/components/user/CustomButton";
import FeaturedCourses from "@/components/user/FeaturedCourses";
import { CometCardDemo } from "@/components/user/CometCardDemo";
import { InfiniteMovingCardsDemo } from "@/components/user/InfiniteMovingCardsDemo";

export const dynamic = "force-dynamic"; // Force dynamic rendering

const Page = () => {
  return (
    <>
      {/*<SyncUser />*/}
      <section className={" w-full text-var(--home-foreground)"}>
        <HeroSection />

        <section className={"py-20 w-full h-auto "}>
          <div
            className={
              "flex items-center xl:w-[1200px] justify-center flex-col w-full text-center mx-auto "
            }
          >
            <div className={"w-11/12 md:w-[50%]"}>
              <h2 className={"py-3"}>
                Grow With Our{" "}
                <span className={"gradient-text"}>
                  Digital
                  <br /> Marketing Experts
                </span>
              </h2>
              <p>
                Accelerate your business growth with strategies crafted by
                certified digital marketing professionals. We help you stand out
                in the digital world.
              </p>
            </div>
            <div
              className={
                "flex items-center justify-center gap-4 max-xl:px-5 py-10 flex-wrap mx-auto"
              }
            >
              {ourExperts.map((expert) => (
                // <MediumCard key={expert.id} {...expert} />
                <CometCardDemo key={expert.id} {...expert} />
              ))}
            </div>
          </div>
        </section>

        <FeaturedCourses />

        <section
          className={"py-20 w-full h-auto bg-white dark:bg-transparent "}
        >
          <div
            className={
              "flex items-center xl:w-[1200px] justify-center w-full mx-auto gap-10 text-left flex-wrap"
            }
          >
            <div className={"px-5 md:px-5 w-full md:w-[90%] lg:w-[50%]"}>
              <h2 className={"py-4"}>
                Why you need <br />{" "}
                <span className={"gradient-text"}>Digital Marketing</span>
              </h2>
              <p>
                In today's digital age, traditional marketing isn't enough.
                Digital marketing helps businesses reach a wider audience, build
                brand awareness, and drive more sales. It's cost-effective,
                measurable, and allows targeted customer engagement.
              </p>
              <br />
              <p>
                Whether you're a startup or a growing brand, digital marketing
                is essential for staying competitive. Gain visibility, connect
                with your audience, and grow faster online with the power of
                digital tools and platforms.
              </p>
              <CustomButton size={"sm"} className={"mt-5"}>
                Read More...
              </CustomButton>
            </div>
            <div
              className={
                "flex max-md:w-[90%] items-center justify-center mx-auto flex-wrap max-sm:px-5 sm:grid gap-5 sm:grid-cols-1 lg:grid-cols-2 py-10"
              }
            >
              <SmallCard
                icon={
                  <Globe
                    className={
                      "w-12 text-[#96c4fa] h-12 p-3 mb-2 bg-[#0000000a] dark:bg-[#ffffff12] rounded-[6px] flex items-center justify-center"
                    }
                  />
                }
                text={"Themes"}
              />
              <SmallCard
                icon={
                  <Lightbulb
                    className={
                      "w-12 text-[#96c4fa] h-12 p-3 mb-2 bg-[#0000000a] dark:bg-[#ffffff12] rounded-[6px] flex items-center justify-center"
                    }
                  />
                }
                text={"Local History"}
              />
              <SmallCard
                icon={
                  <Settings
                    className={
                      "w-12 text-[#96c4fa] h-12 p-3 mb-2 bg-[#0000000a] dark:bg-[#ffffff12] rounded-[6px] flex items-center justify-center"
                    }
                  />
                }
                text={"Web Support"}
              />
              <SmallCard
                icon={
                  <MapPinned
                    className={
                      "w-12 text-[#96c4fa] h-12 p-3 mb-2 bg-[#0000000a] dark:bg-[#ffffff12] rounded-[6px] flex items-center justify-center"
                    }
                  />
                }
                text={"Accessbility"}
                // text={"MARKETING STRATEGY & SEO CAMPAIGNS"}
              />
            </div>
          </div>
        </section>

        <section className={"py-20 w-full h-auto "}>
          <div
            className={
              "flex items-center xl:w-[1200px] justify-center flex-col w-full text-center mx-auto "
            }
          >
            <div className={"w-11/12 md:w-[50%]"}>
              <h2 className={"py-3"}>
                Our Modern Office<span className={"gradient-text"}> Space</span>
              </h2>
              <p>
                Step inside our creatively designed workspace that inspires
                innovation and productivity. We believe a great environment
                fuels great ideas.
              </p>
            </div>
            <div className={" w-full sm:w-11/12 mx-auto px-2 sm:px-10 py-10"}>
              <HomeCarousel />
            </div>
          </div>
        </section>

        <section className="body-font bg-[var(--background)] text-[var(--foreground)] ">
          <div className="container px-5 py-24 mx-auto">
            <h2 className=" title-font text-gray-900 dark:text-gray-100 mb-12 text-center">
              Testi<span className={"gradient-text"}>monials</span>
            </h2>
            <div className="flex flex-wrap -m-4">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
              <div className={"w-full flex items-center justify-center mt-5"}>
                <CustomButton size={"sm"} className={"mx-auto"}>
                  Explore more...
                </CustomButton>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="body-font bg-[var(--background)] text-[var(--foreground)] ">
          <div className="container px-5 py-24 mx-auto">
            <h2 className=" title-font text-gray-900 dark:text-gray-100 mb-12 text-center">
              Testi<span className={"gradient-text"}>monials</span>
            </h2>
            <div className="flex flex-wrap -m-4">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
              <InfiniteMovingCardsDemo/>
              <div className={"w-full flex items-center justify-center mt-5"}>
                <CustomButton size={"sm"} className={"mx-auto"}>
                  Explore more...
                </CustomButton>
              </div>
            </div>
          </div>
        </section> */}
      </section>
    </>
  );
};
export default Page;

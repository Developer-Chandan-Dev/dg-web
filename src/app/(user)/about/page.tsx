import React from 'react'
import Image from "next/image";
import {FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon} from "lucide-react";
import Link from "next/link";
import CustomButton from "@/components/user/CustomButton";

const AboutPage = () => {
    return (
        <section className={"w-full xl:w-[1200px] mx-auto h-auto"}>
            <div className={"flex h-96 items-center justify-center flex-col w-full text-center mx-auto "}>
                <div className={" w-[90%] sm:w-[60%] lg:w-[50%]"}>
                    <h1 className={"py-3"}>
                        About Page
                    </h1>
                    <p className={"py-2"}>DB Web is a online platform for Digital Marketing Courses you can download
                        knowledgable courses from
                        here and get pdf for reading.</p>
                </div>

            </div>

            <div
                className={"lg:flex px-10 py-10 h-auto justify-between items-center w-full text-left mx-auto "}>
                <div className={"lg:w-[45%]"}>
                    <Image src={"/images/d-1.webp"} alt={"d-1"} width={450} height={450}/>
                </div>
                <div className={"lg:w-[45%]"}>
                    <h2 className={"py-3 max-lg:mt-5"}>Discover the SkillsBazzar Difference Empowering Your Career
                        Growth</h2>
                    <p className={"py-2"}>
                        At SkillsBazzar, we are passionate about empowering individuals with the skills and knowledge
                        they need to achieve their career goals. Our platform offers a wide range of courses and
                        training programs, delivered by industry experts, to help you stay ahead in today’s fast-paced
                        and competitive job market. We believe that learning should be accessible to everyone, which is
                        why we strive to make our courses affordable and flexible, allowing you to learn at your own
                        pace and on your own schedule. Join us today and take the first step towards achieving your
                        professional aspirations.
                    </p>
                    <CustomButton size={"sm"} className={"mt-3"}>Get Started</CustomButton>
                </div>
            </div>


            <div className={"flex items-center justify-center flex-col w-full text-center mx-auto py-10"}>
                <div className={"w-full lg:w-[50%] lg:px-10 px-5"}>
                    <h2 className={"py-3"}>Meet Our Company <span
                        className={"gradient-text"}>CEO<br/> & Founder</span>
                    </h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab accusamus adipisci alias aliquam
                        animi consectetur dignissimos, eius, facere harum id iure, nobis numquam odit quae qui quia
                        tempora tenetur voluptatibus.</p>
                </div>
                <div className={"lg:flex px-10 py-10 h-auto justify-between items-center w-full text-left mx-auto "}>
                    <div className={"lg:w-[45%] flex items-center justify-center flex-col"}>
                        <Image src={"/images/user3.jpg"}
                               className={"rounded-full max-lg:mx-auto w-[300px] p-2 ring-5 ring-cyan-500 shadow-lg shadow-cyan-700"}
                               alt={"Founder & CEO"} width={450} height={450}/>
                        <div
                            className={"w-80 h-auto bg-[#0000000a] dark:bg-[#ffffff12] rounded-[6px] flex items-center justify-center flex-col py-3 mt-7 shadow-lg shadow-cyan-700/50"}>
                            <p className={"py-1"}>Founder & CEO</p>
                            <h4 className={"gradient-text font-bold"}>Karan <span
                                className={"gradient2-text"}>Deshmukh</span></h4>
                            <div className="flex items-center gap-4 justify-center pb-2 mt-4">
                                <Link href={"/https://instagram.com"}>
                                    <div
                                        className={"flex-center bg-cyan-500 text-white size-8 rounded-full shadow-xl shadow-cyan-700 transition-all hover:shadow-[0px_0px_25px_cyan] hover:-translate-y-1"}
                                    >
                                        <InstagramIcon className={"size-5"}/>
                                    </div>
                                </Link>
                                <Link href={"/https://twitter.com"}>
                                    <div
                                        className={"flex-center bg-cyan-500 text-white size-8 rounded-full shadow-xl shadow-cyan-700 transition-all hover:shadow-[0px_0px_25px_cyan] hover:-translate-y-1"}
                                    >
                                        <TwitterIcon className={"size-5"}/>
                                    </div>
                                </Link>
                                <Link href={"/https://facebook.com"}>
                                    <div
                                        className={"flex-center bg-cyan-500 text-white size-8 rounded-full shadow-xl shadow-cyan-700 transition-all hover:shadow-[0px_0px_25px_cyan] hover:-translate-y-1"}
                                    >
                                        <FacebookIcon className={"size-5"}/>
                                    </div>
                                </Link>
                                <Link href={"/https://linkedin.com"}>
                                    <div
                                        className={"flex-center bg-cyan-500 text-white size-8 rounded-full shadow-xl shadow-cyan-700 transition-all hover:shadow-[0px_0px_25px_cyan] hover:-translate-y-1"}>
                                        <LinkedinIcon className={"size-5"}/>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={"lg:w-[45%]"}>
                        <h2 className={"py-3 max-lg:mt-5"}>Karan Deshmukh</h2>
                        <p className={"py-2"}>
                            Karan has a knack for crafting high-converting ad funnels, particularly for e-commerce. With
                            experience managing over ₹1 crore in ad spend, he optimizes campaigns for maximum ROI while
                            keeping ad fatigue in check.
                            <br/><br/>
                            At SkillsBazzar, we are passionate about empowering individuals with the skills and
                            knowledge
                            they need to achieve their career goals. Our platform offers a wide range of courses and
                            training programs, delivered by industry experts, to help you stay ahead in today’s
                            fast-paced
                            and competitive job market. We believe that learning should be accessible to everyone, which
                            is
                            why we strive to make our courses affordable and flexible, allowing you to learn at your own
                            pace and on your own schedule. Join us today and take the first step towards achieving your
                            professional aspirations.
                        </p>
                        <CustomButton className={"mt-4"} size={"md"}>Get Started</CustomButton>
                        {/*<Button className={"mt-3"}>Get Started</Button>*/}
                    </div>
                </div>
            </div>


        </section>
    )
}
export default AboutPage

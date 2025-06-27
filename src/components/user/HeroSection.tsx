"use client";
import React, {useEffect} from 'react'
import Image from "next/image";
import gsap from 'gsap';
import CustomButton from "@/components/user/CustomButton";

const HeroSection = () => {

    useEffect(() => {
        gsap.to(".animationUpDown", {
            y: -10,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            stagger: 0.3,
            ease: 'power1.inOut',
        });
    }, []);

    return (
        <div className="w-full xl:w-[1200px] h-auto mx-auto flex items-center justify-start max-md:flex-col-reverse">
            <div className="animationUpDown w-full lg:w-[50%] px-8 py-10 max-sm:text-center">
                <h3 className={"animationUpDown py-2 font-semibold text-xl"}>Make Your Business With</h3>
                <h1 className={"animationUpDown max-sm:text-4xl max-sm:leading-[50px] py-3 leading-[56px]"}>Discover Skills That<br className='hidden sm:block' />
                    {' '}Build Your Career{' '}<br className='hidden sm:block' />
                    by Results</h1>
                <p className="animationUpDown py-2">Your business deserves individual attention and a strategy tailored to your goals.
                    In other
                    words, you deserve to be treated like a partner in your digital efforts.</p>
                <CustomButton rounded={"full"} ringColor={"red"} gradient="bg-gradient-to-r from-red-500 to-orange-500" size={"md"} className={"mt-4 "}>Get Started Now</CustomButton>
            </div>
            <div className="w-full lg:w-[50%]">
                <Image src={'/images/d-3.png'} alt={"hero"} width={550} height={550} className={"max-xl:w-[100%] animationUpDown"}/>
            </div>
        </div>
    )
}
export default HeroSection

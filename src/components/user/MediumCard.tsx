"use client"
import React, {useLayoutEffect, useRef} from 'react'
import Image from "next/image";
import gsap from 'gsap'

interface MediumCardProps {
    name: string,
    title: string,
    image: string,
    content: string,
}

const MediumCard = ({
                        name = "name",
                        title = "title",
                        image = "/images/user1.jpg",
                        content = "content"
                    }: MediumCardProps) => {


    useLayoutEffect(() => {
        gsap.to(".feature-card", {
            y: -20,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            stagger: 0.3,
            ease: "power1.inOut",
        });
    }, []);

    return (
        <div
            className={"feature-card w-72 h-96 flex-center text-center"}>
            <Image src={image} alt={"user image"} width={100} height={100} className="rounded-full"/>
            <h4 className="font-semibold mt-3 py-2">{name}</h4>
            <p className={"text-[15px]"}>{content}
            </p>
        </div>
    )
}
export default MediumCard

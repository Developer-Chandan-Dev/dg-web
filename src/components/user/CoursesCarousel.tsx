"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import {ourCourses} from "@/constants/index"

export function CoursesCarousel() {
    const autoplay = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    );

    return (
        <Carousel
            // full‑width container, but still centered on really wide screens
            className="w-full max-w-7xl mx-auto"
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.reset}
        >
            <CarouselContent className="">
                {ourCourses.map(({id, title, image}) => (
                    <CarouselItem
                        key={id}
                        className="pl-2 sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                        <Card className="w-72 h-full flex flex-col items-center gap-3 px-4 py-6">
                            <Image
                                src={image}
                                alt={title}
                                width={245}
                                height={150}
                                className="h-40 w-full object-cover rounded-lg"
                            />
                            <h4 className="font-semibold text-center mt-2">{title}</h4>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* nav buttons sit flush with the carousel edges */}
            {/*<CarouselPrevious />*/}
            {/*<CarouselNext />*/}
        </Carousel>
    );
}

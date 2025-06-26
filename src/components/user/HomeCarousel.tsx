"use client"
import React from 'react'

import Autoplay from "embla-carousel-autoplay"
import {Card} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {sliderImages} from "@/constants";
import Image from "next/image";

const HomeCarousel = () => {

    const plugin = React.useRef(
        Autoplay({delay: 5000, stopOnInteraction: true})
    )

    return (
        <Carousel
            plugins={[plugin.current]}
            className="w-full mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
        >
            <CarouselContent className="-ml-1">
                {sliderImages.map(({id, url}) => (
                    <CarouselItem key={id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                            <Card className="h-72 p-0 shadow-lg relative">
                                <Image src={url} alt={url} fill className="object-cover"/>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    )
}
export default HomeCarousel

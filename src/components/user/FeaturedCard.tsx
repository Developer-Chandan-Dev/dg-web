import React from 'react'
import Image from "next/image";

const FeaturedCard = () => {
    return (
        <div className="feature-card ">
            <Image src="/assets/icons/codicon-web.svg" alt="globe icon" width={50} height={50}/>
            <h3 className="font-semibold text-base text-[#c3d0e5] leading-[160%]">Web support</h3>
            <p className={"text-[14px] pt-2 leading-6"}>Whether you are on your phone, tablet, or desktop, you can access your code from anywhere.</p>
        </div>
    )
}
export default FeaturedCard

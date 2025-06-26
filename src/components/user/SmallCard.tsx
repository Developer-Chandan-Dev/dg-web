import React from 'react'
import {Globe} from "lucide-react";
import Image from "next/image";

interface SmallCardProps {
    icon:React.ReactNode,
    text:string,
}

const SmallCard = ({icon, text}:SmallCardProps) => {
    return (
        <div className="feature-card max-md:[45%] md:w-[250px]">
            {icon}
            <h5 className="font-semibold mt-3">{text}</h5>
            <p className={"var(--home-foreground) text-[13px] text-gray-600 dark:text-gray-400 pt-2 leading-6"}>Whether you are on your phone, tablet, or desktop. You can use this using any digital devices.</p>
        </div>
    )
}
export default SmallCard

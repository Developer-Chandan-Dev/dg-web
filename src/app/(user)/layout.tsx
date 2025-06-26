import React from 'react'
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import BubbleField from "@/components/user/BubbleField";

export default function UserLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"w-full bg-radial"}
        >
            <BubbleField/>
            <Navbar/>
            {children}
            <Footer/>
        </div>
    );
}


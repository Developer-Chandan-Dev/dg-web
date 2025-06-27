"use client";
import React from 'react'
import Link from "next/link";
import {ModeToggle} from "@/components/mode-toggle";
import {SignInButton, SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import CustomButton from "@/components/user/CustomButton";
import Image from "next/image";
import NavItem from "../../../NavItem";
import {XIcon, AlignJustify} from "lucide-react";

const Navbar = () => {

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <nav className="flex mx-auto items-center justify-between gap-2 py-5 px-8 w-full xl:w-[1200px]">
            <Link href={"/"}>
                <div className={"flex items-center gap-3"}>
                    <Image src={"/images/user2.jpg"} width={35} height={35} alt={"Logo"} className={"p-1 rounded-full ring-2 ring-blue-500"} />
                    <p className={"text-[18px] max-sm:hidden block font-semibold"}>Skillsbazzar2</p>
                </div>
            </Link>
            <div className="hidden gap-7 relative md:flex ">
                <NavItem/>
            </div>

            {
                isOpen && <div className={"bg-white fixed dark:bg-[#090a22] z-10 py-5 px-10 w-full top-0 left-0 h-screen gap-7 md:hidden"}>
                    <div className={"flex items-center justify-between gap-3"}>
                        <Link href={"/"}>
                            <div className={"flex items-center gap-3"}>
                                <Image src={"/images/user2.jpg"} width={35} height={35} alt={"Logo"} className={"p-1 rounded-full ring-2 ring-blue-500"} />
                                <p className={"text-[18px] max-sm:hidden block font-semibold"}>Skillsbazzar2</p>
                            </div>
                        </Link>
                        <div className={"w-8 h-8 rounded-md flex-center border border-gray-200 text-gray-800 dark:text-gray-100 dark:bg-[#14152c] bg-white dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer"} onClick={()=> setIsOpen(false)}>
                            <XIcon size={"20"}/>
                        </div>
                    </div>
                    <NavItem className={"py-10 text-xl !text-left font-semibold"}/>
                </div>
            }



            <div className="flex gap-3 items-center">
                {/*<Button variant={"destructive"}>Sign in</Button>*/}
                <SignedOut>
                    <SignInButton>
                        <CustomButton className="btn-signin" rounded={"full"} size={"sm"}>Sign In</CustomButton>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton/>
                </SignedIn>

                <ModeToggle/>

                <div className={"w-9 h-9 rounded-md flex-center border border-gray-200 bg-white text-gray-800 dark:text-gray-100 dark:bg-[#14152c] dark:border-gray-800 hover:bg-gray-200 dark:hover:bg-gray-800 cursor-pointer md:hidden"}  onClick={()=> setIsOpen(!isOpen)}>
                    <AlignJustify size={"20"}/>
                </div>
            </div>
        </nav>
    )
}
export default Navbar

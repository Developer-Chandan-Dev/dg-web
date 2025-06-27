import React from 'react'
import Link from "next/link";
import { FacebookIcon, Instagram, Linkedin, Twitter} from "lucide-react";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="text-gray-600 body-font">
            <div
                className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
                    <Link href={"/"}
                          className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
                        <div className={"flex items-center gap-3"}>
                            <Image src={"/images/user2.jpg"} width={35} height={35} alt={"Logo"} className={"p-1 rounded-full ring-2 ring-blue-500"} />
                            <p className={"text-[18px] max-sm:hidden block font-semibold"}>Skillsbazzar2</p>
                        </div>
                    </Link>
                    <p className="mt-2 text-sm text-gray-500">It&apos;s a digital marketing website made for helping
                        people
                        who want support growing his business.</p>
                </div>
                <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
                    <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2 className="title-font font-medium text-gray-900 tracking-widest text-sm mb-3">Quick
                            Links</h2>
                        <nav className="list-none mb-10">
                            <li>
                                <Link href={"/"} className="text-gray-600 hover:text-gray-800">Home</Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-600 hover:text-gray-800">About</Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-600 hover:text-gray-800">Contact</Link>
                            </li>
                            <li>
                                <Link href={"/"} className="text-gray-600 hover:text-gray-800">Services</Link>
                            </li>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
                    <p className="text-gray-500 text-sm text-center sm:text-left">© 2020 Tailblocks —
                        <Link href="https://twitter.com/knyttneve" rel="noopener noreferrer"
                              className="text-gray-600 ml-1"
                              target="_blank">@knyttneve</Link>
                    </p>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                    <Link href={"/"} className="text-gray-500">
                        <FacebookIcon/>
                    </Link>
                    <Link href={"/"} className="ml-3 text-gray-500">
                        <Twitter/>
                    </Link>
                    <Link href={"/"} className="ml-3 text-gray-500">
                        <Instagram/>
                    </Link>
                    <Link href={"/"} className="ml-3 text-gray-500">
                      <Linkedin/>
                    </Link>
                    </span>
                </div>
            </div>
        </footer>
    )
}
export default Footer

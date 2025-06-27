import React from 'react'
import {FacebookIcon, InstagramIcon, LinkedinIcon, TwitterIcon} from 'lucide-react'

export const dynamic = 'force-dynamic' // OR omit if you remove all dynamic logic

const ContactPage = () => {
    return (
        <section className={"w-full h-auto xl:w-[1200px] mx-auto"}>
            <div className={"flex h-82 items-center justify-center flex-col text-center"}>
                <div className={" w-[90%] sm:w-[60%] lg:w-[50%]"}>
                    <h1 className={"py-3"}>
                        Contact Us Page
                    </h1>
                    <p className={"py-2"}>DB Web is a online platform for Digital Marketing Courses you can download
                        knowledgable courses from
                        here and get pdf for reading.</p>
                </div>

            </div>

            <div className={"flex items-center justify-center w-full gap-5 flex-wrap px-5"}>
                <div className={"feature-card w-64 flex-center flex-col"}>
                    <div
                        className={"flex-center bg-cyan-500 text-white size-10 rounded-full shadow-xl shadow-cyan-700 transition-all hover:shadow-[0px_0px_25px_cyan] hover:-translate-y-1"}
                    >
                        <InstagramIcon className={"size-6"}/>
                    </div>
                    <h5 className={"py-2"}>E-mail</h5>
                    <p className={"py-3"}>example@gmail.com</p>
                </div>
                <div className={"feature-card w-64 flex-center flex-col"}>
                    <div
                        className={"flex-center bg-cyan-500 text-white size-10 rounded-full shadow-xl shadow-cyan-700 transition-all hover:shadow-[0px_0px_25px_cyan] hover:-translate-y-1"}
                    >
                        <TwitterIcon className={"size-6"}/>
                    </div>
                    <h5 className={"py-2"}>E-mail</h5>
                    <p className={"py-3"}>example@gmail.com</p>
                </div>
                <div className={"feature-card w-64 flex-center flex-col"}>
                    <div
                        className={"flex-center bg-cyan-500 text-white size-10 rounded-full shadow-xl shadow-cyan-700 transition-all hover:shadow-[0px_0px_25px_cyan] hover:-translate-y-1"}
                    >
                        <FacebookIcon className={"size-6"}/>
                    </div>
                    <h5 className={"py-2"}>E-mail</h5>
                    <p className={"py-3"}>example@gmail.com</p>
                </div>
                <div className={"feature-card w-64 flex-center flex-col"}>
                    <div
                        className={"flex-center bg-cyan-500 text-white size-10 rounded-full shadow-xl shadow-cyan-700 transition-all hover:shadow-[0px_0px_25px_cyan] hover:-translate-y-1"}
                    >
                        <LinkedinIcon className={"size-6"}/>
                    </div>
                    <h5 className={"py-2"}>LinkedIn</h5>
                    <p className={"py-3"}>example@gmail.com</p>
                </div>
            </div>

            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
                    {/* Map + address card */}
                    <div className="lg:w-2/3 md:w-1/2 bg-var(--background) rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                        <iframe
                            width="100%"
                            height="100%"
                            className="absolute inset-0"
                            frameBorder="0"
                            title="Google map"
                            marginHeight={0}
                            marginWidth={0}
                            scrolling="no"
                            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                            style={{
                                filter: "grayscale(1) contrast(1.2) opacity(0.4)",
                            }}
                        ></iframe>

                        <div className="bg-white dark:bg-gray-800 relative flex flex-wrap py-6 rounded shadow-md">
                            <div className="lg:w-1/2 px-6">
                                <h5 className="title-font font-semibold tracking-widest text-xs">
                                    ADDRESS
                                </h5>
                                <p className="mt-1">
                                    Photo booth tattooed prism, portland taiyaki hoodie neutra
                                    typewriter
                                </p>
                            </div>

                            <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                                <h5 className="title-font font-semibold tracking-widest text-xs">
                                    EMAIL
                                </h5>
                                <a
                                    href="mailto:example@email.com"
                                    className="text-indigo-500 leading-relaxed"
                                >
                                    example@email.com
                                </a>

                                <h5 className="title-font font-semibold  tracking-widest text-xs mt-4">
                                    PHONE
                                </h5>
                                <p className="leading-relaxed">123‑456‑7890</p>
                            </div>
                        </div>
                    </div>

                    {/* Feedback form */}
                    <div className="lg:w-1/3 md:w-1/2 bg-var(--background) flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                        <h2 className="mb-1 title-font">
                            Feedback
                        </h2>
                        <p className="leading-relaxed mb-5">
                            Post‑ironic portland shabby chic echo park, banjo fashion axe
                        </p>

                        <div className="relative mb-4">
                            <label
                                htmlFor="name"
                                className="leading-7 text-sm text-gray-600 block"
                            >
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full ring-1 ring-gray-300 inputBox rounded border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <div className="relative mb-4">
                            <label
                                htmlFor="email"
                                className="leading-7 text-sm text-gray-600 block"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full ring-1 ring-gray-300 inputBox rounded border focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-300 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            />
                        </div>

                        <div className="relative mb-4">
                            <label
                                htmlFor="message"
                                className="leading-7 text-sm text-gray-600 block"
                            >
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                className="w-full inputBox rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 dark:text-gray-300 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                            ></textarea>
                        </div>

                        <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                            Submit
                        </button>

                        <p className="text-xs mt-3">
                            Chicharrones blog helvetica normcore iceland tousled brook viral
                            artisan.
                        </p>
                    </div>
                </div>
            </section>
        </section>
    )
}
export default ContactPage

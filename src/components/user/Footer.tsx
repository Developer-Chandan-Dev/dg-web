import React from 'react';
import Link from 'next/link';
import { FacebookIcon, Instagram, Linkedin, Twitter } from 'lucide-react';
import Image from 'next/image';
import { auth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

const Footer = async () => {
  const { userId } = await auth();
  let userRole = '';

  if (userId) {
    const user = await clerkClient.users.getUser(userId);
    userRole = user?.publicMetadata?.role as string;
  }

  const isAdmin = userRole === 'admin';

  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
          <Link
            href={'/'}
            className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
          >
            <div className={'flex items-center gap-3'}>
              <Image
                src={'/images/user2.jpg'}
                width={35}
                height={35}
                alt={'Logo'}
                className={'p-1 rounded-full ring-2 ring-blue-500'}
              />
              <p className={'text-[18px] max-sm:hidden block font-semibold'}>
                {process.env.NEXT_PUBLIC_WEBSITE_NAME}
              </p>
            </div>
          </Link>
          <p className="mt-2 text-sm text-gray-500">
            It&apos;s a digital marketing website made for helping people who
            want support growing his business.
          </p>
        </div>
        <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="title-font font-medium text-gray-900 dark:text-gray-400 tracking-widest text-sm mb-3">
              Quick Links
            </h2>
            <nav className="list-none mb-10">
              <li>
                <Link href={'/'} className="text-gray-600 hover:text-gray-800">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href={'/about'}
                  className="text-gray-600 hover:text-gray-800"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href={'/contact'}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href={'/services'}
                  className="text-gray-600 hover:text-gray-800"
                >
                  Services
                </Link>
              </li>
              {isAdmin && (
                <li>
                  <Link
                    href="/admin"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    Admin Panel
                  </Link>
                </li>
              )}
            </nav>
          </div>
        </div>
      </div>
      <div className="">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            © 2025 {process.env.NEXT_PUBLIC_WEBSITE_NAME} —
            <Link
              href="https://github.com/Developer-Chandan-Dev"
              rel="noopener noreferrer"
              className="text-gray-600 ml-1"
              target="_blank"
            >
              @DevChandan
            </Link>
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <Link href={'/'} className="text-gray-500">
              <FacebookIcon />
            </Link>
            <Link href={'/'} className="ml-3 text-gray-500">
              <Twitter />
            </Link>
            <Link href={'/'} className="ml-3 text-gray-500">
              <Instagram />
            </Link>
            <Link
              href={'https://in.linkedin.com/in/chandan-dev-developer'}
              className="ml-3 text-gray-500"
            >
              <Linkedin />
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

'use client'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
];

interface NavItemProps {
    className?: string;
}

const NavItem = ({className=""}: NavItemProps) => {

    const pathname = usePathname();

    return <nav className={`${className}`}>
        <ul className={"md:flex items-center gap-8 lg:gap-12 gradient-text uppercase text-[14px] font-semibold "}>
            {navItems.map(({label, href})=>(
                <li key={label} className={"max-md:text-4xl max-md:my-10"}>
                <Link
                    href={href}
                    className={cn(pathname === href && 'font-bold gradient2-text', "hover:gradient2-text transition-colors")}>{label}</Link>
                </li>
            ))}

        </ul>
    </nav>;
};

export default NavItem;

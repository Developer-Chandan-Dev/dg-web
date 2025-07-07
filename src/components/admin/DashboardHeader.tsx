'use client';
import { usePathname } from 'next/navigation';
import React from 'react';
import { ModeToggle } from '../mode-toggle';
import { SignedIn, UserButton } from '@clerk/nextjs';

const DashboardHeader = () => {
  const pathname = usePathname();

  console.log(pathname.split('/'));

  return (
    <div
      className={
        'w-full pt-1 pb-2 bg-white sticky top-0 border-b border-gray-300 flex items-center justify-between '
      }
    >
      <h2>
        {pathname.endsWith('/admin') || pathname.endsWith('/admin/')
          ? 'Dashboard'
          : pathname.endsWith('/users') || pathname.endsWith('/users/')
          ? 'Users'
          : pathname.endsWith('/sales') || pathname.endsWith('/sales/')
          ? 'Sales'
          : pathname.endsWith('/analytics') || pathname.endsWith('/analytics/')
          ? 'Analytics'
          : pathname.endsWith('/settings') || pathname.endsWith('/settings/')
          ? 'Settings'
          : 'Other'}
      </h2>
      <div className="flex gap-3 items-center">
        <ModeToggle />
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default DashboardHeader;

// src/app/(user)/downloads/page.tsx
'use client'; // <--- ADD THIS LINE AT THE VERY TOP

import React from 'react';
import { useUser } from '@clerk/nextjs';
import DownloadsTable from '@/components/user/DownloadsTable';

const DownloadsPage = () => {
  const { user, isLoaded, isSignedIn } = useUser(); // Destructure isLoaded and isSignedIn for better handling

  // Handle loading state: Clerk might not have loaded immediately
  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  // Handle not signed in
  if (!isSignedIn || !user || !user.id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Please log in to view your downloads.</p>
      </div>
    );
  }

  return (
    <div>
      <p className="font-bold pb-4 ">Downloads</p>
      <div className="border-t border-gray-300">
        {/* user, isLoaded, and isSignedIn are guaranteed to be true here */}
        <DownloadsTable userId={user.id} />
      </div>
    </div>
  );
};

export default DownloadsPage;
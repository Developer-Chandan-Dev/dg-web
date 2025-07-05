import React from 'react';
import { useUser } from '@clerk/nextjs';
import DownloadsTable from '@/components/user/DownloadsTable';

const DownloadsPage = () => {
  const { user } = useUser();
  if (!user || !user.id) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Please log in to view your downloads.</p>
      </div>
    );
  }
  return (
    <div>
      <p className="font-bold pb-4 ">Downloads</p>
      <div className="border-t border-gray-300">
        {user && user?.id && <DownloadsTable userId={user?.id} />}
      </div>
    </div>
  );
};

export default DownloadsPage;

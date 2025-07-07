import React from 'react';
import { Sidebar } from '@/components/admin/Sidebar';
import DashboardHeader from '@/components/admin/DashboardHeader';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-var(--background) overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-var(--background) px-10 pt-3 pb-6">
        <DashboardHeader/>
        {children}
      </main>
    </div>
  );
}

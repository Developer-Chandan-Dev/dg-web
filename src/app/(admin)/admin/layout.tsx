import { Sidebar } from "@/components/admin/Sidebar"
import {ModeToggle} from "@/components/mode-toggle";
import React from "react";
import {SignedIn, UserButton} from "@clerk/nextjs";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-var(--background) overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto bg-var(--background) p-6">
                <div className={"w-full h-10 pt-2 pb-3 border-b border-gray-300 px-5 flex items-center justify-between"}>
                    <h2>
                        Admin Panel
                    </h2>
                    <div className="flex gap-3 items-center">
                        <ModeToggle/>
                        <SignedIn>
                            <UserButton/>
                        </SignedIn>
                    </div>

                </div>
                {children}
            </main>
        </div>
    )
}

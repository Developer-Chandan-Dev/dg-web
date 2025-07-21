import React from "react";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";
import BubbleField from "@/components/user/BubbleField";
import { saveUserToSupabase } from "@/utils/save-user-to-supabase";

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await saveUserToSupabase(); // ← store user info

  return (
    <div className={"w-full bg-radial"}>
      <BubbleField />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}

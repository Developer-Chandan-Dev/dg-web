import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { SearchUsers } from "@/components/admin/SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { removeRole, setRole } from "./_actions";
import DashboardHeroSection from "@/components/admin/DashboardHeroSection";
import CoursesTable from "@/components/admin/CoursesTable";

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  const users = query ? (await client.users.getUserList({ query })).data : [];

  return (
    <>
      <DashboardHeroSection />
      {/* <CoursesTable /> */}
    </>
  );
}

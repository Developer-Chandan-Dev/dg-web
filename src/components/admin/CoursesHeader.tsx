"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ListCheck, Plus } from "lucide-react";
import { usePathname } from "next/navigation";

const CoursesHeader = () => {
  const pathname = usePathname();

  console.log(pathname, 12);

  return (
    <div className="flex items-center justify-between gap-5 w-full">
      <h1>Courses</h1>

      <div className="flex items-center gap-2">
        {pathname === "/admin/courses/add-new" && (
          <Link href="/admin/courses">
            <Button className="cursor-pointer">
              <ListCheck /> <span className="max-sm:hidden">Available Courses</span>
            </Button>
          </Link>
        )}

        {pathname === "/admin/courses" && (
          <Link href="/admin/courses/add-new">
            <Button className="cursor-pointer">
              <Plus />
              <span className="max-sm:hidden">Add New Course</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CoursesHeader;

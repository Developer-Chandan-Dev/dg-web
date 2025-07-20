import CoursesHeader from "@/components/admin/CoursesHeader";
import React from "react";

const CoursesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <CoursesHeader/>
      {children}
    </div>
  );
};
export default CoursesLayout;

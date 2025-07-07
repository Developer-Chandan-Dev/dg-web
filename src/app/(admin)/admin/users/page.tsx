'use client';
import React, { useEffect } from 'react';
import { DataTableDemo } from '@/components/admin/UsersTable';
import { getPurchasedCourses } from '@/lib/actions/purchases.action';

const Users = () => {
  
  
  return (
    <div>
      <h1>Users</h1>
      <DataTableDemo />
    </div>
  );
};
export default Users;

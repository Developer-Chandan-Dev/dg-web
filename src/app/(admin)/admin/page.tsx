import { redirect } from 'next/navigation';
import { checkRole } from '@/utils/roles';
import { SearchUsers } from '@/components/admin/SearchUsers';
import { clerkClient } from '@clerk/nextjs/server';
import { removeRole, setRole } from './_actions';
import { AdminUploadForm } from '@/components/admin/AdminUploadForm';
import { AdminPDFTable } from '@/components/admin/AdminPDFTable';

export default async function AdminDashboard(params: {
  searchParams: Promise<{ search?: string }>;
}) {
  if (!checkRole('admin')) {
    redirect('/');
  }

  const query = (await params.searchParams).search;

  const client = await clerkClient();

  const users = query ? (await client.users.getUserList({ query })).data : [];

  return (
    <>
      {/* <div>
        <p>This is the protected admin dashboard restricted to users with the `admin` role.</p>
        <SearchUsers />

        {users.map((user) => {
          return (
            <div key={user.id}>
              <div>
                {user.firstName} {user.lastName}
              </div>

              <div>
                {user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)?.emailAddress}
              </div>

              <div>{user.publicMetadata.role as string}</div>

              <form method="post" action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <button type="submit">Make Admin</button>
              </form>

              <form method="post" action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <button type="submit">Make Moderator</button>
              </form>

              <form method="post" action={removeRole}>
                <input type="hidden" value={user.id} name="id" />
                <button type="submit">Remove Role</button>
              </form>
            </div>
          );
        })}
      </div> */}

      <AdminUploadForm />
      <AdminPDFTable />
    </>
  );
}
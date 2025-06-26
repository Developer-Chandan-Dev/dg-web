// utils/roles.ts
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function checkRole(roleToMatch: string): Promise<boolean> {
  const { userId } = await auth();

  if (!userId) return false;

  const user = await clerkClient.users.getUser(userId);
  const role = user.publicMetadata?.role;

  return role === roleToMatch;
}

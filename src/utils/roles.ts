// utils/roles.ts
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";

// clerkClient is already imported correctly

export async function checkRole(roleToMatch: string): Promise<boolean> {
  const { userId } = await auth();
  if (!userId) return false;

  const user = await clerkClient.users.getUser(userId);
  const role = user.publicMetadata?.role;

  return role === roleToMatch;
}

"use server";

import { USER } from "@/types";
import { createSupabaseClient } from "../supabase";

export const getAllUsers = async () => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("id, email, full_name, role, created_at, userId");

  if (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }

  return (data as USER[]).map((user) => ({
    id: user.id,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    created_at: user.created_at,
    userId: user.id, // Assuming userId is the same as id
  }));
};

export const getSingleUserDetails = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .select("id, email, full_name, role, created_at, userId")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user details:", error.message);
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    full_name: data.full_name,
    role: data.role,
    created_at: data.created_at,
    userId: data.id, // Assuming userId is the same as id
  };
};

export const updateUserRole = async (userId: string, newRole: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("users")
    .update({ role: newRole })
    .eq("id", userId)
    .select("id, email, full_name, role, created_at")
    .single();
  if (error) {
    console.error("Error updating user role:", error.message);
    return null;
  }
  return {
    id: data.id,
    email: data.email,
    full_name: data.full_name,
    role: data.role,
    created_at: data.created_at,
    userId: data.id, // Assuming userId is the same as id
  };
};

export const deleteUser = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { error } = await supabase.from("users").delete().eq("id", userId);

  if (error) {
    console.error("Error deleting user:", error.message);
    return false;
  }
  return true;
};

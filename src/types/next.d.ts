// src/types/next.d.ts (New/Correct)
export type PageProps<TParams = { [key: string]: string | string[] | undefined }> = {
  params: Promise<TParams>; // <--- HERE'S THE CHANGE
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>; // Also make searchParams a Promise
};
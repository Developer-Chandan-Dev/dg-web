'use server'

import { headers } from 'next/headers'

export async function getUserRole() {
  const headerList = headers()
  const authHeader = (await headerList).get('authorization') // or cookies() if using tokens
  // custom role logic
  if (authHeader?.includes('admin')) {
    return 'admin'
  }
  return 'user'
}

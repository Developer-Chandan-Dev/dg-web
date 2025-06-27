'use server'

import { checkRole } from '@/utils/roles'
import { clerkClient } from '@clerk/nextjs/server'

export async function setRole(formData: FormData): Promise<void> {
    const client = await clerkClient()

    // Check that the user trying to set the role is an admin
    if (!checkRole('admin')) {
        throw new Error('Not Authorized')
    }

    const userId = formData.get('id') as string
    const role = formData.get('role') as string

    if (!userId || !role) {
        throw new Error('Missing user ID or role')
    }

    await client.users.updateUserMetadata(userId, {
        publicMetadata: { role },
    })
}

export async function removeRole(formData: FormData): Promise<void> {
    const client = await clerkClient()

    const userId = formData.get('id') as string

    if (!userId) {
        throw new Error('Missing user ID')
    }

    await client.users.updateUserMetadata(userId, {
        publicMetadata: { role: null },
    })
}
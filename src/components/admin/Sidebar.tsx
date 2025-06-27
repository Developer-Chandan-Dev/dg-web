'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
    Home,
    Users,
    Settings,
    BarChart3,
    ChevronsLeft,
    ChevronsRight,
    X, PanelRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const sidebarItems = [
    { name: 'Dashboard', icon: Home, href: '/admin' },
    { name: 'Users', icon: Users, href: '/admin/users' },
    { name: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { name: 'Settings', icon: Settings, href: '/admin/settings' },
]

export function Sidebar() {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    // Detect screen size
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkScreenSize()
        window.addEventListener('resize', checkScreenSize)
        return () => window.removeEventListener('resize', checkScreenSize)
    }, [])

    return (
        <>
            {/* Sidebar Overlay on small screens */}
            {isMobile && !collapsed && (
                <div
                    className="fixed inset-0 bg-black/40 z-30"
                    onClick={() => setCollapsed(true)}
                />
            )}
            <button className="absolute text-gray-700 cursor-pointer dark:text-gray-200 left-2 top-7 md:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition" onClick={() => setCollapsed(false)}>
                <PanelRight size={20}/>
            </button>
            <aside
                className={cn(
                    'bg-white dark:bg-gray-900 border-r shadow-sm fixed md:static top-0 left-0 z-40 h-full transition-all duration-300',
                    collapsed
                        ? isMobile
                            ? '-translate-x-full w-64'
                            : 'w-20'
                        : 'w-64',
                    isMobile && 'w-64'
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b">
                    {!collapsed && <span className="text-xl font-bold">Admin Panel</span>}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1 cursor-pointer rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                    >
                        {isMobile ? (
                            <X size={20} />
                        ) : collapsed ? (
                            <ChevronsRight size={20} />
                        ) : (
                            <ChevronsLeft size={20} />
                        )}
                    </button>
                </div>

                {/* Nav Links */}
                <nav className="px-2 py-4">
                    {sidebarItems.map(({ name, icon: Icon, href }) => (
                        <Link
                            key={name}
                            href={href}
                            className={cn(
                                'flex items-center gap-3 mb-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100  dark:hover:bg-gray-800 transition dark:text-gray-100',
                                pathname === href && 'bg-gray-100 dark:bg-gray-800 text-indigo-600'
                            )}
                            onClick={() => isMobile && setCollapsed(true)} // auto close on mobile
                        >
                            <Icon className="w-5 h-5" />
                            {!collapsed && <span>{name}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    )
}

'use client'

import React, { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { SidebarTrigger } from './ui/sidebar'
import { Separator } from './ui/separator'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './ui/breadcrumb'
import { Button } from './ui/button'
import { Fullscreen, Minimize } from 'lucide-react'
import { LanguageSwitcher } from './LanguageSwitcher'
import { useTranslations } from 'next-intl'
import HeaderProfileMenu from './HeaderProfileMenu'
import NotificationBox from './NotificationBox'
import { PublicUser } from '@/types/user'

// Capitalize function with input validation
const capitalize = (str: string) => {
    if (typeof str !== 'string') return ''
    return str.charAt(0).toUpperCase() + str.slice(1).replace(/-/g, ' ')
}

const Header = ({ locales, user }: {
    locales: string[], user: PublicUser
}) => {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(Boolean)

    const [isFullscreen, setIsFullscreen] = useState(false)

    // Handle fullscreen toggle
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) => {
                console.error("Error entering fullscreen mode:", err)
            })
        } else if (document.exitFullscreen) {
            document.exitFullscreen().catch((err) => {
                console.error("Error exiting fullscreen mode:", err)
            })
        }
    }

    // Listen for fullscreen change
    useEffect(() => {
        const handleChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', handleChange)
        return () => {
            document.removeEventListener('fullscreenchange', handleChange)
        }
    }, [])

    const t = useTranslations('nav')

    return (
        <header className="flex items-center justify-between h-16 shrink-0 gap-2 border-b px-3">
            <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {segments.map((segment, index) => {
                            const isLast = index === segments.length - 1
                            const href = '/' + segments.slice(0, index + 1).join('/')

                            return (
                                <React.Fragment key={href}>
                                    <BreadcrumbItem>
                                        {isLast ? (
                                            <BreadcrumbPage>{capitalize(t(segment) || segment)}</BreadcrumbPage>
                                        ) : (
                                            <BreadcrumbLink asChild>
                                                <Link href={href}>{capitalize(t(segment) || segment)}</Link>
                                            </BreadcrumbLink>
                                        )}
                                    </BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </React.Fragment>
                            )
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
            <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <NotificationBox />
                <Button
                    variant="ghost"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                    {isFullscreen ? <Minimize /> : <Fullscreen />}
                </Button>
                <HeaderProfileMenu user={user} />
            </div>

        </header>
    )

}

export default Header

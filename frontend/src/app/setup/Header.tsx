'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Fullscreen, Minimize } from 'lucide-react'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import HeaderProfileMenu from '@/components/HeaderProfileMenu'
import { PublicUser } from '@/types/user'
import { getUser } from '../actions/auth/getUser'
import Link from 'next/link'

const SetupHeader = () => {
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [user, setUser] = useState<Partial<PublicUser> | null>(null) // null while loading

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch((err) =>
                console.error('Error entering fullscreen:', err)
            )
        } else {
            document.exitFullscreen().catch((err) =>
                console.error('Error exiting fullscreen:', err)
            )
        }
    }

    useEffect(() => {
        const handleChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener('fullscreenchange', handleChange)
        return () => {
            document.removeEventListener('fullscreenchange', handleChange)
        }
    }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await getUser()
                setUser(userData || null)
            } catch (err) {
                console.error('Failed to fetch user:', err)
            }
        }
        fetchUser()
    }, [])

    return (
        <header className="flex items-center justify-between h-16 px-4 border-b bg-background">
            {/* Left side: Logo + Title */}
            <Link href={'/'} className="flex items-center gap-3">
                <Image
                    src="https://www.suborno.dev/favicon.ico"
                    alt="Ullass Logo"
                    width={36}
                    height={36}
                />
                <span className="text-lg font-bold text-foreground">
                    {process.env.NEXT_PUBLIC_SITE_NAME}
                </span>
            </Link>

            {/* Right side: Lang switcher, fullscreen, profile */}
            <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <Button
                    variant="ghost"
                    onClick={toggleFullscreen}
                    title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
                >
                    {isFullscreen ? <Minimize /> : <Fullscreen />}
                </Button>
                <HeaderProfileMenu user={user as PublicUser} /> {/* pass user state here */}
            </div>
        </header>
    )
}

export default SetupHeader

'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sparkles, Settings, CreditCard, Bell, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'
import { useAuth } from '@/hooks/useAuth'
import { PublicUser } from '@/types/user'

type Props = {
    user?: PublicUser
}

export default function HeaderProfileMenu({ user }: Props) {
    const { logout } = useAuth()

    if (!user) {
        // Optionally show a placeholder avatar while user data is loading
        return (
            <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
                <Avatar className="h-8 w-8 rounded-full">
                    <AvatarFallback>?</AvatarFallback>
                </Avatar>
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full p-0 h-10 w-10">
                    <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage src={user.profileImage} alt={user.name} />
                        <AvatarFallback className="rounded-full">{user.name.slice(0,2)}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                align="end"
                sideOffset={4}
            >
                <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar className="h-8 w-8 rounded-lg">
                            <AvatarImage src={user.profileImage} alt={user.name} />
                            <AvatarFallback className="rounded-lg">{user.name.slice(0,2)}</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{user.name}</span>
                            <span className="truncate text-xs">{user.email}</span>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Upgrade to Pro
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <Link href="/settings">
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        Billing
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell className="mr-2 h-4 w-4" />
                        Notifications
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <ThemeToggle />
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Bell, Mail, UserPlus } from 'lucide-react'
import { Button } from './ui/button'

const mockNotifications: {
    id: number
    title: string
    description: string
    icon: React.ReactNode
}[] = [
        // Uncomment to test real notifications
        {
          id: 1,
          title: 'New message from Admin',
          description: 'Please check your inbox.',
          icon: <Mail className="w-4 h-4 text-primary" />,
        },
        {
          id: 2,
          title: 'New user joined',
          description: 'Airin123 just registered.',
          icon: <UserPlus className="w-4 h-4 text-green-500" />,
        },
    ]

export default function NotificationBox() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" />
                    {mockNotifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                            {mockNotifications.length}
                        </span>
                    )}
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
                className="min-w-80 max-w-sm min-h-[350px] max-h-[400px] overflow-y-auto p-2 rounded-xl shadow-xl"
                align="end"
                sideOffset={8}
            >
                <DropdownMenuLabel className="text-base font-semibold px-2 pb-1">
                    Notifications
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                {mockNotifications.length > 0 ? (
                    mockNotifications.map((notif) => (
                        <DropdownMenuItem
                            key={notif.id}
                            className="flex flex-col items-start gap-1 px-3 py-2 hover:bg-muted/50 transition-colors rounded-md"
                        >
                            <div className="flex items-center gap-2">
                                {notif.icon}
                                <span className="font-medium text-sm">{notif.title}</span>
                            </div>
                            <p className="text-xs text-muted-foreground pl-6">
                                {notif.description}
                            </p>
                        </DropdownMenuItem>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full p-6 text-center text-muted-foreground space-y-2">
                        <Bell className="w-10 h-10 text-muted" />
                        <h4 className="text-sm font-semibold">You're all caught up!</h4>
                        <p className="text-xs">No new notifications at the moment.</p>
                    </div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

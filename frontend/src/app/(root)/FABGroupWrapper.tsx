'use client'

import FABGroup, { ActionItem } from '@/components/FABGroup'
import { Edit2, Plus, Settings, ShoppingCart } from 'lucide-react'

const actions: ActionItem[] = [
    {
        id: "1",
        icon: Edit2,
        label: "Edit Profile",
        href: "/profile/edit",
    },
    {
        id: "2",
        icon: ShoppingCart,
        label: "My Cart",
        href: "/cart",
        colorClass: "bg-yellow-400 text-black hover:bg-yellow-500",
    },
    {
        id: "3",
        icon: Settings,
        label: "Settings",
        href: "/settings",
    },
]

export default function FABGroupWrapper() {
    return <FABGroup actions={actions} icon={Plus} />
}

'use client'

import * as React from 'react'
import { Check, ChevronsUpDown, Plus, Store as StoreIcon } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
import clsx from 'clsx'
import { cn } from '@/lib/utils' // assuming you have this utility

const LOCAL_STORAGE_KEY = 'selected-store'

// Utility to convert store name to kebab-case
function toKebabCase(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-')
}

type NavUserProps = {
  user: {
    name: string
    avatar: string
  }
  stores: {
    id: string
    name: string
    shopImg: string
  }[]
  currentStoreName?: string // current store name in normal format
  onStoreSwitch: (kebabStoreName: string) => void
  onAddStore: () => void
}

export function NavUser({
  user,
  stores,
  currentStoreName: propCurrentStoreName,
  onStoreSwitch,
  onAddStore,
}: NavUserProps) {
  const { isMobile } = useSidebar()
  const [popoverOpen, setPopoverOpen] = React.useState(false)

  // State holds kebab-case store name key
  const [currentStoreKey, setCurrentStoreKey] = React.useState<string | undefined>(() => {
    if (propCurrentStoreName) return toKebabCase(propCurrentStoreName)
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (saved) return saved
    }
    return stores.length > 0 ? toKebabCase(stores[0].name) : undefined
  })

  React.useEffect(() => {
    if (propCurrentStoreName) {
      setCurrentStoreKey(toKebabCase(propCurrentStoreName))
    }
  }, [propCurrentStoreName])

  // Find original store object by kebab-case name
  const selectedStore = stores.find(store => toKebabCase(store.name) === currentStoreKey)

  function handleStoreSwitch(storeName: string) {
    const kebabName = toKebabCase(storeName)
    setCurrentStoreKey(kebabName)
    localStorage.setItem(LOCAL_STORAGE_KEY, kebabName)
    onStoreSwitch(kebabName)
    setPopoverOpen(false)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu open={popoverOpen} onOpenChange={setPopoverOpen}>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex items-center gap-2 px-3"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">{user.name.slice(0,2)}</AvatarFallback>
              </Avatar>

              <span className="truncate font-medium">
                {selectedStore?.name ?? 'Select Store'}
              </span>

              <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="min-w-[220px] rounded-lg p-1"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuGroup>
              {stores.map((store) => {
                const storeKey = toKebabCase(store.name)
                return (
                  <DropdownMenuItem
                    key={store.id}
                    onClick={() => handleStoreSwitch(store.name)}
                    className={clsx('flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer select-none', {
                      'bg-primary text-primary-foreground font-semibold': storeKey === currentStoreKey,
                      'hover:bg-primary/10': storeKey !== currentStoreKey,
                    })}
                  >
                    <StoreIcon className="h-4 w-4" />
                    <span className="flex-1 truncate">{store.name}</span>
                    {storeKey === currentStoreKey && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </DropdownMenuItem>
                )
              })}
              <DropdownMenuItem
                onClick={() => {
                  setPopoverOpen(false)
                  onAddStore()
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer select-none text-primary font-semibold hover:bg-primary/10"
              >
                <Plus className="h-4 w-4" />
                Add New Store
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

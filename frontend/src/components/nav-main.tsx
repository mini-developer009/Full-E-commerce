'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import IconRenderer from './others/IconRenderer'

type NavItem = {
  title: string
  url?: string
  icon?: string
  items?: NavItem[]
}

export function NavMain({ items }: { items: NavItem[] }) {
  const t = useTranslations('nav')
  const pathname = usePathname()

  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  // Load saved state from localStorage or derive from current path
  useEffect(() => {
    let matchedGroup: string | null = null
    let matchedSubmenu: string | null = null

    const findMatch = (items: NavItem[], parent: string | null = null, grandParent: string | null = null) => {
      for (const item of items) {
        if (pathname === item.url) {
          if (grandParent) {
            matchedGroup = grandParent
            matchedSubmenu = parent
          } else if (parent) {
            matchedGroup = parent
          } else {
            matchedGroup = item.title
          }
        }

        if (item.items) {
          findMatch(item.items, item.title, parent)
        }
      }
    }

    findMatch(items)

    const savedGroup = localStorage.getItem('openGroup')
    const savedSubmenu = localStorage.getItem('openSubmenu')

    setOpenGroup(matchedGroup || savedGroup)
    setOpenSubmenu(matchedSubmenu || savedSubmenu)
  }, [pathname, items])

  // Save current open states
  useEffect(() => {
    if (openGroup) localStorage.setItem('openGroup', openGroup)
    else localStorage.removeItem('openGroup')

    if (openSubmenu) localStorage.setItem('openSubmenu', openSubmenu)
    else localStorage.removeItem('openSubmenu')
  }, [openGroup, openSubmenu])

  const handleGroupToggle = (title: string) => {
    setOpenGroup(prev => (prev === title ? null : title))
    setOpenSubmenu(null)
  }

  const handleSubmenuToggle = (title: string) => {
    setOpenSubmenu(prev => (prev === title ? null : title))
  }

  return (
    <>
      {items.map(group => {
        const hasChildren = group.items && group.items.length > 0

        if (!hasChildren || (group.items?.length === 1 && !group.items[0].items)) {
          const singleItem = hasChildren ? group.items![0] : group
          return (
            <SidebarGroup key={singleItem.title}>
              <SidebarMenu>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link
                      href={singleItem.url || '#'}
                      title={t(singleItem.title)}
                      className={`py-2 px-3 rounded-md transition-colors duration-150 ${
                        pathname === singleItem.url
                          ? 'bg-gradient-to-r from-primary to-secondary text-white hover:text-white'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {singleItem.icon && (
                        <IconRenderer
                          className={`mr-2 ${pathname === singleItem.url ? 'stroke-white' : ''}`}
                          iconName={singleItem.icon}
                        />
                      )}
                      <span>{t(singleItem.title)}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenu>
            </SidebarGroup>
          )
        }

        const isGroupOpen = openGroup === group.title

        return (
          <SidebarGroup key={group.title}>
            <Collapsible open={isGroupOpen} onOpenChange={() => handleGroupToggle(group.title)}>
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="cursor-pointer flex items-center justify-between gap-1">
                  <span className="flex items-center gap-2">
                    {group.icon && <IconRenderer className="h-4 w-4" iconName={group.icon} />}
                    {t(group.title)}
                  </span>
                  <ChevronRight className={`transition-transform ${isGroupOpen ? 'rotate-90' : ''}`} />
                </SidebarGroupLabel>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="bg-muted/40 rounded-md mt-0.5">
                  <SidebarMenu>
                    {group.items?.map(child => (
                      <SidebarItem
                        key={child.title}
                        item={child}
                        pathname={pathname}
                        t={t}
                        openSubmenu={openSubmenu}
                        onSubmenuToggle={handleSubmenuToggle}
                      />
                    ))}
                  </SidebarMenu>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </SidebarGroup>
        )
      })}
    </>
  )
}

function SidebarItem({
  item,
  pathname,
  t,
  openSubmenu,
  onSubmenuToggle
}: {
  item: NavItem
  pathname: string
  t: ReturnType<typeof useTranslations>
  openSubmenu: string | null
  onSubmenuToggle: (title: string) => void
}) {
  const isActive = pathname === item.url
  const hasChildren = item.items && item.items.length > 0

  if (hasChildren) {
    const isOpen = openSubmenu === item.title

    return (
      <Collapsible open={isOpen} onOpenChange={() => onSubmenuToggle(item.title)} asChild>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={t(item.title)}>
              {item.icon && (
                <IconRenderer
                  className={`mr-2 ${isActive ? 'stroke-white' : ''}`}
                  iconName={item.icon}
                />
              )}
              <span>{t(item.title)}</span>
              <ChevronRight
                className={`ml-auto transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
              />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map(subItem => (
                <SidebarItem
                  key={subItem.title}
                  item={subItem}
                  pathname={pathname}
                  t={t}
                  openSubmenu={openSubmenu}
                  onSubmenuToggle={onSubmenuToggle}
                />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <Link
          href={item.url || '#'}
          title={t(item.title)}
          className={`py-2 px-3 rounded-md transition-colors duration-150 ${
            isActive
              ? 'bg-gradient-to-r from-primary to-secondary text-white hover:text-white'
              : 'hover:bg-muted'
          }`}
        >
          {item.icon && (
            <IconRenderer
              className={`mr-2 ${isActive ? 'stroke-white' : ''}`}
              iconName={item.icon}
            />
          )}
          <span>{t(item.title)}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  )
}

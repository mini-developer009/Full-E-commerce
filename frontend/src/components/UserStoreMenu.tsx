// components/UserStoreMenu.tsx
'use client'

import { MyShops } from "@/types/store"
import { NavUser } from "./nav-user"

type UserStoreMenuProps = {
  shops: MyShops[] // Array of shops from API
}

export function UserStoreMenu({ shops }: UserStoreMenuProps) {
  return (
    <NavUser
      user={{ name: 'Admin', avatar: '/avatar.jpg' }}
      stores={shops.map(shop => ({
        id: shop.id,
        name: shop.name,
        shopImg: shop.shopImg
      }))}
      currentStoreName={shops[0]?.name} // optional: default selected store
      onStoreSwitch={(id: string) => console.log('Switched to store:', id)}
      onAddStore={() => console.log('Open add store modal')}
    />
  )
}

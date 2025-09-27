import * as React from "react"
import { GalleryVerticalEnd } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { UserStoreMenu } from "./UserStoreMenu"
import { MyShops } from "@/types/store"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    // Dashboard
    {
      title: "dashboard",
      url: "/",
      icon: "LuLayoutDashboard",
    },
    {
      title: "media",
      url: "/media",
      icon: "LuGalleryVerticalEnd",
    },

    // Users Group
    {
      title: "users",
      url: "",
      icon: "LuUsers",
      items: [
        {
          title: "customers",
          url: "/users/customers",
          icon: "LuUser",
          items: [
            { title: "add-new", url: "/users/customers/add", icon: "LuUserPlus" },
            { title: "customer-list", url: "/users/customers", icon: "LuList" },
            { title: "customer-groups", url: "/users/customers/group", icon: "LuUsers" },
            { title: "customer-statement", url: "/users/customers/statement", icon: "LuFileText" },
          ],
        },
        {
          title: "suppliers",
          url: "/users/suppliers",
          icon: "LuTruck",
          items: [
            { title: "add-new", url: "/users/suppliers/add", icon: "LuUserPlus" },
            { title: "suppliers-list", url: "/users/suppliers", icon: "LuList" },
            { title: "suppliers-groups", url: "/users/suppliers/groups", icon: "LuUsers" },
            { title: "suppliers-statement", url: "/users/suppliers/statement", icon: "LuFileText" },
          ],
        },
        {
          title: "mortgages",
          url: "/users/mortgages-products-list",
          icon: "LuCreditCard",
          items: [
            { title: "add-new", url: "/users/mortgages/add", icon: "LuPlus" },
            { title: "mortgage-product-create", url: "/users/mortgages/mortgage-product-create", icon: "LuFilePlus" },
            { title: "mortgages-products-list", url: "/users/mortgages-products-list", icon: "LuList" },
            { title: "mortgage-list", url: "/users/mortgages", icon: "LuClipboardList" },
          ],
        },
        {
          title: "moneylender",
          url: "/users/moneylender",
          icon: "LuDollarSign",
          items: [
            { title: "add-new", url: "/users/moneylender/add", icon: "LuPlus" },
            { title: "moneylenders-transactions", url: "/users/moneylender", icon: "LuActivity" },
            { title: "moneylenders-client-list", url: "/users/moneylender/moneylenders-client-list", icon: "LuUsers" },
          ],
        },
        {
          title: "craftsmans",
          url: "/users/craftsman",
          icon: "TbBrandCraft",
          items: [
            { title: "add-new", url: "/users/craftsmans/add", icon: "LuPlus" },
            { title: "craftsmans-list", url: "/users/craftsmans", icon: "LuList" },
            { title: "craftsmans-deposits", url: "/users/craftsmans/deposits", icon: "LuCreditCard" },
            { title: "craftsmans-returns-list", url: "/users/craftsmans/returns", icon: "LuRotateCcw" },
          ],
        },
      ],
    },

    // Accounts Group
    {
      title: "products-management",
      url: "",
      icon: "LuPackage",
      items: [
        {
          title: "products",
          url: "/products",
          icon: "LuSettings",
          items: [
            { title: "product-create", url: "/products/add", icon: "LuPlus" },
            { title: "products-list", url: "/products", icon: "LuList" },
            { title: "products-categories", url: "/products/categories", icon: "TbCategory2" },
            { title: "products-variants", url: "/products/variants", icon: "LuTag" },
          ],
        },
        {
          title: "stock-management",
          url: "/stock-management",
          icon: "TbBrandStocktwits",
         
        }
      ],
    },
    {
      title: "accounts",
      url: "",
      icon: "LuWallet",
      items: [
        {
          title: "account-management",
          url: "/accounts/management",
          icon: "LuSettings",
          items: [
            { title: "account-create", url: "/accounts/add", icon: "LuPlus" },
            { title: "account-list", url: "/accounts", icon: "LuList" },
            { title: "account-balance", url: "/accounts/balance", icon: "LuCreditCard" },
            { title: "account-statement", url: "/accounts/statement", icon: "LuFileText" },
          ],
        },
        {
          title: "income-and-deposit",
          url: "/accounts/income",
          icon: "LuDollarSign",
          items: [
            { title: "add-deposit", url: "/accounts/income/add", icon: "LuPlus" },
            { title: "all-deposits", url: "/accounts/income", icon: "LuList" },
          ],
        },
        {
          title: "expense-management",
          url: "/accounts/expenses",
          icon: "LuCreditCard",
          items: [
            { title: "add-expense", url: "/accounts/expenses/add", icon: "LuPlus" },
            { title: "expenses", url: "/accounts/expenses", icon: "LuList" },
            { title: "supplier-payment", url: "/accounts/expenses/supplier-payment", icon: "LuTruck" },
            { title: "refund", url: "/accounts/expenses/refund", icon: "LuRotateCcw" },
          ],
        },
        {
          title: "transfer-management",
          url: "/accounts/transfers",
          icon: "LuRepeat",
          items: [
            { title: "start-transfer", url: "/accounts/transfers/add", icon: "LuPlus" },
            { title: "transfer-history", url: "/accounts/transfers", icon: "LuList" },
          ],
        },
        {
          title: "profit-and-reports",
          url: "/accounts/reports",
          icon: "LuChartBarBig",
          items: [
            { title: "total-profit-summary", url: "/accounts/reports/profit-summary", icon: "LuDollarSign" },
            { title: "income-expense-comparison", url: "/accounts/reports/income-vs-expense", icon: "LuChartBar" },
            { title: "monthly-summary-report", url: "/accounts/reports/monthly-summary", icon: "LuCalendar" },
          ],
        },
      ],
    },

    // Due Reports
    {
      title: "due-reports",
      url: "",
      icon: "LuCloudAlert",
      items: [
        { title: "due-reports", url: "/due-reports", icon: "LuFileText" },
      ],
    },

    // Orders
    {
      title: "orders",
      url: "",
      icon: "LuShoppingCart",
      items: [
        { title: "add-new", url: "/orders/add", icon: "LuPlus" },
        { title: "orders-list", url: "/orders", icon: "LuList" },
      ],
    },

    // Settings
    {
      title: "settings",
      url: "/settings",
      icon: "LuSettings",
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  shops: MyShops[]
}

export function AppSidebar({ shops, ...props }: AppSidebarProps) {
  const t = useTranslations('HomePage')
  return (
    <Sidebar {...props}>
      <SidebarHeader className="p-6 py-8 bg-background">
        <div className="flex flex-col items-start gap-4 p-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <Image
              width={32}
              height={32}
              src="https://www.suborno.dev/favicon.ico"
              alt="Ullass Logo"
              className="rounded"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {t('today-sales')}
            </span>
            <span className="text-xl font-semibold text-foreground leading-snug">
              00.00 USD
            </span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-background scroll-w-0">
        <SidebarGroup>
          <NavMain items={data.navMain} />
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <UserStoreMenu shops={shops} />
      </SidebarFooter>
    </Sidebar>
  )
}

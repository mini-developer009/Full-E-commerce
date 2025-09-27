import { AppSidebar } from "@/components/app-sidebar";
import FABGroupWrapper from "./FABGroupWrapper";
import Header from "@/components/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getAvailableLocales } from "@/lib/getLocales";
import React, { Suspense } from "react";
import { StockAlertModal } from "@/components/others/StockAlertModal";
import Footer from "@/components/footer";
import { getUser } from "../actions/auth/getUser";
import { getUserShops, Shop } from "../actions/auth/store/getUserShops";
import ShopSelector from "@/components/ShopSelector";
import { cookies } from "next/headers";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const locales = getAvailableLocales();
  const user = await getUser();

  const cookieStore = await cookies(); // no await
  const storeName = cookieStore.get("storeName")?.value;
  const storeImg = cookieStore.get("storeImg")?.value;

  const shops: Shop[] = (await getUserShops()) || [];

  if (!storeName || !storeImg) {
    return <ShopSelector shops={shops} />;
  }

  return (
    <>
    <SidebarProvider>
      <AppSidebar shops={shops} />
      <SidebarInset>
        <Suspense fallback={<>Loading...</>}>
          <Header locales={locales} user={user} />
        </Suspense>
        <div className="flex flex-col flex-1 bg-muted/60">
          <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
          <Footer />
        </div>
        <FABGroupWrapper />
        <StockAlertModal />
      </SidebarInset>
    </SidebarProvider>
    </>
  );
};

export default Layout;

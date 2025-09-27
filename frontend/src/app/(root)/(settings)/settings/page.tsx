"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import UserList from "../components/UserList";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import SettingLanguage from "../components/SettingLanguage";
import SettingGeneral from "../components/SettingGeneral";
import FABSettings from "../components/SettingsFAB";
import StoreSettings from "../components/StoreSettings";
import UserProfileSettings from "../components/UserProfileSettings";
import InvoiceSettings from "../components/InvoiceSettings";
import ReceivePaymentToggle from "../components/ReceivePaymentToggle";
import ProductSettings from "../components/ProductSettings";
import PurchaseSettings from "../components/PurchaseSettings";
import CustomerSettings from "../components/CustomerSettings";
import SupplierSettings from "../components/SupplierSettings";
import ClientNotificationSettings from "../components/ClientNotificationSettings";
import StoreOptionSettings from "../components/StoreOptionSettings";
import MiscSettings from "../components/MiscSettings";

const menuItems = [
    { key: "general", label: "সাধারণ" },
    { key: "profile", label: "প্রোফাইল" },
    { key: "invoice", label: "ইনভয়েস" },
    { key: "deposit", label: "জমা" },
    { key: "product", label: "পণ্য" },
    { key: "purchase", label: "ক্রয়" },
    { key: "customer", label: "কাস্টমার" },
    { key: "supplier", label: "সাপ্লাইয়ার" },
    { key: "stores", label: "স্টোর" },
    { key: "shortcut", label: "শর্টকাট মানুস" },
    { key: "notification", label: "নোটিফিকেশন" },
    { key: "others", label: "অন্যান্য" },
    { key: "permission", label: "ইউজার পারমিশন" },
    { key: "language", label: "ভাষা" },
];

export default function SettingsPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [selected, setSelected] = useState("general");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Sync query param on first load
    useEffect(() => {
        const s = searchParams.get("s");
        if (s && menuItems.find((item) => item.key === s)) {
            setSelected(s);
        }
    }, [searchParams]);

    const handleSelect = (key: string) => {
        setSelected(key);
        setSidebarOpen(false);
        router.replace(`/settings?s=${key}`);
    };

    return (
        <div className="flex flex-col xl:flex-row min-h-screen">
            {/* Sidebar */}
            <aside
                className={`w-full xl:w-64 bg-muted/30 p-4 border-b xl:border-r xl:border-b-0 transition-all duration-200 ${sidebarOpen ? "block" : "hidden"
                    } xl:block`}
            >
                <div className="flex items-center justify-between xl:justify-start mb-4">
                    <h2 className="text-lg font-bold">সেটিংস</h2>
                    <Button
                        variant="ghost"
                        className="xl:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        Close
                    </Button>
                </div>
                <nav className="space-y-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.key}
                            onClick={() => handleSelect(item.key)}
                            className={`block w-full text-left px-3 py-2 rounded-md text-sm font-medium transition ${selected === item.key
                                ? "bg-primary text-white"
                                : "hover:bg-muted"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Mobile Header */}
            <div className="flex items-center justify-between xl:hidden px-4 py-2 border-b bg-background sticky top-0 z-10">
                <h2 className="text-lg font-semibold">
                    সেটিংস ({menuItems.find((i) => i.key === selected)?.label})
                </h2>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                    <Menu className="w-5 h-5" />
                </Button>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-4 xl:p-6 bg-background overflow-y-auto">
                {selected === "general" && (<SettingGeneral />)}

                {selected === "language" && (<SettingLanguage />)}
                {selected === "permission" && <UserList />}
                {selected === "shortcut" && <FABSettings />}
                {selected === "profile" && <UserProfileSettings />}
                {selected === "invoice" && <InvoiceSettings />}
                {selected === "deposit" && <ReceivePaymentToggle />}
                {selected === "product" && <ProductSettings />}
                {selected === "purchase" && <PurchaseSettings />}
                {selected === "customer" && <CustomerSettings />}
                {selected === "supplier" && <SupplierSettings />}
                {selected === "notification" && <ClientNotificationSettings />}
                {selected === "stores" && (
                    <>
                        <StoreSettings />
                        <StoreOptionSettings />
                    </>
                )}
                {selected === "others" && <MiscSettings />}
            </main>
        </div>
    );
}

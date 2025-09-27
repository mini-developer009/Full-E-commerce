"use server";

import { cookies } from "next/headers";

export type Shop = {
    id: string;
    userId: string;
    name: string;
    shopImg: string;
    email: string;
};

export async function getUserShops(): Promise<Shop[] | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (!token) return null;

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/my-shop`, {
            method: "GET",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!res.ok) return null;

        const data = await res.json();

        // Only return safe fields
        if (data.success && data.data) {
            const shop = data.data;
            return [
                {
                    id: shop.id,
                    userId: shop.userId,
                    name: shop.name,
                    shopImg: shop.shopImg,
                    email: shop.email,
                },
            ];
        }

        return null;
    } catch (err) {
        console.error("Error fetching user shops:", err);
        return null;
    }
}

export async function setStoreCookies(shop: Shop) {
    const cookieStore = await cookies();
    cookieStore.set("storeName", shop.name, { path: "/" });
    cookieStore.set("storeImg", shop.shopImg, { path: "/" });
}
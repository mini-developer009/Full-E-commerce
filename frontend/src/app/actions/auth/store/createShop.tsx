"use server";

import { cookies } from "next/headers";

export async function createShopAction(formData: FormData) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return { success: false, message: "Not authenticated" };
  }

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/create-shop`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `${accessToken}`,
      },
    });

    const data = await res.json();

    // set server cookies
    if (data?.success && data?.data) {
      const shop = data.data;
      cookieStore.set("storeName", String(shop.name), { path: "/" });
      cookieStore.set("storeImg", String(shop.shopImg ?? ""), { path: "/" });
      cookieStore.set("storeId", String(shop.id), { path: "/" });
    }

    return data;
  } catch (error: any) {
    console.error("Error creating shop:", error);
    return { success: false, message: "Failed to create store" };
  }
}

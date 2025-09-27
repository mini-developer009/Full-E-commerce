"use server";

import { cookies } from "next/headers";

export async function getUser() {
  try {
    // Force it async since TS thinks it's a Promise
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;
    const token = accessToken || refreshToken;

    if (!token) return null;

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (err) {
    console.error("Error fetching user:", err);
    return null;
  }
}

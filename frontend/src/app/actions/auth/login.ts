"use server";

import { cookies } from "next/headers";
import axios from "axios";

type LoginState = {
    success: boolean;
    message?: string;
    emailNotVerified?: boolean;
};

export async function loginAction(formData: FormData): Promise<LoginState> {
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
        return { success: false, message: "Email and password are required" };
    }

    try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            email,
            password,
        });

        const { accessToken, refreshToken } = res.data.data;

        const cookieStore = await cookies(); // await cookies()

        await cookieStore.set({
            name: "accessToken",
            value: accessToken,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60, // 1 hour
        });

        await cookieStore.set({
            name: "refreshToken",
            value: refreshToken,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 30, // 30 days
        });

        return { success: true, message: "Login successful" };
    } catch (error: any) {
        const msg = error.response?.data?.message || "Login failed. Please try again.";

        return {
            success: false,
            message: msg,
            emailNotVerified: msg.toLowerCase().includes("verify"),
        };
    }
}

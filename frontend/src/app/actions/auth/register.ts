"use server";

import { cookies } from "next/headers";
import axios from "axios";

export async function registerAction(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const phone = formData.get("phone");
  const address = formData.get("address");

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof phone !== "string" ||
    typeof address !== "string"
  ) {
    return { success: false, message: "Missing required fields" };
  }

  try {
    // Step 1: Register with full payload
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      name,
      email,
      phone,
      address,
      password,
    });

    const user = res.data.data;

    if (user.isVerified) {
      // Step 2: Auto login if verified
      const loginRes = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken } = loginRes.data.data;

      const cookieStore = await cookies();

      cookieStore.set("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60, // 1 hour
      });

      cookieStore.set("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });

      return {
        success: true,
        message: "Registration and login successful!",
      };
    } else {
      return {
        success: true,
        message: "Registration successful! Please verify your email.",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Registration failed. Try again.",
    };
  }
}

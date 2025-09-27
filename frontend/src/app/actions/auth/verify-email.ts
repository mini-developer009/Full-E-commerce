// app/actions/auth/verify-email.ts
"use server";

import axios from "axios";

export async function verifyEmailAction(_: any, formData: FormData) {
  const email = formData.get("email");
  const token = formData.get("token");

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-email`, {
      email,
      token,
    });

    return {
      success: true,
      message: res.data.message || "Email verified!",
      accessToken: res.data.data.accessToken,
      refreshToken: res.data.data.refreshToken,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Verification failed",
    };
  }
}

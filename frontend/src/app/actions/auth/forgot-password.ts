"use server";

import axios from "axios";

type ForgotPasswordState = {
  success: boolean;
  message: string;
};

export async function forgotPasswordAction(
  formData: FormData
): Promise<ForgotPasswordState> {
  const email = formData.get("email");

  if (typeof email !== "string" || !email.trim()) {
    return { success: false, message: "Valid email is required" };
  }

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      { email }
    );

    return {
      success: true,
      message: res.data?.message || "Check your email for reset instructions",
    };
  } catch (error: any) {
    const msg =
      error.response?.data?.message || "Failed to send reset email. Try again.";
    return { success: false, message: msg };
  }
}

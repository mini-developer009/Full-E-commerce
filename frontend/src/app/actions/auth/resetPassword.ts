"use server";

import axios from "axios";

type ResetPasswordState = {
    success: boolean;
    message?: string;
};

export async function resetPasswordAction(
    email: string,
    token: string,
    newPassword: string
): Promise<ResetPasswordState> {
    try {
        const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
            { email, newPassword },
            {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            }
        );

        return { success: true, message: res.data.message || "Password reset successful" };
    } catch (error: any) {
        const msg = error.response?.data?.message || "Failed to reset password.";
        return { success: false, message: msg };
    }
}

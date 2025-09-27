"use server";

export async function resendEmailVerificationAction(formData: FormData) {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return { success: false, message: "Email is required" };
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3200/api";

    const res = await fetch(`${baseUrl}/auth/resend-verify-email-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
      cache: "no-store", // Avoid cached responses
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || "Failed to resend code.",
      };
    }

    return {
      success: true,
      message: data?.message || "Verification code resent.",
    };
  } catch (err) {
    console.error("Resend error:", err); // Optional: log server-side
    return {
      success: false,
      message: "Could not connect to server. Check your API base URL.",
    };
  }
}

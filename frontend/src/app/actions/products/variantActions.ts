// app/actions/products/variantActions.ts
"use server";

import { cookies } from "next/headers";

export type VariantInput = {
  type: string;
  description: string;
};

export type VariantData = {
  id: string;
  type: string;
  description: string;
  shopId: string;
};

export type VariantResponse = {
  success: boolean;
  data?: VariantData;
  message?: string;
  statusCode?: number;
};

/**
 * Helper: get access token from cookies
 */
async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("accessToken")?.value || null;
}

/**
 * Create a new variant
 */
export async function createVariant(
  variant: VariantInput
): Promise<VariantResponse> {
  const token = await getAccessToken();
  if (!token) return { success: false, message: "Not authenticated" };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/variant/create`,
      {
        method: "POST",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variant),
      }
    );

    const data = await res.json();

    return {
      success: res.ok,
      data: data.data,
      message: data.message,
      statusCode: data.statusCode,
    };
  } catch (err) {
    console.error("Error creating variant:", err);
    return { success: false, message: "Server error while creating variant" };
  }
}

/**
 * Update an existing variant
 */
export async function updateVariant(
  variantId: string,
  variant: VariantInput
): Promise<VariantResponse> {
  const token = await getAccessToken();
  if (!token) return { success: false, message: "Not authenticated" };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/variant/update/${variantId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(variant),
      }
    );

    const data = await res.json();

    return {
      success: res.ok,
      data: data.data,
      message: data.message,
      statusCode: data.statusCode,
    };
  } catch (err) {
    console.error("Error updating variant:", err);
    return { success: false, message: "Server error while updating variant" };
  }
}

/**
 * Get a single variant by ID
 */
export async function getVariant(
  variantId: string
): Promise<VariantResponse> {
  const token = await getAccessToken();
  if (!token) return { success: false, message: "Not authenticated" };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/variant/single-variant/${variantId}`,
      {
        method: "GET",
        headers: { Authorization: token },
      }
    );

    const data = await res.json();

    return {
      success: res.ok,
      data: data.data,
      message: data.message,
      statusCode: data.statusCode,
    };
  } catch (err) {
    console.error("Error fetching variant:", err);
    return { success: false, message: "Server error while fetching variant" };
  }
}

/**
 * Get all variants
 */
export type VariantListResponse = {
  success: boolean;
  message?: string;
  statusCode?: number;
  data?: {
    meta: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    result: VariantData[];
  };
};

export async function getAllVariants(): Promise<VariantListResponse> {
  const token = await getAccessToken();
  if (!token) return { success: false, message: "Not authenticated" };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/variant/all-variant`,
      {
        method: "GET",
        headers: { Authorization: token },
      }
    );

    const data = await res.json();

    return {
      success: res.ok,
      data: data.data,
      message: data.message,
      statusCode: data.statusCode,
    };
  } catch (err) {
    console.error("Error fetching all variants:", err);
    return { success: false, message: "Server error while fetching variants" };
  }
}

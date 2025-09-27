"use server";

import { cookies } from "next/headers";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ActionResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

// ✅ Create Product
export async function createProductAction(formData: FormData): Promise<ActionResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await axios.post(`${API_URL}/product/create-product`, formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to create product",
    };
  }
}

// ✅ Get All Products
export async function getAllProductsAction(params: { page?: number; limit?: number; search?: string } = {}): Promise<ActionResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const query = new URLSearchParams();
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.search) query.append("search", params.search);

    const url = `${API_URL}/product/all-product?${query.toString()}`;

    const res = await axios.get(url, {
      headers: { Authorization: token },
    });

    return {
      success: true,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch products",
    };
  }
}

// ✅ Get Single Product
export async function getSingleProductAction(productId: string): Promise<ActionResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await axios.get(`${API_URL}/product/single-product/${productId}`, {
      headers: { Authorization: token },
    });

    return {
      success: true,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to fetch product",
    };
  }
}

// ✅ Update Product
export async function updateProductAction(productId: string, formData: FormData): Promise<ActionResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await axios.patch(`${API_URL}/product/update-product/${productId}`, formData, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      success: true,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to update product",
    };
  }
}

// ✅ Delete Product
export async function deleteProductAction(productId: string): Promise<ActionResponse> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    const res = await axios.delete(`${API_URL}/product/single-product/${productId}`, {
      headers: { Authorization: token },
    });

    return {
      success: true,
      message: res.data.message,
      data: res.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "Failed to delete product",
    };
  }
}

// app/actions/products/categoryActions.ts
"use server";

import { cookies } from "next/headers";

export type CategoryInput = {
    name: string;
    description: string;
};

export type CategoryData = {
    id: string;
    name: string;
    description: string;
    shopId: string;
};

export type CategoryResponse = {
    success: boolean;
    data?: CategoryData;
    message?: string;
    statusCode?: number;
};

export type CategoryListResponse = {
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
        result: CategoryData[];
    };
};

/**
 * Helper: get access token from cookies
 */
async function getAccessToken() {
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value || null;
}

/**
 * Create a new category
 */
export async function createCategory(
    category: CategoryInput
): Promise<CategoryResponse> {
    const token = await getAccessToken();
    if (!token) return { success: false, message: "Not authenticated" };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/category/create`,
            {
                method: "POST",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category),
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
        console.error("Error creating category:", err);
        return { success: false, message: "Server error while creating category" };
    }
}

/**
 * Update a category
 */
export async function updateCategory(
    categoryId: string,
    category: CategoryInput
): Promise<CategoryResponse> {
    const token = await getAccessToken();
    if (!token) return { success: false, message: "Not authenticated" };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/category/update/${categoryId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(category),
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
        console.error("Error updating category:", err);
        return { success: false, message: "Server error while updating category" };
    }
}

/**
 * Get all categories
 */
export async function getAllCategories(): Promise<CategoryListResponse> {
    const token = await getAccessToken();
    if (!token) return { success: false, message: "Not authenticated" };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/category/all-category`,
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
        console.error("Error fetching categories:", err);
        return { success: false, message: "Server error while fetching categories" };
    }
}

/**
 * Get a single category
 */
export async function getCategory(
    categoryId: string
): Promise<CategoryResponse> {
    const token = await getAccessToken();
    if (!token) return { success: false, message: "Not authenticated" };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/category/single-category/${categoryId}`,
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
        console.error("Error fetching category:", err);
        return { success: false, message: "Server error while fetching category" };
    }
}

/**
 * Delete a category
 */
export async function deleteCategory(
    categoryId: string
): Promise<CategoryResponse> {
    const token = await getAccessToken();
    if (!token) return { success: false, message: "Not authenticated" };

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/category/delete/${categoryId}`,
            {
                method: "DELETE",
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
        console.error("Error deleting category:", err);
        return { success: false, message: "Server error while deleting category" };
    }
}

"use server";

import { cookies } from "next/headers";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ActionResponse<T = any> = {
    success: boolean;
    message?: string;
    data?: T;
};

// ====================== Customer Group Actions ======================

// ✅ Create Customer Group
export async function createCustomerGroupAction(formData: FormData): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const payload = {
            name: formData.get("name"),
            date: formData.get("date"),
        };

        const res = await axios.post(`${API_URL}/customerGroup/create-cg`, payload, {
            headers: { Authorization: token },
        });

        return { success: true, message: res.data.message, data: res.data.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to create customer group",
        };
    }
}

// ✅ Get All Customer Groups
export async function getAllCustomerGroupsAction(): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await axios.get(`${API_URL}/customerGroup/getall-cg`, {
            headers: { Authorization: token },
        });

        return { success: true, message: res.data.message, data: res.data.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch customer groups",
        };
    }
}

// ✅ Get Single Customer Group
export async function getSingleCustomerGroupAction(groupId: string): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await axios.get(`${API_URL}/customerGroup/single-cg/${groupId}`, {
            headers: { Authorization: token },
        });

        return { success: true, message: res.data.message, data: res.data.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to fetch customer group",
        };
    }
}

// ✅ Update Customer Group
export async function updateCustomerGroupAction(
    groupId: string,
    payload: Record<string, any>
): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await axios.patch(`${API_URL}/customerGroup/update-cg/${groupId}`, payload, {
            headers: { Authorization: token },
        });

        return { success: true, message: res.data.message, data: res.data.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to update customer group",
        };
    }
}

// ✅ Delete Customer Group
export async function deleteCustomerGroupAction(groupId: string): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await axios.delete(`${API_URL}/customerGroup/delete-cg/${groupId}`, {
            headers: { Authorization: token },
        });

        return { success: true, message: res.data.message, data: res.data.data };
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || "Failed to delete customer group",
        };
    }
}

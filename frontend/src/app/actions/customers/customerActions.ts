"use server";

import { cookies } from "next/headers";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type ActionResponse<T = any> = {
    success: boolean;
    message?: string;
    data?: T;
};

interface GetCustomersParams {
    page?: number
    limit?: number
    status?: string
    search?: string
}

// ✅ Create Customer
export async function createCustomerAction(formData: FormData): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const payload = {
            name: formData.get("name"),
            fatherName: formData.get("fatherName"),
            motherName: formData.get("motherName"),
            dateOfBirth: formData.get("dateOfBirth"),
            DueLimit: formData.get("DueLimit"),
            Ref: formData.get("Ref"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            address: formData.get("address"),
            status: formData.get("status"),
            upazilla: formData.get("upazilla"),
            zipCode: formData.get("zipCode"),
        };

        const res = await axios.post(`${API_URL}/customer/create-customer`, payload, {
            headers: { Authorization: token },
        });

        return { success: true, message: res.data.message, data: res.data.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Failed to create customer" };
    }
}

// ✅ Get All Customers
export async function getAllCustomersAction(
    params: GetCustomersParams = {}
): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get('accessToken')?.value

        const query = new URLSearchParams()

        if (params.page) query.append('page', params.page.toString())
        if (params.limit) query.append('limit', params.limit.toString())
        if (params.status) query.append('status', params.status)
        if (params.search) query.append('search', params.search)

        const url = `${API_URL}/customer/all-customer?${query.toString()}`

        const res = await axios.get(url, {
            headers: {
                Authorization: token,
            },
        })

        return {
            success: true,
            message: res.data.message,
            data: res.data.data,
        }
    } catch (error: any) {
        return {
            success: false,
            message: error.response?.data?.message || 'Failed to fetch customers',
        }
    }
}

// ✅ Get Single Customer
export async function getSingleCustomerAction(customerId: string): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await axios.get(`${API_URL}/customer/single-customer/${customerId}`, {
            headers: { Authorization: token },
        });

        return { success: true, message: res.data.message, data: res.data.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Failed to fetch customer" };
    }
}

// ✅ Update Customer
export async function updateCustomerAction(customerId: string, payload: Record<string, any>): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await axios.patch(`${API_URL}/customer/update-customer/${customerId}`, payload, {
            headers: { Authorization: token },
        });

        return { success: true, message: res.data.message, data: res.data.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Failed to update customer" };
    }
}

// ✅ Delete Customer
export async function deleteCustomerAction(customerId: string): Promise<ActionResponse> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        const res = await axios.delete(`${API_URL}/customer/delete-customer/${customerId}`, {
            headers: { Authorization: token },
        });

        return { success: true, message: res.data.message, data: res.data.data };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || "Failed to delete customer" };
    }
}

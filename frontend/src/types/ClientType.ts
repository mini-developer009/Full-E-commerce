export interface ClientType {
    id: string
    name: string
    fatherName: string
    motherName: string
    dateOfBirth: string | null
    Ref?: string | null
    shopName: string
    DueLimit: number
    email: string
    phone: string
    address: string
    upazilla?: string
    zipCode?: string
    road?: string | null
    shopId: string
    cgId?: string | null
    group?: string | null
    orders: any[]
    payment: any[]
    fileUrl?: string
    status: 'ACTIVE' | 'INACTIVE'
    maxDueLimit?: number
    phoneNumber?: number
    isActive?: string
    dob?: string

    // 🔽 Add these if you compute them in the frontend
    previousDue: number
}

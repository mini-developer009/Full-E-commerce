'use client'

import React, { useState } from 'react'
import {
    Card, CardHeader, CardTitle
} from '@/components/ui/card'
import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious,
} from '@/components/ui/pagination'
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import PrintWrapper from '@/components/PrintWrapper'
import PrintableHeader from '@/components/PrintableHeader'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Eye, FileText, Funnel, Pencil, Plus, Trash2, Users } from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface MoneylenderClient {
    id: number
    photo: string
    name: string
    phone: string
    address: string
    group?: string
    details: string
}


const clientListData: MoneylenderClient[] = [
    {
        id: 1,
        photo: "/profile.jpg",
        name: "মোঃ সুমন হোসেন",
        phone: "017xxxxxxxx",
        address: "শ্যামনগর, সাতক্ষীরা",
        group: "A",
        details: "প্রথম বন্ধক ২০২৫/০৫/০১",
    },
    {
        id: 2,
        photo: "/profile.jpg",
        name: "রুমা খাতুন",
        phone: "018xxxxxxxx",
        address: "রূপসা, খুলনা",
        group: "B",
        details: "শেষ লেনদেন ২০২৫/০৪/২০",
    },
]


// ✅ Dynamic table fields
const clientTableFields: {
    key: keyof MoneylenderClient | "actions"
    label: string
    isImage?: boolean
    align?: "left" | "right"
}[] = [
        { key: "id", label: "আইডি" },
        { key: "photo", label: "ছবি", isImage: true },
        { key: "name", label: "কাস্টমার বিস্তারিত" }, // we'll combine inside render
        { key: "details", label: "বিস্তারিত" },
        { key: "actions", label: "একশন", align: "right" },
    ]


// ✅ Dynamic MoneylenderTable component
const MoneylenderClientTable: React.FC<{ data: MoneylenderClient[] }> = ({ data }) => {
    return (
        <div className="overflow-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        {clientTableFields.map((field) => (
                            <TableHead key={field.key} className={`px-4 py-2 ${field.align === "right" ? "text-right" : "text-left"}`}>
                                {field.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={clientTableFields.length} className="text-center py-6">
                                কোনো ডাটা নেই
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row) => (
                            <TableRow key={row.id} className="hover:bg-muted/50">
                                {clientTableFields.map((field, index) => {
                                    const value = row[field.key as keyof MoneylenderClient]

                                    if (field.key === "actions") {
                                        return (
                                            <TableCell key="actions" className="text-right px-4 py-2">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/users/moneylender/moneylenders-client-list/${1}`}>
                                                        <Button variant="ghost" size="icon" className="text-blue-600" aria-label="View">
                                                            <Eye size={18} />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="ghost" size="icon" className="text-green-600" aria-label="Edit">
                                                        <Pencil size={18} />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="text-red-600" aria-label="Delete">
                                                        <Trash2 size={18} />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        )
                                    }

                                    if (field.key === "photo" && typeof value === "string") {
                                        return (
                                            <TableCell key="photo" className="px-4 py-2">
                                                <img src={value} alt="photo" className="w-10 h-10 rounded-full object-cover" />
                                            </TableCell>
                                        )
                                    }

                                    if (field.key === "name") {
                                        return (
                                            <TableCell key="name" className="px-4 py-2">
                                                <div className="font-semibold">{row.name}</div>
                                                <div className="text-sm text-muted-foreground">{row.phone}</div>
                                                <div className="text-sm text-muted-foreground">{row.address}</div>
                                            </TableCell>
                                        )
                                    }

                                    return (
                                        <TableCell key={field.key} className={`px-4 py-2 ${field.align === "right" ? "text-right" : "text-left"}`}>
                                            {value}
                                        </TableCell>
                                    )
                                })}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}


const rowsPerPageOptions = [10, 20, 30, 40, 50]

const MoneylenderListPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const totalPages = Math.ceil(clientListData.length / rowsPerPage)
    const currentData = clientListData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    const t = useTranslations('nav')
    const tg = useTranslations('global')

    return (
        <div className="w-full p-4 space-y-6">


            {/* Main table card */}
            <Card className="w-full p-6 space-y-4">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h3 className="text-lg font-semibold"> {t('moneylenders-client-list')}</h3>
                    <Button variant="ghost" className="w-fit self-end sm:self-auto">
                        <Funnel className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                </div>
                <div className='flex items-center gap-4'>
                    <Input type="text" placeholder={tg('search-by', { name: t('customers') })} />
                    <Select onValueChange={(value) => {
                        setRowsPerPage(parseInt(value))
                        setCurrentPage(1)
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={tg('select-rows')} />
                        </SelectTrigger>
                        <SelectContent>
                            {rowsPerPageOptions.map((value) => (
                                <SelectItem key={value} value={value.toString()}>
                                    {value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <PrintWrapper printTitle="Customers Statement" preview={false}>
                        <div className="p-6 bg-white">
                            <div className='pt-4'>
                                <PrintableHeader
                                    title="Customers Statement"
                                    subtitle="Invoice #12345"
                                    date={new Date().toLocaleDateString()}
                                    Store={{
                                        name: "Suborno Ltd",
                                        logoUrl: "https://www.suborno.dev/favicon.ico",
                                        address: "123 Business Street, Dhaka",
                                        phone: "01234-567890",
                                        email: "info@suborno.dev",
                                    }}
                                    accentColor="blue-600"
                                />
                                <MoneylenderClientTable data={currentData} />
                            </div>
                        </div>
                    </PrintWrapper>
                </div>

                {/* ✅ Reusable dynamic table */}
                <MoneylenderClientTable data={currentData} />

                {/* Pagination */}
                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                                }}
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={i + 1 === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setCurrentPage(i + 1)
                                    }}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault()
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                }}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Card>
        </div>
    )
}

export default MoneylenderListPage

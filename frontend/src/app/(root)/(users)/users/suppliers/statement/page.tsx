'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from '@/components/ui/table'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { FileText, Funnel, Plus, Printer, Users } from 'lucide-react'
import PrintWrapper from '@/components/PrintWrapper'
import DynamicTable from '@/components/DynamicTable'
import PrintableHeader from '@/components/PrintableHeader'
import { useTranslations } from 'next-intl'
import Link from 'next/link'


interface StatementRow {
    id: number
    date: string
    product: string
    unit: string
    qty: number
    price: number
    totalPurchase: number
    discount: number
    subTotal: number
    payment: number
    due: number
}



const initialStatement: StatementRow[] = [
    {
        id: 1,
        date: "25 May 2025",
        product: "পূর্বের বাকী",
        unit: "",
        qty: 0,
        price: 0,
        totalPurchase: 0,
        discount: 0,
        subTotal: 0,
        payment: 0,
        due: 0,
    },
    {
        id: 2,
        date: "26 May 2025",
        product: "সিমেন্ট",
        unit: "বস্তা",
        qty: 10,
        price: 550,
        totalPurchase: 5500,
        discount: 500,
        subTotal: 5000,
        payment: 3000,
        due: 2000,
    },
    {
        id: 3,
        date: "27 May 2025",
        product: "রড",
        unit: "টন",
        qty: 2,
        price: 75000,
        totalPurchase: 150000,
        discount: 0,
        subTotal: 150000,
        payment: 50000,
        due: 100000,
    },
    {
        id: 4,
        date: "28 May 2025",
        product: "বালি",
        unit: "ট্রাক",
        qty: 3,
        price: 2200,
        totalPurchase: 6600,
        discount: 600,
        subTotal: 6000,
        payment: 6000,
        due: 0,
    },
    {
        id: 5,
        date: "29 May 2025",
        product: "ইট",
        unit: "হাজার",
        qty: 5,
        price: 850,
        totalPurchase: 4250,
        discount: 250,
        subTotal: 4000,
        payment: 2000,
        due: 2000,
    },
    {
        id: 6,
        date: "30 May 2025",
        product: "স্টোন চিপস",
        unit: "ঘনফুট",
        qty: 50,
        price: 90,
        totalPurchase: 4500,
        discount: 0,
        subTotal: 4500,
        payment: 4500,
        due: 0,
    },
];

const rowsPerPage = 10

const navLinks = [
    {
        href: '/users/suppliers/add',
        icon: <Plus className="w-6 h-6 text-primary" />,
        title: 'add-new',
        subtitle: 'Add New Client',
    },
    {
        href: '/users/suppliers/groups',
        icon: <Users className="w-6 h-6 text-primary" />,
        title: 'suppliers-groups',
        subtitle: 'Client Groups',
    },
    {
        href: '/users/suppliers/statement',
        icon: <FileText className="w-6 h-6 text-primary" />,
        title: 'suppliers-statement',
        subtitle: 'Client Statement',
    },
]

const CustomarStatmentPage = () => {


    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(initialStatement.length / rowsPerPage)
    const currentData = initialStatement.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    const tn = useTranslations('nav')


    return (
        <div className="w-full p-4 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                        <Card className="w-full p-6 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer hover:border-primary flex flex-col items-center text-center rounded-2xl">
                            <div className="mb-3">{link.icon}</div>
                            <div className="font-semibold text-base">{tn(link.title)}</div>
                        </Card>
                    </Link>
                ))}
            </div>
            <Card className="w-full p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h3 className="text-lg font-semibold">Statement Statement</h3>
                    <Button variant="ghost" className="w-fit self-end sm:self-auto">
                        <Funnel className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                </div>
                <div className='flex items-center gap-4'>
                    <Input type="text" className='' placeholder='Search by customar' />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Rows" />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
                                <SelectItem key={value} value={value.toString()}>
                                    {value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <PrintWrapper printTitle="সাপ্লাইয়ার বিবৃতি" preview={false}>
                        <div className="p-6 bg-white">

                            <div className='pt-4'>
                                <PrintableHeader
                                    title="Statement Statement"
                                    subtitle="Invoice #12345"
                                    date={new Date().toLocaleDateString()}
                                    Store={{
                                        name: "Suborno Ltd",
                                        logoUrl: "https://www.suborno.dev/favicon.ico",
                                        address: "123 Business Street, Dhaka",
                                        phone: "01234-567890",
                                        email: "info@suborno.dev",
                                    }}
                                    // customer={{
                                    //     name: "Md. Hasan Ali",
                                    //     address: "45/A, Green Road, Dhaka",
                                    //     phone: "01711-123456",
                                    //     email: "hasan@example.com",
                                    // }}
                                    accentColor="blue-600"
                                />
                                <DynamicTable
                                    data={currentData}
                                    showActions={false}
                                />
                            </div>
                        </div>
                    </PrintWrapper>

                </div>
                {/* <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>আইডি</TableHead>
                            <TableHead>তারিখ</TableHead>
                            <TableHead>পণ্য</TableHead>
                            <TableHead>ইউনিট</TableHead>
                            <TableHead>পরিমান</TableHead>
                            <TableHead>মূল্য</TableHead>
                            <TableHead>মোট ক্রয়</TableHead>
                            <TableHead>ডিসঃ</TableHead>
                            <TableHead>সর্বমোট</TableHead>
                            <TableHead>পেমেন্ট</TableHead>
                            <TableHead>বাকি</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {currentData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.product}</TableCell>
                                <TableCell>{row.unit}</TableCell>
                                <TableCell>{row.qty}</TableCell>
                                <TableCell>{row.price.toFixed(2)}</TableCell>
                                <TableCell>{row.totalPurchase.toFixed(2)}</TableCell>
                                <TableCell>{row.discount.toFixed(2)}</TableCell>
                                <TableCell>{row.subTotal.toFixed(2)}</TableCell>
                                <TableCell>{row.payment.toFixed(2)}</TableCell>
                                <TableCell>{row.due.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table> */}
                <DynamicTable
                    data={currentData}
                    showActions={true}
                    onView={(row) => console.log("View", row)}
                    onEdit={(row) => console.log("Edit", row)}
                    onDelete={(id) => console.log("Delete ID", id)}
                />


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

export default CustomarStatmentPage
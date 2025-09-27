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
import Link from 'next/link'
import { useTranslations } from 'next-intl'


interface StatementRow {
    id: number
    date: string
    product: string
    qty: number | string
    unit: string
    price: number
    description: string
    labourCost: number
    bill: number
    returnAmount: number
    receive: number
    balance: number
}


const initialStatement: StatementRow[] = [
    {
        id: 1,
        date: '25 May 2025',
        product: '',
        qty: '',
        unit: '',
        price: 0,
        description: 'Previous due',
        labourCost: 0,
        bill: 0,
        returnAmount: 0,
        receive: 0,
        balance: 0,
    },
    {
        id: 2,
        date: '25 May 2025',
        product: 'sdfsdfsd',
        qty: 1,
        unit: 'N/A',
        price: 150,
        description: '',
        labourCost: 10,
        bill: 150,
        returnAmount: 0,
        receive: 40,
        balance: 110,
    },
    {
        id: 3,
        date: '26 May 2025',
        product: 'Paint',
        qty: 2,
        unit: 'Litre',
        price: 200,
        description: 'Wall paint',
        labourCost: 30,
        bill: 400,
        returnAmount: 0,
        receive: 200,
        balance: 200,
    },
    {
        id: 4,
        date: '27 May 2025',
        product: 'Cement',
        qty: 3,
        unit: 'Bag',
        price: 500,
        description: 'Foundation work',
        labourCost: 100,
        bill: 1500,
        returnAmount: 0,
        receive: 1000,
        balance: 500,
    },
    {
        id: 5,
        date: '28 May 2025',
        product: 'Bricks',
        qty: 100,
        unit: 'Piece',
        price: 10,
        description: '',
        labourCost: 50,
        bill: 1000,
        returnAmount: 0,
        receive: 700,
        balance: 300,
    },
    {
        id: 6,
        date: '29 May 2025',
        product: 'Sand',
        qty: 2,
        unit: 'Truck',
        price: 1000,
        description: 'Floor leveling',
        labourCost: 80,
        bill: 2000,
        returnAmount: 0,
        receive: 1500,
        balance: 500,
    }
]

const rowsPerPage = 10


const navLinks = [
    {
        href: '/users/customers/add',
        icon: <Plus className="w-6 h-6 text-primary" />,
        title: 'add-client',
        subtitle: 'Add New Client',
    },
    {
        href: '/users/customers/group',
        icon: <Users className="w-6 h-6 text-primary" />,
        title: 'client-groups',
        subtitle: 'Client Groups',
    },
    {
        href: '/users/customers/statement',
        icon: <FileText className="w-6 h-6 text-primary" />,
        title: 'client-statement',
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

    const t = useTranslations('ClientsPage.cleints')
    return (
        <div className="w-full p-4 space-y-6">
            {/* Navigation Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                        <Card className="w-full p-6 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer hover:border-primary flex flex-col items-center text-center rounded-2xl">
                            <div className="mb-3">{link.icon}</div>
                            <div className="font-semibold text-base">{t(link.title)}</div>
                        </Card>
                    </Link>
                ))}
            </div>
            <Card className="w-full p-6 space-y-4">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h3 className="text-lg font-semibold">Customers Statement</h3>
                    <Button variant="ghost" className="w-fit self-end sm:self-auto">
                        <Funnel className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                </div>
                <div className='flex items-center gap-4'>
                    <Input type="text" className='' placeholder='Search by Name' />
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

                    <PrintWrapper printTitle="Customers Statement" preview={false}>
                        <div className="p-6 ">
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
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>SL</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Product</TableHead>
                            <TableHead>QTY</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Labour</TableHead>
                            <TableHead>Bill</TableHead>
                            <TableHead>Return</TableHead>
                            <TableHead>Receive</TableHead>
                            <TableHead>Balance</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {currentData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.product}</TableCell>
                                <TableCell>{row.qty}</TableCell>
                                <TableCell>{row.unit}</TableCell>
                                <TableCell>{row.price.toFixed(2)}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.labourCost.toFixed(2)}</TableCell>
                                <TableCell>{row.bill.toFixed(2)}</TableCell>
                                <TableCell>{row.returnAmount.toFixed(2)}</TableCell>
                                <TableCell>{row.receive.toFixed(2)}</TableCell>
                                <TableCell>{row.balance.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

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
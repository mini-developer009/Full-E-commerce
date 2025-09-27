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
import CreateSuppliers from './components/createSuppliers'
import EditSuppliers from './components/editSuppliers'
import PrintWrapper from '@/components/PrintWrapper'
import PrintableHeader from '@/components/PrintableHeader'
import DynamicTable from '@/components/DynamicTable'
import { useTranslations } from 'next-intl'
import Link from 'next/link'



interface Supplier {
    id: number
    image: string
    name: string
    Store: string
    email: string
    phone: string
    account: string
}



const suppliers: Supplier[] = [
    {
        id: 1,
        image: '/profile.jpg', // Add your image path or URL
        name: 'Ratul Ahmed',
        Store: 'ABC Ltd.',
        email: 'ratul@example.com',
        phone: '01710000000',
        account: '01710000000',
    },
    {
        id: 2,
        image: '/profile.jpg',
        name: 'Jannat Rahman',
        Store: 'XYZ Traders',
        email: 'jannat@xyz.com',
        phone: '01820000000',
        account: '01820000000',
    },
    // Add more if needed
]

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

const rowsPerPage = 10

const CustomarStatmentPage = () => {


    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(suppliers.length / rowsPerPage)
    const suppliersData = suppliers.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )



    const t = useTranslations('nav')
    const tg = useTranslations('global')

    return (
        <div className="w-full p-4 space-y-6">
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
                    <h3 className="text-lg font-semibold">{t('suppliers-list')}</h3>
                    <Button variant="ghost" className="w-fit self-end sm:self-auto">
                        <Funnel className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                </div>

                <div className='flex items-center gap-4'>
                    <Input type="text" className='' placeholder={tg('search-by', { name: tg('suppliers') })} />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={tg('select-rows')} />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
                                <SelectItem key={value} value={value.toString()}>
                                    {value}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <PrintWrapper printTitle="Suppliers" preview={false}>
                        <div className="p-6 bg-white">

                            <div className='pt-4'>
                                <PrintableHeader
                                    title="Suppliers"
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
                                    data={suppliersData}
                                    showActions={false}
                                />
                            </div>
                        </div>
                    </PrintWrapper>

                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID No</TableHead>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Store</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Account</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {suppliersData.map((supplier) => (
                            <TableRow key={supplier.id}>
                                {/* ID */}
                                <TableCell>{supplier.id}</TableCell>

                                {/* Image */}
                                <TableCell>
                                    <img
                                        src={supplier.image}
                                        alt={supplier.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                </TableCell>

                                {/* Name */}
                                <TableCell className="font-medium">{supplier.name}</TableCell>

                                {/* Store */}
                                <TableCell className="text-sm text-muted-foreground">
                                    {supplier.Store}
                                </TableCell>

                                {/* Email */}
                                <TableCell className="text-sm text-muted-foreground">
                                    {supplier.email}
                                </TableCell>

                                {/* Phone */}
                                <TableCell className="text-sm text-muted-foreground">
                                    {supplier.phone}
                                </TableCell>

                                {/* Account */}
                                <TableCell>{supplier.account}</TableCell>

                                {/* Actions */}
                                <TableCell>
                                    <div className="flex gap-2">
                                        <EditSuppliers />
                                        <Button size="sm" variant="destructive">
                                            Delete
                                        </Button>
                                    </div>
                                </TableCell>
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
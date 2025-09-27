'use client'

import React, { useState } from 'react'
import {
    Card,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import {
    Select, SelectContent, SelectItem,
    SelectTrigger, SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Table, TableBody, TableCell,
    TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import {
    DropdownMenu, DropdownMenuContent,
    DropdownMenuItem, DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Dialog, DialogContent, DialogHeader,
    DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import {
    Eye, FileText, Pencil, Trash2, Plus, Users, MoreVertical, DollarSign, Phone, MapPin, CalendarDays, BadgeDollarSign, CheckCircle,
    XCircle, CircleDot
} from 'lucide-react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { LuPlus } from 'react-icons/lu'


interface CraftsmanItem {
    id: number
    name: string
    phone: string
    group: string
    address?: string
    status: 'Activated' | 'Deactivated'
    createdAt: string
    previousDue: number
    bill: number
    totalBill: number
    paid: number
    returnAmount: number
    refund: number
    balance: number
    image?: string
    due?: number // Optional field for due amount
}

const craftsmanData: CraftsmanItem[] = [
    {
        id: 1,
        name: 'Irin',
        phone: '01999999989',
        group: 'Chattogram',
        address: 'Rajpar',
        status: 'Activated',
        createdAt: '25 May 2025',
        previousDue: 0,
        bill: 257.5,
        totalBill: 257.5,
        paid: 140,
        returnAmount: 0,
        refund: 0,
        balance: 117.5,
        image: '',
    },
    {
        id: 2,
        name: 'Suborno',
        phone: '01700000001',
        group: 'Rajshahi',
        address: 'Uposohor, Rajshahi',
        status: 'Activated',
        createdAt: '11 Jun 2025',
        previousDue: 0,
        bill: 0,
        totalBill: 0,
        paid: 0,
        returnAmount: 0,
        refund: 0,
        balance: 0,
        image: '',
    },
    // ... Add other rows similarly
]

const tableFields = [
    { key: 'id', label: 'আইডি' },
    { key: 'image', label: 'ছবি', isImage: true },
    { key: 'name', label: 'নাম' },
    { key: 'phone', label: 'ফোন' },
    { key: 'group', label: 'ক্লায়েন্ট গ্রুপ' },
    { key: 'address', label: 'ঠিকানা' },
    { key: 'status', label: 'অবস্থা' },
    { key: 'createdAt', label: 'তৈরির সময়' },
    { key: 'previousDue', label: 'পূর্বের বাকী', align: 'right' },
    { key: 'bill', label: 'বিল', align: 'right' },
    { key: 'totalBill', label: 'মোট বিল', align: 'right' },
    { key: 'paid', label: 'জমা', align: 'right' },
    { key: 'returnAmount', label: 'বিক্রয় ফেরত', align: 'right' },
    { key: 'refund', label: 'টাকা ফেরত', align: 'right' },
    { key: 'balance', label: 'বাকি', align: 'right' },
    { key: 'actions', label: 'একশন', align: 'right' }
]

const CraftsmanTable = ({ data }: { data: CraftsmanItem[] }) => {
    const [selectedCraftsman, setSelectedCraftsman] = useState<CraftsmanItem | null>(null)
    const [showCraftsmanSheet, setShowCraftsmanSheet] = useState<CraftsmanItem | null>(null)


    return (
        <div className="overflow-auto border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        {tableFields.map(field => (
                            <TableHead
                                key={field.key}
                                className={field.align === 'right' ? 'text-right' : 'text-left'}
                            >
                                {field.label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map(row => (
                        <TableRow key={row.id}>
                            {tableFields.map(field => {
                                if (field.key === 'actions') {
                                    return (
                                        <TableCell key="actions" className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreVertical className="w-5 h-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => setShowCraftsmanSheet(row)}>
                                                        <Eye className="w-4 h-4 mr-2" /> View Details
                                                    </DropdownMenuItem>

                                                    <DropdownMenuItem onClick={() => alert('Edit')}>
                                                        <Pencil className="w-4 h-4 mr-2" /> Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => alert('Delete')}>
                                                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => alert('Statement')}>
                                                        <FileText className="w-4 h-4 mr-2" /> View Statement
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => alert(row.status === 'Activated' ? 'Deactivate' : 'Activate')}>
                                                        <Users className="w-4 h-4 mr-2" /> {row.status === 'Activated' ? 'Deactivate' : 'Activate'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        onClick={() => setSelectedCraftsman(row)} // Set the selected craftsman
                                                    >
                                                        <DollarSign className="w-4 h-4 mr-2" /> নতুন জমা যুক্ত করুন
                                                    </DropdownMenuItem>


                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    )
                                }

                                const value = row[field.key as keyof CraftsmanItem]

                                return (
                                    <TableCell key={field.key} className={field.align === 'right' ? 'text-right' : 'text-left'}>
                                        {field.isImage ? (
                                            <div className="w-10 h-10 bg-gray-200 rounded-full" />
                                        ) : typeof value === 'number' ? (
                                            value.toLocaleString()
                                        ) : (
                                            value
                                        )}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Dialog for জমা */}
            <Dialog open={!!selectedCraftsman} onOpenChange={(open) => !open && setSelectedCraftsman(null)}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>
                            নতুন জমা যুক্ত করুন: {selectedCraftsman?.name}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6">
                        {/* Craftsman Info */}
                        <section className="border rounded-md p-4 bg-muted/50">
                            <p className="text-sm font-medium">নাম: {selectedCraftsman?.name}</p>
                            <p className="text-sm text-muted-foreground">বাকি: {selectedCraftsman?.due?.toLocaleString()} ৳</p>
                            <p className="text-sm text-muted-foreground">Invoice ID: {selectedCraftsman?.id}</p>
                        </section>

                        {/* Form Inputs */}
                        <section className="space-y-4">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <Label htmlFor="date">তারিখ</Label>
                                    <Input id="date" type="date" />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="amount">টাকার পরিমাণ</Label>
                                    <Input id="amount" type="number" placeholder="৳" />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="note">সংক্ষিপ্ত নোট <span className="text-xs text-muted-foreground">(ঐচ্ছিক)</span></Label>
                                <Input id="note" placeholder="জমা বর্ণনা" />
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-1">
                                    <Label htmlFor="bank">Bank / Wallet</Label>
                                    <Select>
                                        <SelectTrigger id="bank">
                                            <SelectValue placeholder="নির্বাচন করুন" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="aibl">AIBL</SelectItem>
                                            <SelectItem value="dbbl">DBBL</SelectItem>
                                            <SelectItem value="cash">Cash</SelectItem>
                                            <SelectItem value="bkash">Bkash</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="method">পেমেন্ট মেথড</Label>
                                    <Select>
                                        <SelectTrigger id="method">
                                            <SelectValue placeholder="মেথড নির্বাচন করুন" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="bkash">Bkash</SelectItem>
                                            <SelectItem value="card">Card</SelectItem>
                                            <SelectItem value="cash">Cash</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="category">ক্যাটাগরি</Label>
                                <Select>
                                    <SelectTrigger id="category">
                                        <SelectValue placeholder="ক্যাটাগরি নির্বাচন করুন" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="gold">Gold</SelectItem>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="due">বাকি আদায়</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="cheque">চেক নম্বর <span className="text-xs text-muted-foreground">(যদি থাকে)</span></Label>
                                <Input id="cheque" placeholder="চেক নং" />
                            </div>

                            {/* Notification Options */}
                            <div className="flex items-center gap-6 pt-2">
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="sms" className="accent-primary h-4 w-4" />
                                    <Label htmlFor="sms" className="text-sm">SMS পাঠান</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="checkbox" id="email" className="accent-primary h-4 w-4" />
                                    <Label htmlFor="email" className="text-sm">ইমেইল পাঠান</Label>
                                </div>
                            </div>

                            <Button onClick={() => setSelectedCraftsman(null)} className="w-full mt-4">জমা যুক্ত করুন</Button>
                        </section>
                    </div>
                </DialogContent>
            </Dialog>



            <Sheet open={!!showCraftsmanSheet} onOpenChange={(open) => !open && setShowCraftsmanSheet(null)}>
                <SheetContent side="right" className="w-[400px] sm:w-[500px]">
                    <SheetHeader>
                        <SheetTitle className="text-lg font-semibold">
                            {showCraftsmanSheet?.name} এর বিস্তারিত
                        </SheetTitle>
                        <SheetDescription className="text-sm text-muted-foreground">
                            <FileText className="inline h-4 w-4 mr-1" />
                            Craftsman ID: {showCraftsmanSheet?.id}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="mt-6 space-y-6 text-sm">
                        {/* Personal Details */}
                        <div className="border rounded-md p-4 space-y-3 bg-muted/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Phone size={16} />
                                    <span>ফোন</span>
                                </div>
                                <span className="font-medium">{showCraftsmanSheet?.phone || 'N/A'}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin size={16} />
                                    <span>ঠিকানা</span>
                                </div>
                                <span className="font-medium">{showCraftsmanSheet?.address || 'N/A'}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Users size={16} />
                                    <span>গ্রুপ</span>
                                </div>
                                <span className="font-medium">{showCraftsmanSheet?.group || 'N/A'}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <CalendarDays size={16} />
                                    <span>তৈরি</span>
                                </div>
                                <span className="font-medium">{showCraftsmanSheet?.createdAt || 'N/A'}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <CircleDot size={16} />
                                    <span>অবস্থা</span>
                                </div>
                                <span className="font-medium">{showCraftsmanSheet?.status || 'Activated'}</span>
                            </div>
                        </div>

                        {/* Financial Summary */}
                        <div className="border rounded-md p-4 bg-background shadow-sm space-y-3">
                            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                                <BadgeDollarSign size={16} />
                                আর্থিক সারাংশ
                            </h3>

                            <div className="flex justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <FileText size={16} />
                                    <span>মোট বিল</span>
                                </div>
                                <span className="font-semibold text-foreground">
                                    {showCraftsmanSheet?.totalBill?.toLocaleString()} ৳
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <CheckCircle size={16} />
                                    <span>জমা</span>
                                </div>
                                <span className="font-semibold text-green-600">
                                    {showCraftsmanSheet?.paid?.toLocaleString()} ৳
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <XCircle size={16} />
                                    <span>বাকি</span>
                                </div>
                                <span className="font-semibold text-red-600">
                                    {showCraftsmanSheet?.due?.toLocaleString()} ৳
                                </span>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>



        </div>
    )
}

const CraftsmanListPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const totalPages = Math.ceil(craftsmanData.length / rowsPerPage)
    const currentData = craftsmanData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)

    const tg = useTranslations('global')
    const t = useTranslations('nav')

    return (
        <div className="w-full p-4 space-y-6">
            <Card className="w-full p-6 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <Input placeholder={tg('search-by', { name: 'craftsmans' })} />
                    <Select onValueChange={(val) => {
                        setRowsPerPage(Number(val))
                        setCurrentPage(1)
                    }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={tg('select-rows')} />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 30, 40, 50].map(val => (
                                <SelectItem key={val} value={val.toString()}>{val}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Link href="/users/craftsmans">
                        <Button><LuPlus />Create New</Button>
                    </Link>
                </div>

                <CraftsmanTable data={currentData} />

                <Pagination className="mt-4">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={(e) => {
                                e.preventDefault()
                                setCurrentPage(p => Math.max(p - 1, 1))
                            }} />
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
                            <PaginationNext href="#" onClick={(e) => {
                                e.preventDefault()
                                setCurrentPage(p => Math.min(p + 1, totalPages))
                            }} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Card>
        </div>
    )
}

export default CraftsmanListPage
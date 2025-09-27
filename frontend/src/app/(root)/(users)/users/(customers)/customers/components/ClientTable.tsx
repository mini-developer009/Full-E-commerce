'use client'

import {
    Table,
    TableBody,
    TableFooter,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Pencil, Trash2, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'
import { useTranslations } from 'next-intl'
import PrintWrapper from '@/components/PrintWrapper'
import PrintableHeader from '@/components/PrintableHeader'
import DynamicTable from '@/components/DynamicTable'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useEffect, useState } from 'react'
import ClientDetailsSheet from './ClientDetailsSheet'
import { toast } from 'sonner'
import {
    getAllCustomersAction,
    deleteCustomerAction,
} from '@/app/actions/customers/customerActions'
import { ClientType } from '@/types/ClientType'



export function ClientTable() {
    const t = useTranslations('ClientsPage.cleints')

    const [customers, setCustomers] = useState<ClientType[]>([])
    const [loading, setLoading] = useState(true)
    const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const itemsPerPage = 10

    const fetchCustomers = async () => {
        setLoading(true)
        try {
            const res = await getAllCustomersAction({
                page: currentPage,
                limit: itemsPerPage,
                status: statusFilter !== 'all' ? statusFilter.toUpperCase() : undefined,
                search,
            })

            if (res.success && res.data?.result) {
                const mapped: ClientType[] = res.data.result.map((c: any) => ({
                    id: c.id,
                    name: c.name || '',
                    fatherName: c.fatherName || '',
                    motherName: c.motherName || '',
                    dob: c.dateOfBirth,
                    reference: c.Ref || '',
                    StoreName: c.shopName || '',
                    previousDue: 0,
                    maxDueLimit: parseFloat(c.DueLimit) || 0,
                    email: c.email || '',
                    phoneNumber: c.phone || '',
                    address: c.address || '',
                    upzilla: c.upazilla || '',
                    zipCode: c.zipCode || '',
                    street: c.road || '',
                    isActive: c.status === 'ACTIVE',
                    fileUrl: '', // Add logic if available
                }))

                setCustomers(mapped)
                setTotalPages(res.data.meta.totalPage || 1)
            } else {
                setCustomers([])
                setTotalPages(1)
                toast.error(res.message || 'Failed to load customers')
            }
        } catch (err) {
            console.error(err)
            toast.error('Error fetching customers')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCustomers()
    }, [currentPage, statusFilter, search])

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this customer?')) return
        try {
            const res = await deleteCustomerAction(id)
            if (res.success) {
                fetchCustomers()
                toast.success('Customer deleted successfully')
            } else {
                toast.error(res.message || 'Delete failed')
            }
        } catch {
            toast.error('Something went wrong')
        }
    }

    return (
        <div className="w-full h-full flex flex-col justify-between overflow-x-auto space-y-4">
            <div className="space-y-4">
                {/* Header & Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h3 className="text-lg font-semibold">{t('title')}</h3>
                </div>

                <div className="flex items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Search by Name"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value)
                            setCurrentPage(1)
                        }}
                    />
                    <Select
                        defaultValue="all"
                        onValueChange={(val) => {
                            setStatusFilter(val as 'all' | 'active' | 'inactive')
                            setCurrentPage(1)
                        }}
                    >
                        <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Status Filter" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Activated</SelectItem>
                            <SelectItem value="inactive">Deactivated</SelectItem>
                        </SelectContent>
                    </Select>

                    <PrintWrapper printTitle="Customers Statement" preview={false}>
                        <div className="p-6">
                            <PrintableHeader
                                title="Customers Statement"
                                subtitle="Generated Report"
                                date={new Date().toLocaleDateString()}
                                Store={{
                                    name: 'Suborno Ltd',
                                    logoUrl: 'https://www.suborno.dev/favicon.ico',
                                    address: '123 Business Street, Dhaka',
                                    phone: '01234-567890',
                                    email: 'info@suborno.dev',
                                }}
                                accentColor="blue-600"
                            />
                            <DynamicTable data={customers} showActions={false} />
                        </div>
                    </PrintWrapper>
                </div>

                {/* Table */}
                <Table className="w-full min-w-[1000px]">
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Name & Phone</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>DOB</TableHead>
                            <TableHead className="text-right">Total Bill</TableHead>
                            <TableHead className="text-right">Deposit</TableHead>
                            <TableHead className="text-right">Refund</TableHead>
                            <TableHead className="text-right">Due</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center py-16">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : customers.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={10} className="text-center py-16">
                                    No customer found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            customers.map((c,i) => {
                                const maxDue = c.maxDueLimit ?? 0
                                return (
                                    <TableRow key={c.id}>
                                        <TableCell>{i+1}</TableCell>
                                        <TableCell className="flex flex-col gap-1">
                                            <div className="font-semibold">নাম: {c.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                ফোন: {c.phoneNumber}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {c.isActive ? 'Activated' : 'Deactivated'}
                                        </TableCell>
                                        <TableCell>
                                            {c.dob
                                                ? new Date(c.dob).toLocaleDateString()
                                                : 'N/A'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {(c.previousDue + maxDue).toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right">0.00</TableCell>
                                        <TableCell className="text-right">0.00</TableCell>
                                        <TableCell className="text-right">
                                            {c.previousDue.toFixed(2)}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2">
                                                <ClientDetailsSheet
                                                    client={c}
                                                    trigger={
                                                        <Button variant="ghost" size="icon">
                                                            <Eye size={18} />
                                                        </Button>
                                                    }
                                                />
                                                <Link href={`/users/customers/edit/${c.id}`}>
                                                    <Button variant="ghost" size="icon">
                                                        <Pencil size={18} />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleDelete(c.id)}
                                                >
                                                    <Trash2 size={18} />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() =>
                                    setCurrentPage((prev) => Math.max(1, prev - 1))
                                }
                            />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    href="#"
                                    isActive={i + 1 === currentPage}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    )
}

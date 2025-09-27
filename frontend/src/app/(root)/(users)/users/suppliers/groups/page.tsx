'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
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
import { Plus, Eye, Pencil, Trash2, Users, FileText, Funnel } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import PrintWrapper from '@/components/PrintWrapper'
import PrintableHeader from '@/components/PrintableHeader'
import DynamicTable from '@/components/DynamicTable'
import Link from 'next/link'

interface ClientGroup {
    id: number
    name: string
    createdAt: string
}

const initialGroups: ClientGroup[] = [
    { id: 1, name: 'Retail Customers', createdAt: '25 May 2025' },
    { id: 2, name: 'Wholesale Clients', createdAt: '25 May 2025' },
    { id: 3, name: 'VIP Members', createdAt: '25 May 2025' },
]

const ClientGroupPage = () => {
    const [groups, setGroups] = useState<ClientGroup[]>(initialGroups)
    const [isEditing, setIsEditing] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [formData, setFormData] = useState({ id: 0, name: '' })

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this group?')) {
            setGroups((prev) => prev.filter((group) => group.id !== id))
        }
    }

    const handleSubmit = () => {
        if (!formData.name.trim()) return

        if (isEditing) {
            setGroups((prev) =>
                prev.map((group) =>
                    group.id === formData.id ? { ...group, name: formData.name } : group
                )
            )
        } else {
            const newGroup: ClientGroup = {
                id: Date.now(),
                name: formData.name,
                createdAt: new Date().toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                }),
            }
            setGroups((prev) => [...prev, newGroup])
        }

        setDialogOpen(false)
        setFormData({ id: 0, name: '' })
        setIsEditing(false)
    }

    const openEditDialog = (group: ClientGroup) => {
        setFormData(group)
        setIsEditing(true)
        setDialogOpen(true)
    }



    const t = useTranslations('global')
    const tn = useTranslations('nav')

    return (
        <div className="w-full p-4 space-y-6">

            <Card className="w-full p-6 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h3 className="text-lg font-semibold"> {tn('suppliers-groups')}</h3>
                    <div className="flex gap-2 flex-wrap">
                        {/* Create Group Dialog */}
                        <Button onClick={() => setDialogOpen(true)} variant="default" className="flex items-center gap-2">
                            <Plus size={16} /> Create Group
                        </Button>

                    </div>
                </div>
                <div className='flex items-center gap-4'>
                    <Input type="text" className='' placeholder={t('search-by', { name: t('group') })} />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={t('select-rows')} />
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
                                    data={groups}
                                    showActions={false}
                                />
                            </div>
                        </div>
                    </PrintWrapper>

                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[60px]">ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {groups.map((group, index) => (
                            <TableRow key={group.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{group.name}</TableCell>
                                <TableCell>{group.createdAt}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800">
                                            <Eye size={18} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-green-600 hover:text-green-800"
                                            onClick={() => openEditDialog(group)}
                                        >
                                            <Pencil size={18} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() => handleDelete(group.id)}
                                        >
                                            <Trash2 size={18} />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4}>Total: {groups.length} Groups</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                1
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Card>

            {/* Create/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Group' : 'Add New Group'}</DialogTitle>
                        <DialogDescription>
                            {isEditing
                                ? 'Update the group name below.'
                                : 'Enter the new group name to create.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input
                            placeholder="Group Name"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        />
                        <Button onClick={handleSubmit} className="w-full">
                            {isEditing ? 'Update Group' : 'Create Group'}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ClientGroupPage

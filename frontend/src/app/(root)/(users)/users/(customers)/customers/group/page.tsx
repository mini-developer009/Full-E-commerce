'use client'

import React, { useState, useEffect } from 'react'
import {
    Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle
} from '@/components/ui/dialog'
import {
    Table, TableBody, TableCell, TableHead,
    TableHeader, TableRow, TableFooter,
} from '@/components/ui/table'
import {
    Pagination, PaginationContent, PaginationItem,
    PaginationLink, PaginationNext, PaginationPrevious,
} from '@/components/ui/pagination'
import { Plus, Pencil, Trash2, Users, FileText } from 'lucide-react'
import PrintWrapper from '@/components/PrintWrapper'
import PrintableHeader from '@/components/PrintableHeader'
import DynamicTable from '@/components/DynamicTable'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import {
    createCustomerGroupAction,
    getAllCustomerGroupsAction,
    updateCustomerGroupAction,
    deleteCustomerGroupAction
} from '@/app/actions/customers/CustomerGroupAction'  // ✅ import API actions

interface ClientGroup {
    id: string
    shopId: string
    name: string
    date: string
}

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

const ClientGroupPage = () => {
    const [groups, setGroups] = useState<ClientGroup[]>([])
    const [isEditing, setIsEditing] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [formData, setFormData] = useState({ id: '', name: '' })
    const [loading, setLoading] = useState(false)

    const t = useTranslations('global')
    const tn = useTranslations('nav')
    const tc = useTranslations('ClientsPage.cleints')

    // ✅ Fetch all groups on mount
    useEffect(() => {
        loadGroups()
    }, [])

    const loadGroups = async () => {
        const res = await getAllCustomerGroupsAction()
        if (res.success) {
            setGroups(res.data)
        }
    }

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this group?')) {
            const res = await deleteCustomerGroupAction(id)
            if (res.success) {
                setGroups(prev => prev.filter(g => g.id !== id))
            } else {
                alert(res.message)
            }
        }
    }

    const handleSubmit = async () => {
        if (!formData.name.trim()) return

        setLoading(true)

        if (isEditing) {
            const res = await updateCustomerGroupAction(formData.id, { name: formData.name })
            if (res.success && res.data) {
                setGroups(prev => prev.map(g => g.id === formData.id ? res.data : g))
            } else {
                alert(res.message)
            }
        } else {
            const fd = new FormData()
            fd.append("name", formData.name)
            fd.append("date", new Date().toISOString())
            const res = await createCustomerGroupAction(fd)
            if (res.success && res.data) {
                setGroups(prev => [...prev, res.data])
            } else {
                alert(res.message)
            }
        }

        setLoading(false)
        setDialogOpen(false)
        setFormData({ id: '', name: '' })
        setIsEditing(false)
    }

    const openEditDialog = (group: ClientGroup) => {
        setFormData({ id: group.id, name: group.name })
        setIsEditing(true)
        setDialogOpen(true)
    }

    return (
        <div className="p-4 min-h-screen space-y-6">
            {/* Navigation Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {navLinks.map((link) => (
                    <Link key={link.href} href={link.href}>
                        <Card className="w-full p-6 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer hover:border-primary flex flex-col items-center text-center rounded-2xl">
                            <div className="mb-3">{link.icon}</div>
                            <div className="font-semibold text-base">{tc(link.title)}</div>
                        </Card>
                    </Link>
                ))}
            </div>

            <Card className="w-full p-6 mx-auto rounded-2xl">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                    <h3 className="text-lg font-semibold">{tn('customer-groups')}</h3>
                    <Button onClick={() => setDialogOpen(true)} variant="default" className="flex items-center gap-2">
                        <Plus size={16} /> Create Group
                    </Button>
                </div>

                {/* Search + Export */}
                <div className='flex items-center gap-4'>
                    <Input type="text" placeholder='Search by Name' />
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Rows" />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 30, 40, 50].map((value) => (
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
                                    accentColor="blue-600"
                                />
                                <DynamicTable data={groups} showActions={false} />
                            </div>
                        </div>
                    </PrintWrapper>
                </div>

                {/* Groups Table */}
                <CardContent className="px-0 py-4 space-y-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[60px]">#</TableHead>
                                <TableHead>{t('name')}</TableHead>
                                <TableHead>{t('created-at')}</TableHead>
                                <TableHead className="text-right">{t('action')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {groups.map((group, index) => (
                                <TableRow key={group.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{group.name}</TableCell>
                                    <TableCell>{new Date(group.date).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-800"
                                                onClick={() => openEditDialog(group)}>
                                                <Pencil size={18} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800"
                                                onClick={() => handleDelete(group.id)}>
                                                <Trash2 size={18} />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan={4} className="font-semibold">
                                    {t('total', { count: groups.length })}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem><PaginationPrevious href="#" /></PaginationItem>
                            <PaginationItem><PaginationLink href="#" isActive>1</PaginationLink></PaginationItem>
                            <PaginationItem><PaginationNext href="#" /></PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </CardContent>
            </Card>

            {/* Create/Edit Dialog */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Group" : "Create Group"}</DialogTitle>
                        <DialogDescription>
                            {isEditing ? "Update group name" : "Enter new group name"}
                        </DialogDescription>
                    </DialogHeader>
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSubmit() }}
                        className="space-y-6"
                    >
                        <Input
                            autoFocus
                            placeholder="Group Name"
                            value={formData.name}
                            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                            required
                        />
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Saving..." : isEditing ? "Update Group" : "Create Group"}
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ClientGroupPage

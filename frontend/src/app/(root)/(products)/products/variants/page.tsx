'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Pencil, Plus, Tag, Trash2 } from 'lucide-react'
import {
    createVariant,
    updateVariant,
    getAllVariants,
    VariantData,
} from '@/app/actions/products/variantActions'
import { toast } from 'sonner'

const ProductVariantPage = () => {
    const [variants, setVariants] = useState<VariantData[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [newVariant, setNewVariant] = useState({ type: '', description: '' })
    const [editingVariant, setEditingVariant] = useState<VariantData | null>(null)
    const [editSheetOpen, setEditSheetOpen] = useState(false)
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const fetchVariants = async () => {
        setLoading(true)
        try {
            const res = await getAllVariants()
            if (res.success && res.data) {
                setVariants(res.data.result)
            } else {
                toast.error(res.message || 'Failed to fetch variants.')
            }
        } catch (err) {
            console.error(err)
            toast.error('Error fetching variants.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchVariants()
    }, [])

    const handleCreateVariant = async () => {
        if (!newVariant.type.trim()) {
            toast.error('Type name is required')
            return
        }
        setLoading(true)
        try {
            const res = await createVariant({
                type: newVariant.type,
                description: newVariant.description,
            })
            if (res.success && res.data) {
                setVariants(prev => [...prev, res.data!])
                toast.success('Variant created successfully!')
                setNewVariant({ type: '', description: '' })
                setIsOpen(false)
            } else {
                toast.error(res.message || 'Failed to create variant.')
            }
        } catch (err) {
            console.error(err)
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    const handleEditVariant = async () => {
        if (!editingVariant) return
        setLoading(true)
        try {
            const res = await updateVariant(editingVariant.id, {
                type: editingVariant.type,
                description: editingVariant.description,
            })
            if (res.success && res.data) {
                setVariants(prev =>
                    prev.map(v => (v.id === editingVariant.id ? res.data! : v))
                )
                toast.success('Variant updated successfully!')
                setEditingVariant(null)
                setEditSheetOpen(false)
            } else {
                toast.error(res.message || 'Failed to update variant.')
            }
        } catch (err) {
            console.error(err)
            toast.error('Something went wrong.')
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteVariant = (id: string) => {
        setVariants(prev => prev.filter(v => v.id !== id))
        toast.success('Variant deleted successfully!')
        setConfirmDeleteId(null)
    }

    const handleRowClick = (type: string) => {
        router.push(`/products/variants/${type}`)
    }

    return (
        <div className="p-4 md:p-6 space-y-6">
            <Card className="w-full p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Tag className="text-primary" />
                        <h2 className="text-xl font-semibold">Product Variant Types</h2>
                    </div>

                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button className="hover:bg-muted active:bg-muted/80">
                                <Plus className="mr-2 h-4 w-4" /> Create New
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle>Create New Variant Type</SheetTitle>
                            </SheetHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Type Name</label>
                                    <Input
                                        value={newVariant.type}
                                        onChange={e =>
                                            setNewVariant({ ...newVariant, type: e.target.value })
                                        }
                                        placeholder="Enter type name (e.g., size, color)"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium">Description</label>
                                    <Input
                                        value={newVariant.description}
                                        onChange={e =>
                                            setNewVariant({
                                                ...newVariant,
                                                description: e.target.value,
                                            })
                                        }
                                        placeholder="Short description"
                                    />
                                </div>
                                <Button
                                    className="w-full mt-4"
                                    onClick={handleCreateVariant}
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save Type'}
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="overflow-auto">
                    <Table className="w-full min-w-[500px]">
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {variants.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center text-base py-16">
                                        {loading ? 'Loading...' : 'No variants available.'}
                                    </TableCell>
                                </TableRow>
                            ) : (
                                variants.map((v, i) => (
                                    <TableRow
                                        key={v.id}
                                        className="hover:bg-muted transition"
                                    >
                                        <TableCell
                                            onClick={() => handleRowClick(v.type)}
                                            className="cursor-pointer"
                                        >
                                            {i+1}
                                        </TableCell>
                                        <TableCell
                                            onClick={() => handleRowClick(v.type)}
                                            className="cursor-pointer"
                                        >
                                            {v.type}
                                        </TableCell>
                                        <TableCell
                                            onClick={() => handleRowClick(v.type)}
                                            className="cursor-pointer"
                                        >
                                            {v.description}
                                        </TableCell>
                                        <TableCell className="flex justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => {
                                                    setEditingVariant(v)
                                                    setEditSheetOpen(true)
                                                }}
                                                className="hover:bg-muted active:bg-muted/80"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        size="icon"
                                                        variant="destructive"
                                                        onClick={() => setConfirmDeleteId(v.id)}
                                                        className="hover:bg-destructive/90 active:bg-destructive"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>
                                                            Delete Variant Type?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This will remove the variant permanently. This
                                                            cannot be undone.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel
                                                            onClick={() => setConfirmDeleteId(null)}
                                                        >
                                                            Cancel
                                                        </AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() =>
                                                                confirmDeleteId &&
                                                                handleDeleteVariant(confirmDeleteId)
                                                            }
                                                            className="bg-destructive hover:bg-destructive/90"
                                                        >
                                                            Yes, Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </Card>

            <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
                <SheetContent side="right">
                    <SheetHeader>
                        <SheetTitle>Edit Variant Type</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Type Name</label>
                            <Input
                                value={editingVariant?.type || ''}
                                onChange={e =>
                                    setEditingVariant(prev =>
                                        prev ? { ...prev, type: e.target.value } : null
                                    )
                                }
                                placeholder="Enter type name (e.g., size, color)"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Description</label>
                            <Input
                                value={editingVariant?.description || ''}
                                onChange={e =>
                                    setEditingVariant(prev =>
                                        prev ? { ...prev, description: e.target.value } : null
                                    )
                                }
                                placeholder="Short description"
                            />
                        </div>
                        <Button
                            className="w-full mt-4"
                            onClick={handleEditVariant}
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Type'}
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}

export default ProductVariantPage

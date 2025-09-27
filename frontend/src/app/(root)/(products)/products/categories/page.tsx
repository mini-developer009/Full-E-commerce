'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Plus, Tag, Loader2, Pencil, Trash } from 'lucide-react'
import { toast } from 'sonner'
import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/app/actions/products/categoryActions'

interface CategoryData {
  id: string
  name: string
  description: string
  shopId: string
}

const ProductCategoryPage = () => {
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [formCategory, setFormCategory] = useState({ name: '', description: '' })
  const [editingCategory, setEditingCategory] = useState<CategoryData | null>(null)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  // fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      setFetching(true)
      const res = await getAllCategories()
      if (res.success && res.data) {
        setCategories(res.data.result)
      } else {
        toast.error(res.message || 'Failed to fetch categories')
      }
      setFetching(false)
    }
    fetchCategories()
  }, [])

  const handleSaveCategory = async () => {
    if (!formCategory.name.trim()) {
      toast.error('Category name is required')
      return
    }

    setLoading(true)

    try {
      if (editingCategory) {
        // update category
        const res = await updateCategory(editingCategory.id, formCategory)
        if (res.success && res.data) {
          toast.success('Category updated successfully')
          setCategories((prev) =>
            prev.map((cat) => (cat.id === editingCategory.id ? (res.data as CategoryData) : cat))
          )
        } else {
          toast.error(res.message || 'Failed to update category')
        }
      } else {
        // create category
        const res = await createCategory(formCategory)
        if (res.success && res.data) {
          toast.success('Category created successfully')
          setCategories((prev) => [...prev, res.data as CategoryData])
        } else {
          toast.error(res.message || 'Failed to create category')
        }
      }
    } finally {
      setLoading(false)
      setFormCategory({ name: '', description: '' })
      setEditingCategory(null)
      setIsOpen(false)
    }
  }

  const handleEdit = (category: CategoryData) => {
    setEditingCategory(category)
    setFormCategory({ name: category.name, description: category.description })
    setIsOpen(true)
  }

  const handleDelete = async (id: string) => {
    const confirm = window.confirm('Are you sure you want to delete this category?')
    if (!confirm) return

    const res = await deleteCategory(id)
    if (res.success) {
      toast.success('Category deleted successfully')
      setCategories((prev) => prev.filter((cat) => cat.id !== id))
    } else {
      toast.error(res.message || 'Failed to delete category')
    }
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="w-full p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <div className="flex items-center gap-3">
              <Tag className="text-primary" />
              <h2 className="text-xl font-semibold">Product Categories</h2>
            </div>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Create New
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>
                    {editingCategory ? 'Edit Category' : 'Create New Category'}
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Category Name</label>
                    <Input
                      value={formCategory.name}
                      onChange={(e) =>
                        setFormCategory({ ...formCategory, name: e.target.value })
                      }
                      placeholder="Enter category name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Description</label>
                    <Input
                      value={formCategory.description}
                      onChange={(e) =>
                        setFormCategory({ ...formCategory, description: e.target.value })
                      }
                      placeholder="Short description"
                    />
                  </div>
                  <Button className="w-full mt-4" onClick={handleSaveCategory} disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </span>
                    ) : editingCategory ? (
                      'Update Category'
                    ) : (
                      'Save Category'
                    )}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="overflow-auto">
            <Table className="w-full min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.length > 0 ? (
                  categories.map((category, i) => (
                    <TableRow key={category.id} className="hover:bg-muted transition">
                      <TableCell>{i+1}</TableCell>
                      <TableCell>{category.name}</TableCell>
                      <TableCell>{category.description}</TableCell>
                      <TableCell className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          <Pencil className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
                        >
                          <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-base py-16">
                      {fetching ? 'Loading...' : 'No category available.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default ProductCategoryPage

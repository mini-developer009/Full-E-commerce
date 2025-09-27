'use client'

import React, { useState } from 'react'
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent
} from '@/components/ui/tabs'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis
} from "@/components/ui/pagination"
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
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from '@/components/ui/sheet'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    PackageSearch,
    Plus,
    Trash2,
    Edit,
    ArchiveRestore,
    Box,
    Search,
    ChevronLeft,
    ChevronRight,
    MoreVertical,
    Filter,
    X
} from 'lucide-react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'

interface Product {
    id: number
    name: string
    price: number
    category: string
    stock: number
    imageUrl: string
    deleted?: boolean
}

const initialProducts: Product[] = [
    {
        id: 1,
        name: 'Diamond Ring',
        price: 5000,
        category: 'Jewelry',
        stock: 12,
        imageUrl: 'https://imgs.search.brave.com/mAC4miiYT7ThIP1-WsLWfG7wxRQ30hEd4BN-cYTClG8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/aGFuZC1kcmF3bi1k/aWFtb25kLXJpbmct/Y2FydG9vbi1pbGx1/c3RyYXRpb25fMjMt/MjE1MDkyNDI2MS5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw',
    },
    {
        id: 2,
        name: 'Premium Cotton T-shirt',
        price: 29.99,
        category: 'Clothing',
        stock: 0,
        imageUrl: 'https://imgs.search.brave.com/-dtN2p0EGYL3KhSlUBCJe_8Om8C21FcfxWlxRm8Mo4c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tb2NrdXAtdC1z/aGlydC15ZWxsb3ct/Z3JheS1ibGFjay13/aGl0ZS1tZW5zLWNs/b3RoaW5nLWZvbGRz/LXdoaXRlLWJhY2tn/cm91bmRfMzE0MTgw/LTEwMjkuanBnP3Nl/bXQ9YWlzX2l0ZW1z/X2Jvb3N0ZWQmdz03/NDA',
    },
    {
        id: 3,
        name: 'Smartphone Pro Max',
        price: 1199.99,
        category: 'Electronics',
        stock: 8,
        imageUrl: 'https://imgs.search.brave.com/JFYqaoSJuzBv94aamYrKgEKYwwss0pZ36pmy6tzzUcE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1wc2Qv/cGhvbmUtMTQtcHJv/LW1heC1tb2NrdXBf/Njc0MjI5LTE5MS5q/cGc_c2VtdD1haXNf/aHlicmlk',
    },
    {
        id: 4,
        name: 'Wireless Noise-Cancelling Headphones',
        price: 349.99,
        category: 'Electronics',
        stock: 25,
        imageUrl: 'https://imgs.search.brave.com/BZGbPNzMlG5pcDVVDxQKDEjv90K4oJ3Sycss0bJNsxg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/cmVhbGlzdGljLXNl/dC1kaWZmZXJlbnQt/d2lyZWQtd2lyZWxl/c3MtYXVkaW8tZXF1/aXBtZW50LW11c2lj/LWxpc3RlbmluZy1z/bWFydHBob25lcy1n/YW1pbmctaXNvbGF0/ZWQtdmVjdG9yLWls/bHVzdHJhdGlvbl8x/Mjg0LTgxNTMyLmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDA',
    },
    {
        id: 5,
        name: 'Leather Notebook',
        price: 24.99,
        category: 'Stationery',
        stock: 200,
        imageUrl: 'https://imgs.search.brave.com/mAC4miiYT7ThIP1-WsLWfG7wxRQ30hEd4BN-cYTClG8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/aGFuZC1kcmF3bi1k/aWFtb25kLXJpbmct/Y2FydG9vbi1pbGx1/c3RyYXRpb25fMjMt/MjE1MDkyNDI2MS5q/cGc_c2VtdD1haXNf/aHlicmlkJnc9NzQw',
    },
    {
        id: 6,
        name: 'Stainless Steel Water Bottle',
        price: 39.99,
        category: 'Accessories',
        stock: 45,
        imageUrl: 'https://imgs.search.brave.com/-dtN2p0EGYL3KhSlUBCJe_8Om8C21FcfxWlxRm8Mo4c/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9tb2NrdXAtdC1z/aGlydC15ZWxsb3ct/Z3JheS1ibGFjay13/aGl0ZS1tZW5zLWNs/b3RoaW5nLWZvbGRz/LXdoaXRlLWJhY2tn/cm91bmRfMzE0MTgw/LTEwMjkuanBnP3Nl/bXQ9YWlzX2l0ZW1z/X2Jvb3N0ZWQmdz03/NDA',
    },
    {
        id: 7,
        name: 'Organic Cotton Towel Set',
        price: 49.99,
        category: 'Home',
        stock: 18,
        imageUrl: 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa?w=100&q=80',
    },
]

const categories = Array.from(new Set(initialProducts.map(p => p.category)))

export default function ProductListPage() {
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [isOpen, setIsOpen] = useState(false)
    const [editingProduct, setEditingProduct] = useState<Product | null>(null)
    const [showTrash, setShowTrash] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string>('')
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
    const [stockStatus, setStockStatus] = useState<string>('')

    const [form, setForm] = useState({
        name: '',
        price: 0,
        category: '',
        stock: 0,
        imageUrl: '',
    })

    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 8

    const filteredProducts = products.filter(p => {
        const matchTrash = showTrash ? p.deleted : !p.deleted
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase())
        const matchCategory = selectedCategory ? p.category === selectedCategory : true
        const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
        const matchStock = stockStatus === 'in-stock' ? p.stock > 0 :
            stockStatus === 'out-of-stock' ? p.stock === 0 : true

        return matchTrash && matchSearch && matchCategory && matchPrice && matchStock
    })

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
    )

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1)
    }

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1)
    }

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleOpenCreate = () => {
        setEditingProduct(null)
        setForm({ name: '', price: 0, category: '', stock: 0, imageUrl: '' })
        setIsOpen(true)
    }

    const handleEdit = (product: Product) => {
        setEditingProduct(product)
        setForm(product)
        setIsOpen(true)
    }

    const handleDelete = (productId: number) => {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, deleted: true } : p))
        toast.success('Product moved to trash')
    }

    const handleRestore = (productId: number) => {
        setProducts(prev => prev.map(p => p.id === productId ? { ...p, deleted: false } : p))
        toast.success('Product restored')
    }

    const handlePermanentDelete = (productId: number) => {
        setProducts(prev => prev.filter(p => p.id !== productId))
        toast.success('Product permanently deleted')
    }

    const handleSubmit = () => {
        if (editingProduct) {
            setProducts(prev =>
                prev.map(p => (p.id === editingProduct.id ? { ...editingProduct, ...form } : p))
            )
            toast.success('Product updated successfully')
        } else {
            const newProduct = {
                id: Math.max(...products.map(p => p.id)) + 1,
                ...form,
            }
            setProducts(prev => [...prev, newProduct])
            toast.success('Product created successfully')
        }
        setIsOpen(false)
    }

    const getBadgeVariant = (product: Product) => {
        if (product.deleted) return 'destructive'
        if (product.stock === 0) return 'secondary'
        if (product.stock < 10) return 'secondary'
        return 'default'
    }

    const getBadgeText = (product: Product) => {
        if (product.deleted) return 'Deleted'
        if (product.stock === 0) return 'Out of Stock'
        if (product.stock < 10) return 'Low Stock'
        return 'In Stock'
    }

    const resetFilters = () => {
        setSearchQuery('')
        setSelectedCategory('')
        setPriceRange([0, 10000])
        setStockStatus('')
        setCurrentPage(1)
    }

    const renderPaginationItems = () => {
        const items = []
        const maxVisiblePages = 5

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <Button
                            variant={i === currentPage ? 'default' : 'ghost'}
                            onClick={() => handlePageChange(i)}
                            className="h-8 w-8 p-0"
                        >
                            {i}
                        </Button>
                    </PaginationItem>
                )
            }
        } else {
            let startPage = Math.max(1, currentPage - 2)
            let endPage = Math.min(totalPages, currentPage + 2)

            if (currentPage <= 3) {
                endPage = maxVisiblePages
            } else if (currentPage >= totalPages - 2) {
                startPage = totalPages - maxVisiblePages + 1
            }

            if (startPage > 1) {
                items.push(
                    <PaginationItem key="ellipsis-start">
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }

            for (let i = startPage; i <= endPage; i++) {
                items.push(
                    <PaginationItem key={i}>
                        <Button
                            variant={i === currentPage ? 'default' : 'ghost'}
                            onClick={() => handlePageChange(i)}
                            className="h-8 w-8 p-0"
                        >
                            {i}
                        </Button>
                    </PaginationItem>
                )
            }

            if (endPage < totalPages) {
                items.push(
                    <PaginationItem key="ellipsis-end">
                        <PaginationEllipsis />
                    </PaginationItem>
                )
            }
        }

        return items
    }

    return (
        <div className="p-4 md:p-6 space-y-6 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
                <div className="flex items-center gap-3">
                    <PackageSearch className="text-primary h-6 w-6" />
                    <h1 className="text-2xl font-bold">Product Inventory</h1>
                    <Badge variant="secondary" className="hidden sm:flex">
                        {products.filter(p => !p.deleted).length} Active Products
                    </Badge>
                    {showTrash && (
                        <Badge variant="destructive" className="hidden sm:flex">
                            {products.filter(p => p.deleted).length} In Trash
                        </Badge>
                    )}
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <Button
                        variant={showTrash ? "default" : "outline"}
                        onClick={() => {
                            setShowTrash(prev => !prev)
                            setCurrentPage(1)
                        }}
                        size="sm"
                        className="gap-2"
                    >
                        {showTrash ? (
                            <>
                                <ArchiveRestore className="h-4 w-4" />
                                View Active
                            </>
                        ) : (
                            <>
                                <Trash2 className="h-4 w-4" />
                                View Trash
                            </>
                        )}
                    </Button>
                    <Button
                        onClick={handleOpenCreate}
                        size="sm"
                        className="gap-2"
                    >
                        <Plus className="h-4 w-4" />
                        Add Product
                    </Button>
                </div>
            </div>

            <Card className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search products by name or category..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                setCurrentPage(1)
                            }}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Filter className="h-4 w-4" />
                                    Filters
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <h4 className="font-medium leading-none">Filters</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Narrow down your product list
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Category</Label>
                                            <Select
                                                value={selectedCategory}
                                                onValueChange={(value) => {
                                                    setSelectedCategory(value === "all" ? "" : value);
                                                    setCurrentPage(1);
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="All categories" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="all">All categories</SelectItem>
                                                    {categories.map(category => (
                                                        <SelectItem key={category} value={category}>
                                                            {category}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Price Range</Label>
                                            <div className="flex items-center gap-2">
                                                <Input
                                                    type="number"
                                                    placeholder="Min"
                                                    value={priceRange[0]}
                                                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                                />
                                                <span className="text-muted-foreground">to</span>
                                                <Input
                                                    type="number"
                                                    placeholder="Max"
                                                    value={priceRange[1]}
                                                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label>Stock Status</Label>
                                            <Select
                                                value={stockStatus}
                                                onValueChange={(value) => {
                                                    setStockStatus(value === "any" ? "" : value);
                                                    setCurrentPage(1);
                                                }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Any status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="any">Any status</SelectItem>
                                                    <SelectItem value="in-stock">In Stock</SelectItem>
                                                    <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="w-full gap-2"
                                            onClick={resetFilters}
                                        >
                                            <X className="h-4 w-4" />
                                            Reset Filters
                                        </Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>

                        {(searchQuery || selectedCategory || stockStatus || priceRange[0] > 0 || priceRange[1] < 10000) && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="gap-2"
                                onClick={resetFilters}
                            >
                                <X className="h-4 w-4" />
                                Clear
                            </Button>
                        )}
                    </div>
                </div>
            </Card>

            <Tabs defaultValue="list" className="w-full">
                <TabsList className="w-full sm:w-auto">
                    <TabsTrigger value="list" className="gap-2">
                        <Box className="h-4 w-4" /> List View
                    </TabsTrigger>
                    <TabsTrigger value="grid" className="gap-2">
                        <Box className="h-4 w-4" /> Grid View
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="list">
                    <Card className="overflow-hidden">
                        <div className="overflow-auto">
                            <Table className="min-w-[1000px]">
                                <TableHeader className="bg-muted/50">
                                    <TableRow>
                                        <TableHead className="w-[100px]">Image</TableHead>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead className="text-right">Price</TableHead>
                                        <TableHead className="text-center">Stock</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedProducts.length > 0 ? (
                                        paginatedProducts.map((product) => (
                                            <TableRow key={product.id} className={cn(product.deleted && 'opacity-70')}>
                                                <TableCell>
                                                    <div className="w-16 h-16 rounded-md overflow-hidden border">
                                                        <img
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-medium">{product.name}</div>
                                                    <div className="text-sm text-muted-foreground">ID: {product.id}</div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="outline" className="text-xs">
                                                        {product.category}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right font-medium">
                                                    ${product.price.toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    {product.stock}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={getBadgeVariant(product)}>
                                                        {getBadgeText(product)}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                                <MoreVertical className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            {!product.deleted ? (
                                                                <>
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleEdit(product)}
                                                                        className="gap-2"
                                                                    >
                                                                        <Edit className="h-4 w-4" /> Edit
                                                                    </DropdownMenuItem>
                                                                    <AlertDialog>
                                                                        <AlertDialogTrigger asChild>
                                                                            <DropdownMenuItem
                                                                                onSelect={(e) => e.preventDefault()}
                                                                                className="gap-2 text-destructive"
                                                                            >
                                                                                <Trash2 className="h-4 w-4" /> Delete
                                                                            </DropdownMenuItem>
                                                                        </AlertDialogTrigger>
                                                                        <AlertDialogContent>
                                                                            <AlertDialogHeader>
                                                                                <AlertDialogTitle>Move to trash?</AlertDialogTitle>
                                                                                <AlertDialogDescription>
                                                                                    This will move "{product.name}" to trash. You can restore it later.
                                                                                </AlertDialogDescription>
                                                                            </AlertDialogHeader>
                                                                            <AlertDialogFooter>
                                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                                <AlertDialogAction
                                                                                    onClick={() => handleDelete(product.id)}
                                                                                    className="bg-destructive hover:bg-destructive/90"
                                                                                >
                                                                                    Move to Trash
                                                                                </AlertDialogAction>
                                                                            </AlertDialogFooter>
                                                                        </AlertDialogContent>
                                                                    </AlertDialog>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <DropdownMenuItem
                                                                        onClick={() => handleRestore(product.id)}
                                                                        className="gap-2"
                                                                    >
                                                                        <ArchiveRestore className="h-4 w-4" /> Restore
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <AlertDialog>
                                                                        <AlertDialogTrigger asChild>
                                                                            <DropdownMenuItem
                                                                                onSelect={(e) => e.preventDefault()}
                                                                                className="gap-2 text-destructive"
                                                                            >
                                                                                <Trash2 className="h-4 w-4" /> Delete Permanently
                                                                            </DropdownMenuItem>
                                                                        </AlertDialogTrigger>
                                                                        <AlertDialogContent>
                                                                            <AlertDialogHeader>
                                                                                <AlertDialogTitle>Delete permanently?</AlertDialogTitle>
                                                                                <AlertDialogDescription>
                                                                                    This will permanently delete "{product.name}" and cannot be undone.
                                                                                </AlertDialogDescription>
                                                                            </AlertDialogHeader>
                                                                            <AlertDialogFooter>
                                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                                <AlertDialogAction
                                                                                    onClick={() => handlePermanentDelete(product.id)}
                                                                                    className="bg-destructive hover:bg-destructive/90"
                                                                                >
                                                                                    Delete Permanently
                                                                                </AlertDialogAction>
                                                                            </AlertDialogFooter>
                                                                        </AlertDialogContent>
                                                                    </AlertDialog>
                                                                </>
                                                            )}
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="h-24 text-center">
                                                {searchQuery || selectedCategory || stockStatus || priceRange[0] > 0 || priceRange[1] < 10000 ? (
                                                    <div className="flex flex-col items-center justify-center gap-2 py-8">
                                                        <PackageSearch className="h-8 w-8 text-muted-foreground" />
                                                        <p className="text-muted-foreground">No products match your filters</p>
                                                        <Button
                                                            variant="outline"
                                                            onClick={resetFilters}
                                                        >
                                                            Clear filters
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center gap-2 py-8">
                                                        <PackageSearch className="h-8 w-8 text-muted-foreground" />
                                                        <p className="text-muted-foreground">
                                                            {showTrash ? 'No products in trash' : 'No products available'}
                                                        </p>
                                                        {!showTrash && (
                                                            <Button onClick={handleOpenCreate}>
                                                                <Plus className="mr-2 h-4 w-4" /> Add Product
                                                            </Button>
                                                        )}
                                                    </div>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {paginatedProducts.length > 0 && (
                            <div className="border-t p-4">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {(currentPage - 1) * productsPerPage + 1} -{' '}
                                        {Math.min(currentPage * productsPerPage, filteredProducts.length)} of{' '}
                                        {filteredProducts.length} products
                                    </div>
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handlePrevPage}
                                                    disabled={currentPage === 1}
                                                    className="gap-1"
                                                >
                                                    <ChevronLeft className="h-4 w-4" />
                                                    Previous
                                                </Button>
                                            </PaginationItem>
                                            {renderPaginationItems()}
                                            <PaginationItem>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handleNextPage}
                                                    disabled={currentPage === totalPages || totalPages === 0}
                                                    className="gap-1"
                                                >
                                                    Next
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </div>
                        )}
                    </Card>
                </TabsContent>

                <TabsContent value="grid">
                    {paginatedProducts.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {paginatedProducts.map(product => (
                                    <Card
                                        key={product.id}
                                        className={cn(
                                            "overflow-hidden hover:shadow-md transition-shadow",
                                            product.deleted && "border-destructive/30 opacity-80"
                                        )}
                                    >
                                        <div className="relative aspect-square bg-muted">
                                            <img
                                                src={product.imageUrl}
                                                alt={product.name}
                                                className="w-full h-full object-cover"
                                            />
                                            {product.deleted && (
                                                <div className="absolute inset-0 bg-destructive/10 flex items-center justify-center">
                                                    <Trash2 className="h-8 w-8 text-destructive" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-4 space-y-2">
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-medium line-clamp-2">{product.name}</h3>
                                                <Badge variant="outline" className="shrink-0">
                                                    ${product.price.toFixed(2)}
                                                </Badge>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <Badge variant="secondary" className="text-xs">
                                                    {product.category}
                                                </Badge>
                                                <div className="text-sm text-muted-foreground">
                                                    {product.stock} in stock
                                                </div>
                                            </div>
                                            <div className="pt-2">
                                                {!product.deleted ? (
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1 gap-2"
                                                            onClick={() => handleEdit(product)}
                                                        >
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    className="gap-2"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Move to trash?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will move "{product.name}" to trash. You can restore it later.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(product.id)}
                                                                        className="bg-destructive hover:bg-destructive/90"
                                                                    >
                                                                        Move to Trash
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                ) : (
                                                    <div className="flex gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className="flex-1 gap-2"
                                                            onClick={() => handleRestore(product.id)}
                                                        >
                                                            <ArchiveRestore className="h-4 w-4" /> Restore
                                                        </Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="sm"
                                                                    className="gap-2"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Delete permanently?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        This will permanently delete "{product.name}" and cannot be undone.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handlePermanentDelete(product.id)}
                                                                        className="bg-destructive hover:bg-destructive/90"
                                                                    >
                                                                        Delete Permanently
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            <div className="mt-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                    <div className="text-sm text-muted-foreground">
                                        Showing {(currentPage - 1) * productsPerPage + 1} -{' '}
                                        {Math.min(currentPage * productsPerPage, filteredProducts.length)} of{' '}
                                        {filteredProducts.length} products
                                    </div>
                                    <Pagination>
                                        <PaginationContent>
                                            <PaginationItem>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handlePrevPage}
                                                    disabled={currentPage === 1}
                                                    className="gap-1"
                                                >
                                                    <ChevronLeft className="h-4 w-4" />
                                                    Previous
                                                </Button>
                                            </PaginationItem>
                                            {renderPaginationItems()}
                                            <PaginationItem>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={handleNextPage}
                                                    disabled={currentPage === totalPages || totalPages === 0}
                                                    className="gap-1"
                                                >
                                                    Next
                                                    <ChevronRight className="h-4 w-4" />
                                                </Button>
                                            </PaginationItem>
                                        </PaginationContent>
                                    </Pagination>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Card className="p-8 text-center">
                            <div className="flex flex-col items-center justify-center gap-4">
                                <PackageSearch className="h-12 w-12 text-muted-foreground" />
                                <h3 className="text-lg font-medium">
                                    {searchQuery || selectedCategory || stockStatus || priceRange[0] > 0 || priceRange[1] < 10000
                                        ? 'No matching products found'
                                        : showTrash
                                            ? 'No products in trash'
                                            : 'No products available'}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {searchQuery || selectedCategory || stockStatus || priceRange[0] > 0 || priceRange[1] < 10000
                                        ? 'Try adjusting your search or filters to find what you\'re looking for.'
                                        : showTrash
                                            ? 'Products you delete will appear here'
                                            : 'Get started by adding a new product'}
                                </p>
                                <Button
                                    onClick={searchQuery || selectedCategory || stockStatus || priceRange[0] > 0 || priceRange[1] < 10000
                                        ? resetFilters
                                        : handleOpenCreate}
                                    className="mt-2"
                                >
                                    {searchQuery || selectedCategory || stockStatus || priceRange[0] > 0 || priceRange[1] < 10000
                                        ? 'Clear filters'
                                        : 'Add Product'}
                                </Button>
                            </div>
                        </Card>
                    )}
                </TabsContent>
            </Tabs>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetContent side="right" className="w-full sm:max-w-lg">
                    <SheetHeader>
                        <SheetTitle>{editingProduct ? 'Edit Product' : 'Create New Product'}</SheetTitle>
                        <SheetDescription>
                            {editingProduct
                                ? `Update the details for ${editingProduct.name}`
                                : 'Fill in the details for your new product'}
                        </SheetDescription>
                    </SheetHeader>

                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Product Name *</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Premium Leather Wallet"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price">Price *</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                                    <Input
                                        id="price"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="0.00"
                                        className="pl-8"
                                        value={form.price}
                                        onChange={e => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="stock">Stock Quantity *</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={form.stock}
                                    onChange={e => setForm({ ...form, stock: parseInt(e.target.value) || 0 })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category *</Label>
                            <Input
                                id="category"
                                placeholder="e.g. Electronics, Clothing"
                                value={form.category}
                                onChange={e => setForm({ ...form, category: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="imageUrl">Image URL *</Label>
                            <Input
                                id="imageUrl"
                                placeholder="https://example.com/image.jpg"
                                value={form.imageUrl}
                                onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                            />
                            {form.imageUrl && (
                                <div className="mt-2 w-24 h-24 rounded-md border overflow-hidden">
                                    <img
                                        src={form.imageUrl}
                                        alt="Product preview"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100'
                                        }}
                                    />
                                </div>
                            )}
                        </div>

                        <Button
                            onClick={handleSubmit}
                            className="w-full mt-6"
                        >
                            {editingProduct ? 'Update Product' : 'Create Product'}
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
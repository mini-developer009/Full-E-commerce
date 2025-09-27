"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { PackageSearch, Search } from "lucide-react";
import ManageStockDialog from "@/components/ManageStockDialog";

interface Product {
  id: number;
  name: string;
  category: string;
  stock: number;
  price: number;
  imageUrl?: string;
}

interface StockChangeLog {
  productId: number;
  oldStock: number;
  newStock: number;
  timestamp: Date;
  changedBy: string;
}

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Organic Apples",
    category: "Produce",
    stock: 10,
    price: 2.99,
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
  },
  {
    id: 2,
    name: "Brown Rice",
    category: "Grains",
    stock: 0,
    price: 4.49,
    imageUrl: "https://images.unsplash.com/photo-1519735777090-ec97162dc266",
  },
  {
    id: 3,
    name: "Extra Virgin Olive Oil",
    category: "Oils",
    stock: 5,
    price: 8.99,
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
  {
    id: 4,
    name: "Free Range Eggs",
    category: "Dairy",
    stock: 24,
    price: 3.99,
    imageUrl: "https://imgs.search.brave.com/QuTJIZ61DlSXDHN3IQUQd63mXJ8GLFGimmqQt9samf0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kMmo2/ZGJxMGV1eDBiZy5j/bG91ZGZyb250Lm5l/dC9pbWFnZXMvMTQ3/NDQ5LzQxMjU3NzM5/ODcuanBn",
  },
  {
    id: 5,
    name: "Almond Milk",
    category: "Beverages",
    stock: 8,
    price: 3.49,
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
  },
  {
    id: 6,
    name: "Whole Grain Bread",
    category: "Bakery",
    stock: 0,
    price: 3.99,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
  },
];

export default function StockManagementPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [logs, setLogs] = useState<StockChangeLog[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockStatusFilter, setStockStatusFilter] = useState("all");

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const openDialog = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleStockSave = (productId: number, newStock: number) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    if (newStock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    const updatedProduct = { ...product, stock: newStock };

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? updatedProduct : p))
    );

    setLogs((prev) => [
      {
        productId,
        oldStock: product.stock,
        newStock,
        timestamp: new Date(),
        changedBy: "Admin User",
      },
      ...prev,
    ]);

    toast.success(`Stock updated for "${product.name}"`);
    setDialogOpen(false);
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all"
      ? true
      : product.category === categoryFilter;
    const matchesStockStatus = stockStatusFilter === "all"
      ? true
      : stockStatusFilter === "in-stock"
        ? product.stock > 0
        : product.stock === 0;

    return matchesSearch && matchesCategory && matchesStockStatus;
  });

  const getStockBadgeVariant = (stock: number) => {
    if (stock === 0) return "destructive";
    if (stock < 5) return "secondary";
    return "default";
  };

  const getStockBadgeText = (stock: number) => {
    if (stock === 0) return "Out of Stock";
    if (stock < 5) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="p-4 md:p-6 space-y-6 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PackageSearch className="text-primary h-6 w-6" />
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <Badge variant="secondary" className="hidden sm:flex">
            {products.length} Products
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={stockStatusFilter}
              onValueChange={setStockStatusFilter}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell className="w-[100px]">Image</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>Status</TableCell>
                <TableCell className="text-right">Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{product.category}</Badge>
                    </TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant={getStockBadgeVariant(product.stock)}
                        className={product.stock < 5 && product.stock > 0 ? "bg-amber-500 hover:bg-amber-600" : ""}
                      >
                        {getStockBadgeText(product.stock)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDialog(product)}
                      >
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No products found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stock Change Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Change History</CardTitle>
        </CardHeader>
        <CardContent>
          {logs.length > 0 ? (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Change</TableCell>
                    <TableCell>Changed By</TableCell>
                    <TableCell className="text-right">Time</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.map((log, idx) => {
                    const product = products.find((p) => p.id === log.productId);
                    const stockChange = log.newStock - log.oldStock;
                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">
                          {product?.name}
                        </TableCell>
                        <TableCell>
                          <span
                            className={
                              stockChange > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {stockChange > 0 ? "+" : ""}
                            {stockChange}
                          </span>{" "}
                          ({log.oldStock} → {log.newStock})
                        </TableCell>
                        <TableCell>{log.changedBy}</TableCell>
                        <TableCell className="text-right">
                          {log.timestamp.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
              <PackageSearch className="h-8 w-8 mb-2" />
              <p>No stock changes recorded yet</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Manage Stock Dialog */}
      {selectedProduct && (
        <ManageStockDialog
          product={selectedProduct}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          onSave={handleStockSave}
        />
      )}
    </div>
  );
}
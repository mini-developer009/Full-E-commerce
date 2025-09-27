import { useState, useMemo } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ManageStockDialog from "@/components/ManageStockDialog";

interface ProductItem {
  id: number;
  name: string;
  price: number;
  unit: string;
  weight: string;
  description?: string;
  imageUrl?: string;
  stock: number;
}

const productList: ProductItem[] = [
  {
    id: 1,
    name: "Organic Apples",
    price: 120,
    unit: "kg",
    weight: "1kg",
    description: "Fresh and juicy organic apples.",
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=100&q=80",
    stock: 10,
  },
  {
    id: 2,
    name: "Brown Rice",
    price: 85,
    unit: "kg",
    weight: "2kg",
    description: "Whole grain brown rice, healthy choice.",
    imageUrl: "https://static.vecteezy.com/system/resources/previews/011/372/887/large_2x/uncooked-unpolished-brown-rice-close-up-photo.jpg",
    stock: 0,
  },
  {
    id: 3,
    name: "Olive Oil",
    price: 300,
    unit: "liter",
    weight: "750ml",
    description: "Extra virgin olive oil from Italy.",
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=100&q=80",
    stock: 5,
  },
  {
    id: 4,
    name: "Whole Wheat Bread",
    price: 60,
    unit: "piece",
    weight: "400g",
    description: "Healthy whole wheat bread loaf.",
    imageUrl: "https://sallysbakingaddiction.com/wp-content/uploads/2024/01/whole-wheat-sandwich-bread-2.jpg",
    stock: 12,
  },
  {
    id: 5,
    name: "Fresh Milk",
    price: 55,
    unit: "liter",
    weight: "1L",
    description: "Pasteurized full cream milk.",
    imageUrl: "https://images.fineartamerica.com/images-medium-large-5/bottle-of-fresh-milk-cc-studioscience-photo-library.jpg",
    stock: 20,
  },
  {
    id: 6,
    name: "Bananas",
    price: 40,
    unit: "dozen",
    weight: "1.2kg",
    description: "Sweet ripe bananas, naturally grown.",
    imageUrl: "https://images.cdn.shop.foodland.com/detail/4011.jpg",
    stock: 15,
  },
  {
    id: 7,
    name: "Free-range Eggs",
    price: 90,
    unit: "dozen",
    weight: "12 eggs",
    description: "Farm fresh, organic free-range eggs.",
    imageUrl: "https://d2lnr5mha7bycj.cloudfront.net/product-image/file/large_1f4608b0-6c72-4262-870e-a68170aedb0e.png",
    stock: 8,
  },
  {
    id: 8,
    name: "Potatoes",
    price: 35,
    unit: "kg",
    weight: "2kg",
    description: "Freshly harvested brown potatoes.",
    imageUrl: "https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&w=100&q=80",
    stock: 25,
  },
  {
    id: 9,
    name: "Tomatoes",
    price: 50,
    unit: "kg",
    weight: "1kg",
    description: "Juicy red tomatoes for salads and cooking.",
    imageUrl: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=100&q=80",
    stock: 30,
  },
  {
    id: 10,
    name: "Green Tea",
    price: 150,
    unit: "box",
    weight: "100g",
    description: "Organic green tea rich in antioxidants.",
    imageUrl: "https://www.tastingtable.com/img/gallery/tips-and-tricks-for-sencha/intro-1727885685.jpg",
    stock: 18,
  }
];

interface ProductSelectSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectProduct: (product: ProductItem) => void;
  onManageStock: (product: ProductItem) => void;
}

export default function ProductSelectSheet({
  isOpen,
  onOpenChange,
  onSelectProduct,
  onManageStock,
}: ProductSelectSheetProps) {
  const [filterText, setFilterText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return productList.filter((product) =>
      product.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [filterText, productList]);

  const handleProductSelect = (product: ProductItem) => {
    if (product.stock > 0) {
      onSelectProduct(product);
      onOpenChange(false);
    }
  };

  const handleStockSave = (productId: number, newStock: number) => {
    const product = productList.find((p) => p.id === productId);
    if (!product) return;

    const updatedProduct = { ...product, stock: newStock };
    onManageStock(updatedProduct);
    toast.success(`Stock updated for "${updatedProduct.name}"`);

    setDialogOpen(false);
    setSelectedProduct(null);
  };

  const openStockDialog = (product: ProductItem) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <SheetContent className="p-6 min-w-[50%]">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-semibold">Select a Product</SheetTitle>
            <SheetDescription className="text-muted-foreground">
              Search and select a product from the list below.
            </SheetDescription>
          </SheetHeader>

          <Input
            placeholder="Search products..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className="mb-6"
            autoFocus
          />

          <ScrollArea className="h-[80vh] w-full rounded-md">
            {filteredProducts.length === 0 ? (
              <p className="text-center text-muted-foreground py-16 text-lg font-medium">
                No products found.
              </p>
            ) : (
              <div className="space-y-4 px-2 sm:px-4">
                {filteredProducts.map((product) => {
                  const isInStock = product.stock > 0;
                  return (
                    <div
                      key={product.id}
                      onClick={() => isInStock && handleProductSelect(product)}
                      className={`
                        group flex flex-col sm:flex-row items-center gap-4 sm:gap-6
                        rounded-lg border bg-muted p-4 transition shadow-sm
                        ${isInStock
                          ? "cursor-pointer border-border hover:border-primary hover:bg-muted/80 focus-within:border-primary focus-within:bg-muted/80"
                          : "cursor-not-allowed border-destructive opacity-60"
                        }
                      `}
                      tabIndex={isInStock ? 0 : -1}
                      role="button"
                      aria-disabled={!isInStock}
                    >
                      {product.imageUrl && (
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full max-w-[120px] sm:w-20 rounded-md border border-border object-cover shadow-md flex-shrink-0"
                          loading="lazy"
                        />
                      )}

                      <div className="flex flex-col flex-1 text-left">
                        <span className="text-lg font-semibold text-foreground truncate">
                          {product.name}
                        </span>
                        <span className="text-sm text-muted-foreground mt-1 mb-2 line-clamp-2">
                          {product.description}
                        </span>
                        <div className="flex flex-wrap gap-4 text-sm font-medium text-primary">
                          <span>
                            Price: <span className="text-foreground">${product.price.toFixed(2)}</span> / {product.unit}
                          </span>
                          <span className="text-muted-foreground">Weight: {product.weight}</span>
                          <span className={`font-semibold ${isInStock ? "text-success" : "text-destructive"}`}>
                            Stock: {product.stock}
                          </span>
                        </div>
                      </div>

                      {!isInStock && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            openStockDialog(product);
                          }}
                          className="text-destructive whitespace-nowrap mt-2 sm:mt-0 flex-shrink-0"
                        >
                          Manage Stock
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {selectedProduct && (
        <ManageStockDialog
          product={selectedProduct}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          onSave={handleStockSave}
        />
      )}
    </>
  );
}
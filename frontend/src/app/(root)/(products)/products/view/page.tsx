"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

type Variant = { id: string; name: string; options: string[] };

interface Product {
  title: string;
  shortDescription: string;
  longDescription: string;
  variants: Variant[];
  variantImages: Record<string, string[]>;
  price: number;
  salePrice: number;
  sku: string;
  barcode: string;
  category: string;
  tags: string[];
  quantity: number;
  status: "draft" | "published";
  rating: number;
  reviews: number;
}

const product: Product = {
  title: "Premium Cotton Oxford Shirt",
  shortDescription: "Classic fit, breathable fabric, perfect for any occasion.",
  longDescription: `
    <p>Our Premium Cotton Oxford Shirt combines timeless style with modern comfort. Made from 100% premium cotton, this shirt offers exceptional breathability and durability.</p>
    <ul class="list-disc pl-5 space-y-1 mt-2">
      <li>Classic button-down collar</li>
      <li>Single chest pocket</li>
      <li>Barrel cuffs with button closure</li>
      <li>Tailored fit that's comfortable yet polished</li>
      <li>Machine washable for easy care</li>
    </ul>
    <p class="mt-3">Perfect for business casual or weekend wear, this versatile shirt transitions seamlessly from office to evening.</p>
  `,
  variants: [
    { id: "v1", name: "Color", options: ["Navy", "White", "Light Blue"] },
    { id: "v2", name: "Size", options: ["S", "M", "L", "XL"] },
  ],
  variantImages: {
    Navy: [
      "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop",
    ],
    White: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=800&auto=format&fit=crop",
    ],
    "Light Blue": [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&auto=format&fit=crop",
    ],
  },
  price: 79.99,
  salePrice: 59.99,
  sku: "SHIRT-PREMIUM-001",
  barcode: "9876543210",
  category: "Men's Shirts",
  tags: ["Premium", "Cotton", "Business Casual", "New Arrival"],
  quantity: 42,
  status: "published",
  rating: 4.8,
  reviews: 124,
};

export default function ProductView() {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    Color: product.variants[0].options[0],
  });
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    const imgs = product.variantImages[selectedVariants.Color] || [];
    setImages(imgs);
    setMainImage(imgs[0] || "");
  }, [selectedVariants.Color]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="rounded-lg overflow-hidden bg-muted aspect-square flex items-center justify-center">
            {mainImage ? (
              <img src={mainImage} alt="Product" className="w-full h-full object-contain" />
            ) : (
              <div className="text-muted-foreground">No Image</div>
            )}
          </div>

          {images.length > 1 && (
            <Carousel opts={{ align: "start" }}>
              <CarouselContent className="-ml-2">
                {images.map((img, idx) => (
                  <CarouselItem key={idx} className="pl-2 basis-1/3 md:basis-1/4">
                    <button
                      onClick={() => setMainImage(img)}
                      className={`block rounded border-2 transition ${
                        mainImage === img
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="h-24 w-full object-cover" />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </div>

        {/* Info */}
        <div className="space-y-6">
          {/* Title */}
          <h1 className="text-3xl font-bold text-foreground">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            {Array.from({ length: 5 }).map((_, i) =>
              i < Math.floor(product.rating) ? (
                <AiFillStar key={i} className="text-yellow-400 w-5 h-5" />
              ) : (
                <AiOutlineStar key={i} className="text-muted-foreground w-5 h-5" />
              )
            )}
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-foreground">
              ${product.salePrice.toFixed(2)}
            </span>
            {product.salePrice < product.price && (
              <>
                <span className="line-through text-muted-foreground">
                  ${product.price.toFixed(2)}
                </span>
                <Badge variant="destructive">
                  Save ${(product.price - product.salePrice).toFixed(2)}
                </Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground text-sm">
            {product.quantity > 0
              ? `In stock (${product.quantity} available)`
              : "Out of stock"}
          </p>

          {/* Description */}
          <p className="text-muted-foreground">{product.shortDescription}</p>

          {/* Variants */}
          <div className="space-y-4">
            {product.variants.map((variant) => (
              <div key={variant.id}>
                <p className="text-sm font-medium">{variant.name}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {variant.options.map((opt) => {
                    const active = selectedVariants[variant.name] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() =>
                          setSelectedVariants((prev) => ({
                            ...prev,
                            [variant.name]: opt,
                          }))
                        }
                        className={`px-4 py-1.5 rounded-md border text-sm transition ${
                          active
                            ? "bg-primary text-primary-foreground border-primary"
                            : "bg-background text-foreground border-border hover:bg-muted"
                        }`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>


          {/* Tabs */}
          <Tabs defaultValue="description" className="pt-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-4 text-muted-foreground text-sm">
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: product.longDescription }}
              />
            </TabsContent>
            <TabsContent value="details" className="pt-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium">Product Info</h4>
                  <p className="text-muted-foreground mt-1">SKU: {product.sku}</p>
                  <p className="text-muted-foreground">Barcode: {product.barcode}</p>
                  <p className="text-muted-foreground">Category: {product.category}</p>
                </div>
                <div>
                  <h4 className="font-medium">Tags</h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { LuUpload, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import VariantManager from "./VariantManager";
import { RichTextEditor } from "@/components/rich-text-editor";
import type { ProductFormData } from "./types";
import { MediaLibraryDialog } from "@/components/media/media-library-dialog";

function generateSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

function generateBarcode() {
  // উদাহরণস্বরূপ র্যান্ডম 8 ডিজিট সংখ্যা তৈরি করলাম
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

const ProductForm = ({ initialData = null }: { initialData?: ProductFormData | null }) => {
  const isEditMode = initialData !== null;

  const [formData, setFormData] = useState<ProductFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    images: initialData?.images || [],
    sku: initialData?.sku || "",
    barcode: initialData?.barcode || generateBarcode(),
    category: initialData?.category || "Default Category",
    price: initialData?.price || 0,
    salePrice: initialData?.salePrice || 0,
    quantity: initialData?.quantity || 0,
    slug: initialData?.slug || "",
    tags: initialData?.tags || [],
    hasVariants: initialData?.hasVariants || false,
    variants: initialData?.variants || undefined,
    longDescription: initialData?.longDescription || "", // added longDescription for RichTextEditor
  });

  const [status, setStatus] = useState<"draft" | "published">(initialData?.status || "draft");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [tagInput, setTagInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  // MediaUploader dialogs
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [showVariantUploadDialog, setShowVariantUploadDialog] = useState(false);

  // slug auto-generation
  useEffect(() => {
    if (!isEditMode || formData.slug === "") {
      const newSlug = generateSlug(formData.title);
      setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  }, [formData.title, isEditMode]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === "price" || name === "salePrice" || name === "quantity"
          ? parseFloat(value) || 0
          : value,
    }));
  };

  // Slug input change handler
  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      slug: e.target.value,
    }));
  };

  // Barcode input change handler
  const handleBarcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      barcode: e.target.value,
    }));
  };

  // Image upload for product images
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    const imageUrls = Array.from(files).map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  // Drag and Drop handlers for product images
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageUpload(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  // Remove product image
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Tag input handlers
  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
        setTagInput("");
      }
    }
  };
  const removeTag = (index: number) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  // Variant MediaUploader handlers
  const handleVariantMediaUpload = (uploadedUrls: string[]) => {
    setFormData(prev => {
      if (!prev.variants || prev.variants.length === 0) return prev;
      const updatedVariants = [...prev.variants];
      // Assuming each variant has an images array (init if missing)
      if (!updatedVariants[0].images) updatedVariants[0].images = [];
      updatedVariants[0].images.push(...uploadedUrls);
      return { ...prev, variants: updatedVariants };
    });
    setShowVariantUploadDialog(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, status });
    // API call here
  };

  const categories = ["Default Category", "Electronics", "Clothing", "Home & Garden", "Books", "Toys"];

  return (
    <div className="flex max-w-full gap-8 p-6">
      {/* Left: Form Area */}
      <div className="flex-grow w-full">
        <Card className="p-6">
          {/* Status toggle */}
          <div className="flex items-center justify-between mb-6">
            <span
              className={`text-sm font-medium px-3 py-1 rounded-full ${status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                }`}
            >
              {status === "published" ? "Published" : "Draft"}
            </span>
            <div className="flex items-center space-x-2">
              <Label>Status</Label>
              <button
                type="button"
                onClick={() => setStatus(prev => (prev === "draft" ? "published" : "draft"))}
                className={`w-12 h-6 flex items-center rounded-full transition-all ${status === "published" ? "bg-green-500" : "bg-gray-300"
                  }`}
              >
                <span
                  className={`h-4 w-4 bg-white rounded-full transform transition-transform ${status === "published" ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Variant Manager */}
            <VariantManager formData={formData} setFormData={setFormData} />


            {/* Basic Info */}
            <div className="mb-8 space-y-4">
               <div className="space-y-1">
                <Label htmlFor="title">Product Title</Label>
                <Input id="title" name="title" value={formData.title} onChange={handleChange} className=" bg-background" required />
              </div>

               <div className="space-y-1">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input id="slug" name="slug" value={formData.slug} onChange={handleSlugChange} className=" bg-background" />
              </div>

              <div className="space-y-1">
                <Label htmlFor="barcode">Barcode</Label>
                <Input id="barcode" name="barcode" value={formData.barcode} onChange={handleBarcodeChange} className=" bg-background" />
              </div>

               <div className="space-y-1">
                <Label htmlFor="description">Short Description</Label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-md p-2 bg-background"
                  placeholder="Write product details..."
                />
              </div>

               <div className="space-y-1">
                <Label htmlFor="longDescription">Long Description</Label>
                <RichTextEditor
                  content={formData.longDescription}
                  onUpdate={html => setFormData(prev => ({ ...prev, longDescription: html }))}
                />
              </div>
            </div>

            {/* Pricing */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Pricing</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Price</Label>
                  <Input type="number" name="price" value={formData.price} onChange={handleChange} />
                </div>
                <div>
                  <Label>Sale Price</Label>
                  <Input type="number" name="salePrice" value={formData.salePrice} onChange={handleChange} />
                </div>
                {!formData.hasVariants && (
                  <div>
                    <Label>Quantity</Label>
                    <Input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
                  </div>
                )}
              </div>
            </div>

            {/* SEO Tags */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">SEO</h2>
              <Label>Tags</Label>
              <Input
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={handleTagKeyDown}
                placeholder="Type tag and press TAB"
              />
              <div className="mt-2 flex flex-col gap-1 max-w-xs">
                {formData.tags.map((tag, i) => (
                  <div
                    key={i}
                    className="bg-primary/20 text-primary px-3 py-1 rounded flex justify-between items-center"
                  >
                    <span>{tag}</span>
                    <button onClick={() => removeTag(i)} type="button" className="hover:text-red-600">
                      <LuX className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-6 border-t">
              <Button type="submit">Save & Exit</Button>
              <Button type="submit" variant="secondary">
                Save & Preview
              </Button>
              <Button type="submit" variant="ghost">
                Save & Continue Editing
              </Button>
            </div>
          </form>
        </Card>
      </div>

      {/* Right Sidebar */}
      <aside className="w-96 sticky top-6 lg:min-w-96 h-[calc(100vh-3rem)] overflow-auto">
        <Card className="p-4 mb-6">
          <h3 className="text-lg font-semibold mb-4">Product Images</h3>

          <div
            onClick={() => setShowUploadDialog(true)}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`cursor-pointer border-2 border-dashed rounded-lg p-6 text-center bg-muted transition ${isDragging ? "bg-green-200 border-green-400" : "hover:bg-muted/50"
              }`}
          >
            <LuUpload className="mx-auto mb-2 text-muted-foreground w-6 h-6" />
            <p className="text-sm text-muted-foreground">Click to upload or drag & drop images here</p>
            <input
              ref={fileInputRef}
              onChange={e => handleImageUpload(e.target.files)}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
            />
          </div>

          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-3">
              {formData.images.map((img, index) => (
                <div
                  key={index}
                  className="relative group rounded-lg overflow-hidden border bg-white"
                >
                  <img src={img} alt="Preview" className="w-full h-24 object-cover" />
                  <button
                    onClick={() => removeImage(index)}
                    type="button"
                    className="absolute top-1 right-1 bg-white text-red-500 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <LuX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Card>

        <MediaLibraryDialog
          open={showUploadDialog}
          onOpenChange={setShowUploadDialog}
          onSelect={(url) =>
            setFormData((prev) => ({
              ...prev,
              images: [...prev.images, url],
            }))
          }
        />



      </aside>
    </div>
  );
};

export default ProductForm;

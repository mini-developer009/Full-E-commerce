export interface VariantOption {
  name: string;
  values: string[];
  selectedValues: string[];
}

export interface VariantCombination {
  id: string;
  attributes: Record<string, string>;
  price: number;
  sku: string;
  quantity: number;
  image: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  longDescription?: string; // Add this line
  images: string[];
  sku: string;
  barcode: string;
  category: string;
  price: number;
  salePrice: number;
  quantity: number;
  slug: string;
  tags: string[];
  hasVariants: boolean;
  variants?: any;
  status?: "draft" | "published";
}


export interface MultiSelectOption {
  value: string;
  label: string;
}
export interface ProductVariant {
  weight: string;
  price: number;
  originalPrice: number;
  inStock: boolean;
}

export interface BakeryProduct {
  id: string;
  name: string;
  category: string;
  subCategory?: string;
  description: string;
  image: string;
  gallery?: string[];
  rating: number;
  reviewsCount: number;
  isBestseller?: boolean;
  isEggless?: boolean;
  isGlutenFree?: boolean;
  isFreshBake?: boolean;
  variants: ProductVariant[];
  ingredients: string[];
  shelfLife: string;
}

export interface CartItem {
  productId: string;
  name: string;
  image: string;
  selectedWeight: string;
  price: number;
  quantity: number;
  customMessage?: string;
  customStyle?: string;
  dietaryChoice?: 'eggless' | 'traditional';
  assortedItems?: string[];
}

export interface CategoryItem {
  id: string;
  name: string;
  iconImage: string;
  badge?: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  location: string;
  avatar: string;
  review: string;
  product: string;
  rating: number;
  date?: string;
  verified?: boolean;
}

export interface OrderTrackInfo {
  orderId: string;
  customerName?: string;
  phone?: string;
  itemsSummary?: string;
  status: 'fermenting' | 'baking' | 'packaging' | 'dispatched';
  currentStep: number;
  estimatedDelivery: string;
  dispatchedVia: string;
  batchNumber: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  brand: string;
  affiliateUrl: string;
  isExclusive: boolean;
  rating: number;
  reviews: number;
  isNew?: boolean;
}

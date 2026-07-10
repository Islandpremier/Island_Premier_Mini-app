export interface Product {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  price_list: string | null;
  image_url: string | null;
  video_url: string | null;
  available: boolean;
  featured: boolean;
  stock: number;
  sort_order: number;
  created_at: string;
  updated_at: string | null;
}
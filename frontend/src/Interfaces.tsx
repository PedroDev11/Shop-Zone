export interface Product {
  id?: number;
  slug?: string;
  name: string;
  description: string;
  price: number;
  rating?: number;
  count_in_stock: number;
  category: string;
  image: File | null;
  quantity?: number;
  num_reviews?: number;
}

export interface User {
  id?: number;
  email: string;
  name: string;
  last_name: string;
  avatar: File | null;
}

export interface Token {
  user_id: number;
  email: string;
  name: string;
  last_name: string;
  avatar: File | null;
  is_staff: boolean;
  exp: number;
}

export interface Order {
  total_price: number;
  address: string;
  city: string;
  postal_code: string;
  order_items: Product[];
}

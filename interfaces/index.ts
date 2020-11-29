export interface Product {
  id: number;
  model: string;
  name: string;
  image: string;
  price: string;
  special: string;
  priceInCents: number;
  specialInCents: number;
  description: string;
  sizes: string[];
}

export interface CartItem {
  product: Product;
  size: string;
}

export interface DataList<T> {
  data: T[];
  count: number;
  total: number;
  pageCount: number;
  page: number;
}

export interface Order {
  orderId: number
}

export interface CheckoutRequest {
  products: Array<{ id: number, size: string }>
}

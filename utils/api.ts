import { CheckoutRequest, DataList, Order, Product } from "../interfaces";

const endpoint = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

export async function getProducts(page: number): Promise<DataList<Product>> {
  const response = await fetch(`${endpoint}/product?page=${page}`);

  return await response.json();
}

export async function getProduct(id: number): Promise<Product> {
  const response = await fetch(`${endpoint}/product/${id}`);

  return await response.json();
}

export async function placeOrder(body: CheckoutRequest): Promise<Order> {
  const response = await fetch(`${endpoint}/checkout/placeOrder`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return await response.json();
}

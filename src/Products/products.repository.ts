import { Injectable } from "@nestjs/common";
import { Product } from "./interfaces/products.interfaces";

const MOCK_PRODUCTS: Array<Product> = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Product 1 description',
    price: 100,
    stock: 10,
    imageUrl: 'https://example.com/product1.jpg'
  },
  {
    id: 2,  
    name: 'Product 2',
    description: 'Product 2 description',
    price: 200,
    stock: 20,
    imageUrl: 'https://example.com/product2.jpg'
  },
  {
    id: 3,
    name: 'Product 3',
    description: 'Product 3 description',
    price: 300,
    stock: 30,
    imageUrl: 'https://example.com/product3.jpg'
  }
];

@Injectable()
export class ProductsRepository {
  constructor() {};

  getProductsList(): Array<Product> { 
    return MOCK_PRODUCTS;
  }
}
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
  };

  getProductById(productId: number): Product | undefined {
    const foundedProduct = MOCK_PRODUCTS.find(product => product.id === productId);
    return foundedProduct;
  };

  createNewproduct(product: Omit<Product, 'id'>): number {
    const newProduct = {...product, id: MOCK_PRODUCTS.length + 1};
    MOCK_PRODUCTS.push(newProduct);
    return newProduct.id;
  };

  updateProductInfo(updatedProduct: Product): number | undefined {
    const foundedProduct = MOCK_PRODUCTS.find(product => product.id === updatedProduct.id);
    
    if (!foundedProduct) {
      return undefined;
    }

    Object.assign(foundedProduct, updatedProduct);
    return updatedProduct.id
  };

  deleteProductById(productId: number): number | undefined {
    const index = MOCK_PRODUCTS.findIndex(product => product.id === productId);
  
    if (index === -1) {
      return undefined; // Producto no encontrado
    }
  
    MOCK_PRODUCTS.splice(index, 1); // Se elimina el producto en la posición 'index'
    return productId; 
  };
};
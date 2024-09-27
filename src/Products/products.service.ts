import { Injectable } from "@nestjs/common";
import { Product } from "./interfaces/products.interfaces";
import { ProductsRepository } from "./products.repository";

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository
  ) {};

  getProductsList(): Array<Product> {
    return this.productsRepository.getProductsList();
  };
  
  getProductById(productId: number): Product | undefined {
    return this.productsRepository.getProductById(productId);
  };

  createNewproduct(product: Omit<Product, 'id'>): number {
    return this.productsRepository.createNewproduct(product);
  };

  updateProductInfo(updatedProduct: Product): number | undefined {
    return this.productsRepository.updateProductInfo(updatedProduct);
  };

  deleteProductById(productId: number): number | undefined {
    return this.productsRepository.deleteProductById(productId);
  };
}
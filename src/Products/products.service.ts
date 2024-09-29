import { Injectable } from "@nestjs/common";
import { Product } from "./interfaces/products.interfaces";
import { ProductsRepository } from "./products.repository";
import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
import { CommonQueryDto } from "src/commons/dtos/common-query-dto";

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository
  ) {};

  getProductsList(query: CommonQueryDto): CommonPaginatedResponse<Product> {
    return this.productsRepository.getProductsList(query);
  };
  
  getProductById(productId: number): Product | undefined {
    return this.productsRepository.getProductById(productId);
  };

  createNewProduct(product: Omit<Product, 'id'>): number {
    return this.productsRepository.createNewProduct(product);
  };

  updateProductInfo(updatedProduct: Product): number | undefined {
    return this.productsRepository.updateProductInfo(updatedProduct);
  };

  deleteProductById(productId: number): number | undefined {
    return this.productsRepository.deleteProductById(productId);
  };
}
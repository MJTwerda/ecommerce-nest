import { Injectable } from "@nestjs/common";
import { ProductsRepository } from "./products.repository";
import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
import { CommonQueryDto } from "src/commons/dtos/common-query-dto";
import { CompleteProductDto } from "./dtos/complete-product-dto";
import { ProductsEntity } from "./products.entity";

@Injectable()
export class ProductsService {
  constructor(
    private readonly productsRepository: ProductsRepository
  ) {};

  async getProductsList(query: CommonQueryDto): Promise<CommonPaginatedResponse<ProductsEntity>> {
    const productsList = await this.productsRepository.getProductsList(query);
    return productsList;
  };
  
  async getProductById(productId: string): Promise<CompleteProductDto | undefined> {
    return await this.productsRepository.getProductById(productId);
  };

  async createNewProduct(product: Omit<CompleteProductDto, 'id'>): Promise<string> {
    const createdProductId = await this.productsRepository.createNewProduct(product);
    return createdProductId.id;
  };

  async updateProductInfo(updatedProduct: CompleteProductDto): Promise<string | null> {
    return await this.productsRepository.updateProductInfo(updatedProduct);
  };

  async deleteProductById(productId: string): Promise<string | null> {
    return await this.productsRepository.deleteProductById(productId);
  };
}

//! Sin TypeORM
// import { Injectable } from "@nestjs/common";
// import { ProductsRepository } from "./products.repository";
// import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
// import { CommonQueryDto } from "src/commons/dtos/common-query-dto";
// import { CompleteProductDto } from "./dtos/complete-product-dto";

// @Injectable()
// export class ProductsService {
//   constructor(
//     private readonly productsRepository: ProductsRepository
//   ) {};

//   getProductsList(query: CommonQueryDto): CommonPaginatedResponse<CompleteProductDto> {
//     return this.productsRepository.getProductsList(query);
//   };
  
//   getProductById(productId: number): CompleteProductDto | undefined {
//     return this.productsRepository.getProductById(productId);
//   };

//   createNewProduct(product: Omit<CompleteProductDto, 'id'>): number {
//     return this.productsRepository.createNewProduct(product);
//   };

//   updateProductInfo(updatedProduct: CompleteProductDto): number | undefined {
//     return this.productsRepository.updateProductInfo(updatedProduct);
//   };

//   deleteProductById(productId: number): number | undefined {
//     return this.productsRepository.deleteProductById(productId);
//   };
// }
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
}
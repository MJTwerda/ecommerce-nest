import { Injectable, NotFoundException } from "@nestjs/common";
import { BaseRepository } from '../commons/repositories/base-repository';
import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
import { CommonQueryDto } from '../commons/dtos/common-query-dto';
import { CompleteProductDto } from './dtos/complete-product-dto';
import { ProductsEntity } from "./products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class ProductsRepository extends BaseRepository<ProductsEntity> {
  constructor(
    @InjectRepository(ProductsEntity) private readonly productsRepository: Repository<ProductsEntity>,
    dataSource: DataSource
  ) {
    super(productsRepository.target, dataSource.createEntityManager());
  };

  async createNewProduct(product: Omit<ProductsEntity, 'id'>): Promise<CompleteProductDto | null> {
    const founded_product = await this.getProductByName(product.name);
    if (founded_product) return null;

    const createdUser = await this.productsRepository.save(product);
    return createdUser;
  };

  async getProductsList(query: CommonQueryDto): Promise<CommonPaginatedResponse<ProductsEntity>> {
    const options = { relations: [ 'category' ]}; // Puedes personalizar las opciones de la búsqueda aquí
    const page = Number(query.page) || 1; // Valor por defecto de 1 si query.page es undefined o NaN
    const limit = Number(query.limit) || 5; // Valor por defecto de 1 si query.limit es undefined o NaN
    return await this.paginate(options, page, limit);
  }

  async getProductById(productId: string): Promise<CompleteProductDto | null> {
    const foundedProduct = await this.productsRepository.findOne({
      where: { id: productId },
      relations: [ 'category' ],
    });

    if (!foundedProduct) return null;

    return foundedProduct;
  };

  async updateProductInfo(updatedProduct: CompleteProductDto): Promise<string | null> {
    const result = await this.productsRepository.update(updatedProduct.id, updatedProduct);
    
    if (result.affected === 0) {
      return null;
    };

    return updatedProduct.id;

  };

  async deleteProductById(productId: string): Promise<string | null> {
    const foundedProduct = await this.productsRepository.delete(productId);
    
    if (foundedProduct.affected === 0) {
      return null;
    }

    return productId;
  };

  private async getProductByName(productName: string): Promise<CompleteProductDto | null> {
    const founded_category = await this.productsRepository.findOne({
      where: { name: productName }
    });

    return founded_category || null;
  };

  async reduceProductStock(productId: string, quantity: number) {
    const product = await this.getProductById(productId);
    if (!product) throw new NotFoundException(`Product with id ${productId} not found`);
    product.stock -= quantity;
    await this.productsRepository.save(product);
    return;
  }
};
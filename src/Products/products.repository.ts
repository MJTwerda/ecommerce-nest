import { Injectable } from "@nestjs/common";
import { BaseRepository } from '../commons/repositories/base-repository';
import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
import { CommonQueryDto } from '../commons/dtos/common-query-dto';
import { BaseProductDto } from './dtos/base-product-dto';
import { CompleteProductDto } from './dtos/complete-product-dto';
import { ProductsEntity } from "./products.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(ProductsEntity) private productsRepository: Repository<ProductsEntity>
  ) {};

  async createNewProduct(product: Omit<ProductsEntity, 'id'>): Promise<ProductsEntity | undefined> {
    const createdUser = await this.productsRepository.save(product);
    return createdUser;
  }

  // constructor() {
  //   super();
  // };

  // async getProductsList(query: CommonQueryDto): Promise<CommonPaginatedResponse<ProductsEntity>> { 
  //   const page = Number(query.page) || 1; // Valor por defecto de 1 si query.page es undefined o NaN
  //   const limit = Number(query.limit) || 5;

  //   return await this.paginate({ page, limit });
  // };

  // getProductById(productId: number): CompleteProductDto | undefined {
  //   const foundedProduct = MOCK_PRODUCTS.find(product => product.id === productId);
  //   return foundedProduct;
  // };

  // createNewProduct(product: BaseProductDto): number {
  //   const newProduct = {...product, id: MOCK_PRODUCTS.length + 1};
  //   MOCK_PRODUCTS.push(newProduct);
  //   return newProduct.id;
  // };

  // updateProductInfo(updatedProduct: CompleteProductDto): number | undefined {
  //   const foundedProduct = MOCK_PRODUCTS.find(product => product.id === updatedProduct.id);
    
  //   if (!foundedProduct) {
  //     return undefined;
  //   }

  //   Object.assign(foundedProduct, updatedProduct);
  //   return updatedProduct.id
  // };

  // deleteProductById(productId: number): number | undefined {
  //   const index = MOCK_PRODUCTS.findIndex(product => product.id === productId);
  
  //   if (index === -1) {
  //     return undefined; // Producto no encontrado
  //   }
  
  //   MOCK_PRODUCTS.splice(index, 1); // Se elimina el producto en la posición 'index'
  //   return productId; 
  // };
};

//! SIN TypeORM
// import { Injectable } from "@nestjs/common";
// import { BaseRepository } from '../commons/repositories/base-repository';
// import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
// import { CommonQueryDto } from '../commons/dtos/common-query-dto';
// import { BaseProductDto } from './dtos/base-product-dto';
// import { CompleteProductDto } from './dtos/complete-product-dto';

// const MOCK_PRODUCTS: Array<CompleteProductDto> = [
//   {
//     id: 1,
//     name: 'Product 1',
//     description: 'Product 1 description',
//     price: 100,
//     stock: 10,
//     imageUrl: 'https://example.com/product1.jpg'
//   },
//   {
//     id: 2,  
//     name: 'Product 2',
//     description: 'Product 2 description',
//     price: 200,
//     stock: 20,
//     imageUrl: 'https://example.com/product2.jpg'
//   },
//   {
//     id: 3,
//     name: 'Product 3',
//     description: 'Product 3 description',
//     price: 300,
//     stock: 30,
//     imageUrl: 'https://example.com/product3.jpg'
//   }
// ];

// @Injectable()
// export class ProductsRepository extends BaseRepository<CompleteProductDto> {
//   constructor() {
//     super();
//   };

//   getProductsList(query: CommonQueryDto): CommonPaginatedResponse<CompleteProductDto> { 
//     const page = Number(query.page) || 1; // Valor por defecto de 1 si query.page es undefined o NaN
//     const limit = Number(query.limit) || 5;

//     return this.paginate( 
//       MOCK_PRODUCTS, 
//       page,
//       limit
//     );
//   };

//   getProductById(productId: number): CompleteProductDto | undefined {
//     const foundedProduct = MOCK_PRODUCTS.find(product => product.id === productId);
//     return foundedProduct;
//   };

//   createNewProduct(product: BaseProductDto): number {
//     const newProduct = {...product, id: MOCK_PRODUCTS.length + 1};
//     MOCK_PRODUCTS.push(newProduct);
//     return newProduct.id;
//   };

//   updateProductInfo(updatedProduct: CompleteProductDto): number | undefined {
//     const foundedProduct = MOCK_PRODUCTS.find(product => product.id === updatedProduct.id);
    
//     if (!foundedProduct) {
//       return undefined;
//     }

//     Object.assign(foundedProduct, updatedProduct);
//     return updatedProduct.id
//   };

//   deleteProductById(productId: number): number | undefined {
//     const index = MOCK_PRODUCTS.findIndex(product => product.id === productId);
  
//     if (index === -1) {
//       return undefined; // Producto no encontrado
//     }
  
//     MOCK_PRODUCTS.splice(index, 1); // Se elimina el producto en la posición 'index'
//     return productId; 
//   };
// };
import { 
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe 
} from '@nestjs/common';
import { Response } from "express";

import { ProductsService } from "./products.service";

import { CompleteProductDto } from './dtos/complete-product-dto';
import { BaseProductDto } from './dtos/base-product-dto';
import { CommonQueryDto } from '../commons/dtos/common-query-dto';
import { AuthGuard } from 'src/Auth/guards/auth.guard';


@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {};

  @Get()
  async getProductList(
    @Query() query: CommonQueryDto,
    @Res() response: Response
  ) {
    const products_list = await this.productsService.getProductsList(query);
    return response.status(200).send(products_list);
  };

  @Get(':productId')
  async getProductById( 
    @Param('productId') productId: string, 
    @Res() response: Response
  ) {
    if (!productId) {
      return response.status(404).send(null);
    };

    const founded_product = await this.productsService.getProductById(productId);

    if (!founded_product) {
      return response.status(404).send(null); // TODO: Agregar respuesta
    };
    return response.status(200).send(founded_product);
  };

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async createNewProduct( 
    @Body() newProduct: BaseProductDto, 
    @Res() response: Response
  ) {
    const new_product_id = await this.productsService.createNewProduct(newProduct);

    if (!new_product_id) {
      return response.status(404).send(null);
    };

    return response.status(201).send({ new_product_id });
  };

  @Put()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  async updateProduct(
    @Body() updatedProduct: CompleteProductDto, 
    @Res() response: Response
  ) {
    const updated_product_id = await this.productsService.updateProductInfo(updatedProduct);
    if (!updated_product_id) {
      return response.status(404).send(null); // TODO: Agregar respuesta
    };

    return response.status(200).send({ updated_product_id } );
  };

  @Delete(':productId')
  @UseGuards(AuthGuard)
  async deleteProductById(
    @Param('productId') productId, 
    @Res() response: Response 
  ) {
    if (!productId) {
      return response.status(400).send(null); //TODO: Agregar respuesta
    };

    const deleted_product_id = await this.productsService.deleteProductById(productId);
    return response.status(201).send({ deleted_product_id });
  };
};
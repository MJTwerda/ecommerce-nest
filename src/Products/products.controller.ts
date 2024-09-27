import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response } from "express";
import { Product } from "./interfaces/products.interfaces";
import { ProductsService } from "./products.service";
import { UpdateProductDto } from './dtos/update-product-dto';
import { BaseProductDto } from './dtos/base-product-dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {};

  @Get()
  getProductList(@Res() response: Response) {
    const productslist = this.productsService.getProductsList();
    return response.status(200).send(productslist);
  };

  @Get(':productId')
  getProductById( 
    @Param('productId') productId: string, 
    @Res() response: Response
  ) {
    if (!productId) {
      return response.status(404).send(null);
    };

    const foundedProduct = this.productsService.getProductById(Number(productId));

    if (!foundedProduct) {
      return response.status(404).send(null);
    };
    return response.status(200).send(foundedProduct);
  };

  @Post()
  @UsePipes(ValidationPipe)
  createNewProduct( 
    @Body() newProduct: BaseProductDto, 
    @Res() response: Response
  ) {
    const newProductId = this.productsService.createNewproduct(newProduct);

    if (!newProductId) {
      return response.status(404).send(null);
    };

    return response.status(201).send({ newProductId });
  };

  @Put()
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  updateProduct(
    @Body() updatedProduct: UpdateProductDto, 
    @Res() response: Response
  ) {
    const updatedProductId = this.productsService.updateProductInfo(updatedProduct);
    if (!updatedProductId) {
      return response.status(404).send(null);
    };

    return response.status(200).send({ updatedProductId } );
  };

  @Delete(':productId')
  @UsePipes(ParseIntPipe)
  deleteProductById(
    @Param('productId', ParseIntPipe) productId, 
    @Res() response: Response 
  ) {
    if (!productId) {
      return response.status(400).send(null);
    };

    const deletedProductId = this.productsService.deleteProductById(productId);
    return response.status(201).send({ deletedProductId });
  };
}
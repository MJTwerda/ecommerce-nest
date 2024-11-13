import { 
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe 
} from '@nestjs/common';

import { ProductsService } from "./products.service";

import { CompleteProductDto } from './dtos/complete-product-dto';
import { BaseProductDto } from './dtos/base-product-dto';
import { CommonQueryDto } from '../commons/dtos/common-query-dto';
import { AuthGuard } from 'src/Auth/guards/auth.guard';
import { AllExceptionsFilter } from '../commons/errorHandlers/allExceptionsFilter';


@UseFilters(AllExceptionsFilter)
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {};

  @Get()
  async getProductList(
    @Query() query: CommonQueryDto,
  ) {
    return await this.productsService.getProductsList(query);
  };

  @Get(':productId')
  async getProductById( 
    @Param('productId') productId: string, 
  ) {
    const product_found = await this.productsService.getProductById(productId);
    return { product_found };
  };

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async createNewProduct( 
    @Body() newProduct: BaseProductDto, 
  ) {
    const product_id_created = await this.productsService.createNewProduct(newProduct);
    return { product_id_created };
  };

  @Put()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  async updateProduct(
    @Body() updatedProduct: CompleteProductDto, 
  ) {
    const product_id_updated = await this.productsService.updateProductInfo(updatedProduct);
    return { product_id_updated };
  };

  @Delete(':productId')
  @UseGuards(AuthGuard)
  async deleteProductById(
    @Param('productId') productId: string, 
  ) {
    const product_id_deleted = await this.productsService.deleteProductById(productId);
    return { product_id_deleted}
  };
};
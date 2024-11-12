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
    const founded_product = await this.productsService.getProductById(productId);
    return { founded_product };
  };

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async createNewProduct( 
    @Body() newProduct: BaseProductDto, 
  ) {
    const created_product_id = await this.productsService.createNewProduct(newProduct);
    return { created_product_id };
  };

  @Put()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  async updateProduct(
    @Body() updatedProduct: CompleteProductDto, 
  ) {
    const updated_product_id = await this.productsService.updateProductInfo(updatedProduct);
    return { updated_product_id };
  };

  @Delete(':productId')
  @UseGuards(AuthGuard)
  async deleteProductById(
    @Param('productId') productId: string, 
  ) {
    const deleted_product_id = await this.productsService.deleteProductById(productId);
    return { deleted_product_id}
  };
};
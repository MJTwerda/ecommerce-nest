import { IsOptional, IsString, MaxLength } from "class-validator";
import { ProductsEntity } from "src/Products/products.entity";

export class BaseCategoryDto {

  @IsString()
  @MaxLength(50)
  name: string;

  @IsOptional()
  products?: ProductsEntity[];
}
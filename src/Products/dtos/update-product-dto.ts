import { IsNumber } from "class-validator";
import { BaseProductDto } from './base-product-dto';

export class UpdateProductDto extends BaseProductDto {

  @IsNumber()
  id: number;

};
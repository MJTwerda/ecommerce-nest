import { IsNumber } from "class-validator";
import { BaseProductDto } from './base-product-dto';

export class CompleteProductDto extends BaseProductDto {

  @IsNumber()
    id: string;

};
import { IsUUID } from "class-validator";
import { BaseProductDto } from './base-product-dto';

export class CompleteProductDto extends BaseProductDto {

  @IsUUID()
    id: string;

};
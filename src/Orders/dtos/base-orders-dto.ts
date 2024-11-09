import { IsArray, IsDate, IsOptional, IsUUID } from "class-validator";

export class BaseOrdersDto {
  @IsUUID()
    user: string;

  @IsArray()
    products: Array<{ id: string }>

  @IsUUID()
    order_detail: string;

  @IsOptional()
  @IsDate()
    date: Date;

  
};
import { Type } from "class-transformer";
import { ArrayMinSize, IsArray, IsDate, IsOptional, IsUUID, ValidateNested } from "class-validator";

class PartialProductDto {
  @IsUUID()
  id: string;
}
export class BaseOrdersDto {
  @IsUUID()
    user: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PartialProductDto)
    products: PartialProductDto[]

  @IsUUID()
    order_detail: string;

  @IsOptional()
  @IsDate()
    date: Date;

  
};
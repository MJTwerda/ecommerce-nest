import { IsUUID } from "class-validator";
import { BaseOrdersDto } from "./base-orders-dto";

export class CompleteOrdersDto extends BaseOrdersDto {
  @IsUUID()
    id: string;
}
import { IsNumber } from "class-validator";
import { BaseUserDto } from "./base-user-dto";

export class UpdateUserDto extends BaseUserDto {
  @IsNumber()
    id: number;
}
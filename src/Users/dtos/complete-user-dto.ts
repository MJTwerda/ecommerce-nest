import { IsNumber } from "class-validator";
import { BaseUserDto } from "./base-user-dto";

export class CompleteUserDto extends BaseUserDto {
  @IsNumber()
    id: number;
}
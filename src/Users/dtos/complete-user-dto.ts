import { IsString, IsUUID } from "class-validator";
import { BaseUserDto } from "./base-user-dto";

export class CompleteUserDto extends BaseUserDto {
  @IsUUID()
    id: string;
}
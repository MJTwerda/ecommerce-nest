import { PickType } from "@nestjs/swagger";
import { BaseUserDto } from "./base-user-dto";

export class UserCredentialsDto extends PickType(
  BaseUserDto, 
  ['email', 'password']
) {};
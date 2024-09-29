import { IsEmail, IsString } from "class-validator";
import { INVALID_CREDENTIALS } from "../resources/validation-resources";

export class AuthLoginDto {
  @IsString({ message: INVALID_CREDENTIALS })
  @IsEmail({}, { message: INVALID_CREDENTIALS })
    email: string;

  @IsString({ message: INVALID_CREDENTIALS })
    password: string;
}
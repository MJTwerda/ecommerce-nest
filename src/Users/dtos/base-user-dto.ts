import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class BaseUserDto {
  
  @IsString()
  @IsEmail()
    email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
    name: string;

  @IsString()
  // @MinLength(8, { message: 'Password must be at least 8 characters long' }) // Longitud mínima de 8 caracteres
  // @MaxLength(16, { message: 'Password must not exceed 16 characters' }) // Longitud máxima de 16 caracteres
  // @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/, {
  //   message: 'Password must contain at least one letter, one number, and one special character',
  // })
    password: string;

  @IsString()
    address: string;

  @IsString()
    phone: string;

  @IsString()
  @IsOptional()
    country: string;

  @IsOptional()
  @IsString()
    city: string;
}
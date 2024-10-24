import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class BaseUserDto {
  
  @IsString()
  @IsEmail()
  @MaxLength(50)
    email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
    name: string;

  @IsString()
  // @MinLength(8, { message: 'Password must be at least 8 characters long' }) // Longitud mínima de 8 caracteres
  @MaxLength(20, { message: 'Password must not exceed 20 characters' }) // Longitud máxima de 16 caracteres
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
  @MaxLength(50, { message: 'Country must not exceed 50 characters' })
    country: string;

  @IsString()
  @IsOptional()
  @MaxLength(50, { message: 'City must not exceed 50 characters' })
    city: string;
}
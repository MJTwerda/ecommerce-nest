import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator"

export class BaseUserDto {
  
  @IsString()
  @IsEmail()
  @MaxLength(50)
    email: string;

  @IsString()
  @MinLength(3, { message: 'Name must be at least 3 characters long' })
  @MaxLength(50)
    name: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(15, { message: 'Password must not exceed 20 characters' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/, {
    message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character: !@#$%^&*',
  })
    password: string;

  @IsString()
  @MinLength(3, { message: 'Address must be at least 3 characters long' })
  @MaxLength(50, { message: 'Address must not exceed 50 characters' })
    address: string;

  @IsString()
    phone: string;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'Country must be at least 3 characters long' })
  @MaxLength(50, { message: 'Country must not exceed 50 characters' })
    country: string;

  @IsString()
  @IsOptional()
  @MinLength(3, { message: 'City must be at least 3 characters long' })
  @MaxLength(50, { message: 'City must not exceed 50 characters' })
    city: string;
}
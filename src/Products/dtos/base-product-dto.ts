import { IsNumber, IsPositive, IsString, IsUrl, MaxLength } from "class-validator";

export class BaseProductDto {

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(700)
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  stock: number;

  @IsUrl()
  imageUrl: string;
};
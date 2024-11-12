import { IsArray, IsNumber, IsOptional, IsPositive, IsString, IsUrl, IsUUID, MaxLength, MinLength } from "class-validator";
import { CategoriesEntity } from "src/Categories/categories.entity";
import { OrderDetailsEntity } from "src/OrderDetails/orderDetails.entity";

export class BaseProductDto {

  @IsString()
  @MaxLength(50)
  @MinLength(2)
    name: string;

  @IsString()
  @MaxLength(500)
    description: string;

  @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Price must be a decimal with up to 2 decimal places' })
  @IsPositive()
    price: number;

  @IsNumber()
  @IsPositive()
    stock: number;

  @IsUrl()
    image_url: string;

  @IsUUID() // Suponiendo que el ID es un string (UUID)
    category: CategoriesEntity;

  @IsArray() // Asegúrate de que sea un array
  @IsOptional() // Puede ser opcional
  order_details: OrderDetailsEntity[];
};
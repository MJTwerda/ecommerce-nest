import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class CommonQueryDto {
  @IsOptional() // Indica que el campo es opcional
  @Type(() => Number) // Transforma el valor a número
  @IsInt() // Valida que sea un entero
  @Min(1) // Asegura que sea al menos 1
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number;
}
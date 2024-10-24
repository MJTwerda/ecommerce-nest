import { IsUUID } from "class-validator";
import { BaseCategoryDto } from "./base-category-dto";

export class CompleteCategoryDto extends BaseCategoryDto {

  @IsUUID()
    id: string;

};
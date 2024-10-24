import { Body, Controller, Get, Post, Query, Res, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from "src/Auth/guards/auth.guard";
import { CommonQueryDto } from "src/commons/dtos/common-query-dto";
import { CategoriesService } from "./categories.service";
import { BaseCategoryDto } from "./dtos/base-category-dto";

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {};

  @Get()
  async getCategoriesList(
    @Query() query: CommonQueryDto,
    @Res() response: Response
  ) {
    const categories_list = await this.categoriesService.getCategoriesList(query);
    return response.status(200).send(categories_list);
  };

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  async createNewCategory(
    @Body() newCategory: BaseCategoryDto, 
    @Res() response: Response
  ) {
    const new_category_id = await this.categoriesService.createNewCategory(newCategory);

    if (!new_category_id) {
      return response.status(404).send(null);
    };

    return response.status(201).send({ new_category_id });
  };
}
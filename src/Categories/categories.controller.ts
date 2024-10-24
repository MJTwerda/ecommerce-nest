import { Controller, Get, Query, Res } from "@nestjs/common";
import { Response } from "express";
import { CommonQueryDto } from "src/commons/dtos/common-query-dto";
import { CategoriesService } from "./categories.service";

@Controller()
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService
  ) {};

  @Get()
  async getCategoriesList(
    @Query() query: CommonQueryDto,
    @Res() response: Response
  ) {
    const products_list = await this.categoriesService.getCategoriesList(query);
    return response.status(200).send(products_list);
  };
}
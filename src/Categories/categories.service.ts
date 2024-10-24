import { CategoriesRepository } from './categories.repository';
import { Injectable } from "@nestjs/common";
import { CommonQueryDto } from 'src/commons/dtos/common-query-dto';
import { CommonPaginatedResponse } from 'src/commons/interfaces/common-query.interfaces';
import { CategoriesEntity } from './categories.entity';
import { BaseCategoryDto } from './dtos/base-category-dto';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository
  ) {};

  async getCategoriesList(query: CommonQueryDto): Promise<CommonPaginatedResponse<CategoriesEntity>> {
    return await this.categoriesRepository.getCategoriesList(query);
  };

  async createNewCategory(category: BaseCategoryDto): Promise<string | undefined> {
    const createdCategoryId = await this.categoriesRepository.createNewCategory(category);
    return createdCategoryId.id
  };
}
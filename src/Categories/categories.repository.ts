import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { BaseRepository } from '../commons/repositories/base-repository';
import { CategoriesEntity } from './categories.entity';
import { CommonQueryDto } from '../commons/dtos/common-query-dto';
import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
import { BaseCategoryDto } from "./dtos/base-category-dto";
import { CompleteCategoryDto } from './dtos/complete-category-dto';

@Injectable()
export class CategoriesRepository extends BaseRepository<CategoriesEntity> {
  constructor(
    @InjectRepository(CategoriesEntity) private readonly categoriesRepository: Repository<CategoriesEntity>,
    dataSource: DataSource
  ) {
    super(categoriesRepository.target, dataSource.createEntityManager());
  };
  
  async createNewCategory(newCategory: BaseCategoryDto): Promise<CompleteCategoryDto | null> {
    const founded_category = await this.getCategoryByName(newCategory.name);

    if (founded_category) return null;

    return await this.categoriesRepository.save(newCategory);
  };

  async getCategoriesList(query: CommonQueryDto): Promise<CommonPaginatedResponse<CategoriesEntity>> {
    const options = { relations: [ 'products' ]};
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;

    return await this.paginate(options, page, limit);
  };

  async getCategoryByName(categoryName: string): Promise<CompleteCategoryDto | null> {
    const founded_category = await this.categoriesRepository.findOne({
      where: { name: categoryName }
    });

    return founded_category || null;
  };
};
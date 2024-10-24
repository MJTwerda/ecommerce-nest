import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { BaseRepository } from '../commons/repositories/base-repository';
import { CategoriesEntity } from './categories.entity';
import { CommonQueryDto } from '../commons/dtos/common-query-dto';
import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";

@Injectable()
export class CategoriesRepository extends BaseRepository<CategoriesEntity> {
  constructor(
    @InjectRepository(CategoriesEntity) private readonly categoriesRepository: Repository<CategoriesEntity>,
    dataSource: DataSource
  ) {
    super(categoriesRepository.target, dataSource.createEntityManager());
  };
  
  async addCategories(): Promise<any> {

  }

  async getCategoriesList(query: CommonQueryDto): Promise<CommonPaginatedResponse<CategoriesEntity>> {
    const options = {};
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    return await this.paginate(options, page, limit);
  }
}
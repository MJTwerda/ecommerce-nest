import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesEntity } from "./categories.entity";
import { CategoriesController } from './categories.controller';
import { CategoriesService } from "./categories.service";
import { CategoriesRepository } from "./categories.repository";

@Module({
  imports: [ TypeOrmModule.forFeature([ CategoriesEntity ]) ],
  controllers: [ CategoriesController ],
  providers: [ CategoriesRepository, CategoriesService ],
}) 
export class CategoriesModule { }
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesEntity } from "./categories.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ CategoriesEntity ]) ],
  controllers: [],
  providers: [],
}) 
export class CategoriesModule { }
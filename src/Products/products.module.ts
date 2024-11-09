import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductsController } from "./products.controller";
import { ProductsEntity } from "./products.entity";
import { ProductsRepository } from "./products.repository";
import { ProductsService } from './products.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ ProductsEntity ]) ],
  controllers: [ ProductsController ],
  providers: [ ProductsRepository, ProductsService ],
  exports: [ ProductsService ]
}) 
export class ProductsModule { }
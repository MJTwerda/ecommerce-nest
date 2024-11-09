import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdersEntity } from "./orders.entity";
import { OrdersController } from './orders.controller';
import { OrdersService } from "./orders.service";
import { OrdersRepository } from "./orders.repository";
import { UsersModule } from "src/Users/users.module";
import { OrdersDetailsModule } from "src/OrderDetails/ordersDetails.module";
import { ProductsModule } from "src/Products/products.module";

@Module({
  imports: [ 
    TypeOrmModule.forFeature([ OrdersEntity ]),
    UsersModule,
    OrdersDetailsModule,
    ProductsModule
  ],
  providers: [
    OrdersService,
    OrdersRepository,
  ],
  controllers: [ OrdersController ],
}) 
export class OrdersModule { }
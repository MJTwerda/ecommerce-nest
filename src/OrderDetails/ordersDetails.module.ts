import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetailsEntity } from "./orderDetails.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ OrderDetailsEntity ]) ],
  controllers: [],
  providers: [],
}) 
export class OrdersDetailsModule { }
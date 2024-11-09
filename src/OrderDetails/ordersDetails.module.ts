import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderDetailsEntity } from "./orderDetails.entity";
import { OrderDetailsService } from "./orderDetails.service";
import { OrderDetailsRepository } from './orderDetails.repository';

@Module({
  imports: [ TypeOrmModule.forFeature([ OrderDetailsEntity ]) ],
  controllers: [],
  providers: [ OrderDetailsService, OrderDetailsRepository ],
  exports: [ OrderDetailsService, ]
}) 
export class OrdersDetailsModule { }
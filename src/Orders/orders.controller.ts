import { Body, Controller, Get, Param, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { Response } from "express";
import { BaseOrdersDto } from "./dtos/base-orders-dto";
import { OrdersEntity } from "./orders.entity";
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {};

  @Post()
  @UsePipes(ValidationPipe)
  async addOrder(
    @Body() newOrder: Omit<BaseOrdersDto, 'id'>,
    @Res() response: Response,
    ) {
    const created_order = await this.ordersService.addOrder(newOrder);
    
    if (!created_order) return response.status(404).send(null); //TODO: Agregar respuesta

    return response.status(201).send({ created_order})
  };

  @Get(':orderId')
  async getOrderById(
    @Param('orderId') orderId: string, 
    @Res() response: Response,
  ) {
    if (!orderId) return response.status(404).send(null);
    
    const founded_order = await this.ordersService.getOrderById(orderId);

    if (!founded_order) {
      return response.status(404).send(null); // TODO: Agregar respuesta
    };

    return response.status(200).send({ founded_order });
  };
};
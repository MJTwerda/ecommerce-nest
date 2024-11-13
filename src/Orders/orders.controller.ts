import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { BaseOrdersDto } from "./dtos/base-orders-dto";
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {};

  @Post()
  @UsePipes(ValidationPipe)
  async addOrder(
    @Body() newOrder: Omit<BaseOrdersDto, 'order_detail'>,
    ) {
    const order_created = await this.ordersService.addOrder(newOrder);
    return { order_created };
  };

  @Get(':orderId')
  async getOrderById(
    @Param('orderId') orderId: string, 
  ) {
      const order_found = await this.ordersService.getOrderById(orderId);
      return { order_found };
  };
};
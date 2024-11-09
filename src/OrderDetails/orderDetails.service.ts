import { Injectable } from "@nestjs/common";
import { OrderDetailsEntity } from './orderDetails.entity';
import { OrderDetailsRepository } from "./orderDetails.repository";

@Injectable()
export class OrderDetailsService {
  constructor(
    private readonly orderDetailsRepository: OrderDetailsRepository,
  ) {};

  async findOrderDetailsById(id: string): Promise<OrderDetailsEntity | null> {
    const founded_order_details = await this.orderDetailsRepository.findOrderDetailsById(id);
    if (!founded_order_details) return null;
    return founded_order_details;
  };

  async createOrderDetail(orderDetail: OrderDetailsEntity): Promise<OrderDetailsEntity> {
    return await this.orderDetailsRepository.createOrderDetail(orderDetail);
  }
};
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/commons/repositories/base-repository";
import { DataSource, Repository } from "typeorm";
import { OrderDetailsEntity } from "./orderDetails.entity";

@Injectable()
export class OrderDetailsRepository extends BaseRepository<OrderDetailsEntity> {
  constructor(
    @InjectRepository(OrderDetailsEntity) private readonly orderDetailsRepository: Repository<OrderDetailsEntity>,
    dataSource: DataSource,
  ) {
    super(orderDetailsRepository.target, dataSource.createEntityManager());
  };

  async findOrderDetailsById(id: string): Promise<OrderDetailsEntity | undefined> {
    return await this.orderDetailsRepository.findOneBy({ id });
  };

  async createOrderDetail(orderDetail: OrderDetailsEntity): Promise<OrderDetailsEntity> {
    return await this.orderDetailsRepository.save(orderDetail);
  };
};
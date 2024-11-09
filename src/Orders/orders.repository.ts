import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/commons/repositories/base-repository";
import { DataSource, Repository } from "typeorm";
import { OrdersEntity } from './orders.entity';

@Injectable()
export class OrdersRepository extends BaseRepository<OrdersEntity> {
  constructor(
    @InjectRepository(OrdersEntity) private readonly ordersRepository: Repository<OrdersEntity>,
    dataSource: DataSource,
  ) {
    super(ordersRepository.target, dataSource.createEntityManager());
  };

  async saveOrder(newOrder: Omit<OrdersEntity, 'id'>) {
    const created_order = this.ordersRepository.save(newOrder);
    
    return created_order;
  };

  async getOrderById(orderId: string): Promise<OrdersEntity | null> {
    const founded_order = await this.ordersRepository.findOne({
      where: { id: orderId },
      relations: [ 'user' ]
    });

    if (!founded_order) return null;

    return founded_order;
  }; 
};
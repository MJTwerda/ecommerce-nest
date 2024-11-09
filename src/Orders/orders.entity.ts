import { OrderDetailsEntity } from "src/OrderDetails/orderDetails.entity";
import { UsersEntity } from "src/Users/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'orders'
})
export class OrdersEntity {

  @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

  @Column({ type: 'date', nullable: true })
    date: Date;

  // Relations
  @ManyToOne(() => UsersEntity, (user) => user.orders, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' }) 
    user: string;

  @OneToOne(() => OrderDetailsEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_detail_id' })
    order_detail: OrderDetailsEntity;
}
import { OrdersEntity } from "src/Orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'users'
})
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

  @Column({ default: false })
    is_admin: boolean;

  @Column({ unique: true, nullable: false, length: 50 })
    email: string;

  @Column({ nullable: false, length: 50 })
    name: string;

  @Column({ nullable: false, length: 100 })
    password: string;

  @Column({ type: 'text', nullable: true })
    address: string;

  @Column({ type: 'text', nullable: false })
    phone: string;

  @Column({ nullable: true, length: 50 })
    country: string;

  @Column({ nullable: true, length: 50 })
    city: string;

  @OneToMany(() => OrdersEntity, (order) => order.user)
    orders: OrdersEntity[];
}
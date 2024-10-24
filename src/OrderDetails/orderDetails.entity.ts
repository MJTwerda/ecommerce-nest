import { OrdersEntity } from "src/Orders/orders.entity";
import { ProductsEntity } from "src/Products/products.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinColumn } from "typeorm";

@Entity({
  name: 'order_details'
})
export class OrderDetailsEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: false })
    price: number;

  // Relations
  @OneToOne(() => OrdersEntity, { cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
    order: OrdersEntity;

  @ManyToMany(() => ProductsEntity, (product) => product.order_details)
    products: ProductsEntity[];
}

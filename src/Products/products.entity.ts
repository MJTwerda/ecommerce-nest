import { CategoriesEntity } from "src/Categories/categories.entity";
import { OrderDetailsEntity } from "src/OrderDetails/orderDetails.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'products'
})
export class ProductsEntity {

  @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();
    
  @Column({ nullable: false, length: 50 })
    name: string;

  @Column({ nullable: false, length: 500 })
    description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: false })
    price: number;

  @Column( { type: 'int', default: 0, nullable: false })
    stock: number

  @Column({ nullable: false })
    image_url: string;

  // Relación 1:N con Category
  @ManyToOne(() => CategoriesEntity, (category) => category.products, { nullable: true })
  @JoinColumn({ name: 'category_id' })
    category: CategoriesEntity;

  // Relación N:N con OrderDetails
  @ManyToMany(() => OrderDetailsEntity, (orderDetails) => orderDetails.products, { nullable: true })
  @JoinTable()
    order_details: OrderDetailsEntity[];
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'products'
})
export class ProductsEntity {

  @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();
    
  @Column({ nullable: false })
    name: string;

  @Column({ nullable: false })
    description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0, nullable: false })
    price: number;

  @Column( { type: 'int', default: 0, nullable: false })
    stock: number

  @Column({ nullable: false })
    imageUrl: string;
}
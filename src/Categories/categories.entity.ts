import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { ProductsEntity } from '../Products/products.entity';

@Entity({
  name: 'categories'
})
export class CategoriesEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

  @Column({ type: 'varchar', length: 50, nullable: false })
    name: string;

  // Relations
  @OneToMany(() => ProductsEntity, (product) => product.category)
    products: ProductsEntity[];
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

@Entity({
  name: 'users'
})
export class UsersEntity {
  @PrimaryGeneratedColumn('uuid')
    id: string = uuidv4();

  @Column({ unique: true })
    email: string;

  @Column()
    name: string;

  @Column()
    password: string;

  @Column()
    address: string;

  @Column()
    phone: string;

  @Column({ nullable: true })
    country: string;

  @Column({ nullable: true })
    city: string;
}
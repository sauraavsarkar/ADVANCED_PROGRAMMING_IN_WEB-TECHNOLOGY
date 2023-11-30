import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';


@Entity()
export class Pryment {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  prymentId: number;

  @Column()
  name: string;

  @Column()
  amount: string;

  @ManyToOne(() => Pryment, (worker) => worker.prodcuts)
    worker: Pryment;

  @ManyToMany(() => Category, (category) => category.pryments)
  @JoinTable({ name: 'PrymentCategory' }) // Specify the name of the join table
  categories: Category[];
}

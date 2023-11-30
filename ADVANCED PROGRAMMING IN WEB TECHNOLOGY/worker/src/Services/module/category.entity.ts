import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Pryment } from './pryment.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  categoryId: number;

  @Column()
  name: string;




  @ManyToMany(() => Pryment, (pryment) => pryment.categories)
  pryments: Pryment[];
}

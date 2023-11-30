
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkerProfile } from './workerProfile.entity';
import { Pryment } from 'src/Services/module/pryment.entity';


// import { Product } from './product.entity';

@Entity('worker')
export class Worker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
 

  @OneToMany(() => Pryment, (pryment) => pryment.worker, { cascade: true })
  pryments: Pryment[];

  @OneToOne(() => WorkerProfile, (workerProfile) => workerProfile.worker, {
    cascade: true,
  })

  @JoinColumn()
  workerProfile: WorkerProfile;
  static workerProfile: typeof WorkerProfile;
}

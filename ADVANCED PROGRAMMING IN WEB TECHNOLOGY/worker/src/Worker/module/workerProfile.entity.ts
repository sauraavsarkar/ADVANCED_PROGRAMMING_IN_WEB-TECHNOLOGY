import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { WorkerPicture } from './workerPicture.entity';
import { Worker } from './workerpersonal.entity';

@Entity('workerProfile')
export class WorkerProfile {
  @PrimaryGeneratedColumn()
  workerid: number;
  @Column()
  workername: string;
  @Column()
  workertitle: string;
  @Column()
  workerusername: string;
  @Column()
  workerpassword: string;

  @OneToOne(
    () => WorkerPicture,
    (workerPicture) => workerPicture.workerProfile,
    { cascade: true },
  )
  @JoinColumn()
  workerPicture: WorkerPicture;

  @OneToOne(() => Worker, (worker) => worker.workerProfile)
  worker: Worker;
}

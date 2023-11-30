import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { WorkerProfile } from './workerProfile.entity';


@Entity('workerpicture')
export class WorkerPicture {
  @PrimaryGeneratedColumn()
  workerpictureid: number;

  @Column({ nullable: true })
  workerpicturename: string;

  @OneToOne(
    () => WorkerProfile,
    (workerProfile) => workerProfile.workerPicture,
  )
  workerProfile: WorkerPicture;
}

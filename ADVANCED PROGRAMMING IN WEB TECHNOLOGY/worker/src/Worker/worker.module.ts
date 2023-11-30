import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkerProfile } from './module/workerProfile.entity';
import { WorkerPicture } from './module/workerPicture.entity';
import { workerService } from './services/worker.service';
import { WorkerProfileController } from './Controllers/workerprofile.controller';
import { WorkerController } from './Controllers/worker.controller';
import { Worker } from './module/workerpersonal.entity';
import { Pryment } from 'src/Services/module/pryment.entity';
import { Category } from 'src/Services/module/category.entity';


// Import the repository

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WorkerProfile,
      Worker,
      WorkerPicture,
      Pryment,
      Category,
      
    ]),
  ],
  providers: [workerService],
  controllers: [
    WorkerProfileController,
    WorkerController
  ],
  exports: [workerService],
})
export class WorkerModule {}

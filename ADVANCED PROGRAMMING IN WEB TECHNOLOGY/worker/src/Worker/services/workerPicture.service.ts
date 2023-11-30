import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WorkerPicture } from '../module/workerPicture.entity';
import { WorkerProfile } from '../module/workerProfile.entity';
import { CreateWorkerPictureDto } from '../dtos/workerPicture.dto';


@Injectable()
export class WorkerPictureService {
  // for testing
  constructor(
    @InjectRepository(WorkerPicture)
    private workerPictureRepository: Repository<WorkerPicture>,
    @InjectRepository(WorkerProfile)
    private workerProfileReporsitory: Repository<WorkerProfile>,
  ) {}
  async addWorkerPicture(
    id: any,
    createWorkerPictureDto: CreateWorkerPictureDto,
  ): Promise<WorkerPicture> {
    try {
      const workerPicture = new WorkerPicture();
      workerPicture.workerpicturename =
        createWorkerPictureDto.workerPicturename;

      const res = await this.workerPictureRepository.save(workerPicture);

      // Find a workerProfile by its ID
      const profile = await this.workerProfileReporsitory.findOne({
        where: { workerid: id },
      });
      profile.workerPicture = res;
      await this.workerProfileReporsitory.save(profile);
      return res;
    } catch (error) {
      console.error('Error while saving LandPicture:', error);
      throw new HttpException(
        'Failed to save LandPicture.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

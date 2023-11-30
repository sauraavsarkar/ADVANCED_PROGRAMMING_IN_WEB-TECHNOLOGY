import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { WorkerProfile } from '../module/workerProfile.entity';
import { CreateWorkerProfileDto } from '../dtos/create-worker.dto';
import { Worker } from '../module/workerpersonal.entity';
import { Category } from 'src/Services/module/category.entity';
import { Pryment } from 'src/Services/module/pryment.entity';
import { CreatePrymentDto } from 'src/Services/dtos/Create_pryment_dto';
import { CreateCategoryDto } from 'src/Services/dtos/Create_Category_dto';



@Injectable()
export class workerService {
  constructor(
    @InjectRepository(Worker)
    private workerRepository: Repository<Worker>,
    @InjectRepository(WorkerProfile)
    private workerProfileRepository: Repository<WorkerProfile>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(Pryment)
    private PrymentRepository: Repository<Pryment>,

  ) {}
 


  // Add product
  //
  //
  addPryment(prymentInfo: CreatePrymentDto) {
    return this.PrymentRepository.save(prymentInfo);
  }
  getAllPryment(): Promise<Pryment[]> {
    return this.PrymentRepository.find();
  }
  async findOneById(id: number): Promise<Pryment> {
    return this.PrymentRepository.findOne({ where: { PrymentId: id } });
  }

  async update(
    id: number,
    updatePrymentDto: Partial<Pryment>,
  ): Promise<Pryment> {
    await this.PrymentRepository.update(id, updatePrymentDto);
    return this.findOneById(id);
  }

  async removePryment(id: number): Promise<void> {
    await this.PrymentRepository.delete(id);
  }

  
  addCategory(categoryInfo: CreateCategoryDto) {
    return this.categoryRepository.save(categoryInfo);
  }

  getAllCategory(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async addprymentToCategory(
    prymentId: number,
    categoryId: number,
  ): Promise<Pryment | { message: string }> {
    const pryment = await this.PrymentRepository.findOne({
      where: { prymentId: prymentId },
    });

    const category = await this.categoryRepository.findOne({
      where: { categoryId: categoryId },
    });

    if (pryment && category) {
      if (!Array.isArray(pryment.categories)) {
        pryment.categories = [];
      }

      pryment.categories = [...pryment.categories, category];
      await this.PrymentRepository.save(pryment);
      return pryment;
    } else {
      return { message: 'pryment or category not found' };
    }
  }

  //Create admin
  //
  //
  //
  //
  //
  //

  async createWorker(
    worker: Worker,
    workerProfile: WorkerProfile,
  ): Promise<WorkerProfile> {
    worker.workerProfile = workerProfile; // Set the association

    const password = workerProfile.workerpassword;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    workerProfile.workerpassword = hashedPassword;

    await this.workerRepository.save(worker);

    return this.workerProfileRepository.save(workerProfile);
  }

  getAll(): Promise<WorkerProfile[]> {
    return this.workerProfileRepository.find({
      select: {
        workerusername: true,
        workerpassword: true,
      },
    });
  }
  getProfile(): Promise<WorkerProfile[]> {
    return this.workerProfileRepository.find({
      select: {
        workername: true,
        workertitle: true,
        workerusername: true,
        workerpassword: true,
      },
    });
  }
  async getProfileByEmail(email: string): Promise<WorkerProfile | null> {
    return this.workerProfileRepository.findOne({
      where: { workerusername: email },
    });
  }

  // here update the profile based on the id
  async updateProfile(
    id: number,
    updatedProfile: WorkerProfile,
  ): Promise<WorkerProfile | null> {
    const existingProfile = await this.workerProfileRepository.findOne({
      where: { workerid: id },
    });

    if (!existingProfile) {
      throw new Error('Profile not found');
    }

    // Update the properties of the existing profile with the new values
    existingProfile.workername = updatedProfile.workername;
    existingProfile.workertitle = updatedProfile.workertitle;
    existingProfile.workerusername = updatedProfile.workerusername;

    // Check if the password is updated
    if (updatedProfile.workerpassword) {
      const newPassword = updatedProfile.workerpassword;

      // Generate a new salt and hash the password
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Update the password with the hashed password
      existingProfile.workerpassword = hashedPassword;
    }

    // Update other properties as needed

    // Save the updated profile in the database
    return await this.workerProfileRepository.save(existingProfile);
  }

  getUserByID(id: number): Promise<WorkerProfile> {
    return this.workerProfileRepository.findOneBy({ workerid: id });
  }
  //   async addProductToCategory(

  async login(
    CreateworkerProfileDto: CreateWorkerProfileDto,
  ): Promise<WorkerProfile | null> {
    const user = await this.workerProfileRepository.findOne({
      where: { workerusername: CreateworkerProfileDto.workerusername },
    });

    if (user) {
      const isPasswordValid = await bcrypt.compare(
        CreateworkerProfileDto.workerpassword,
        user.workerpassword,
      );

      if (isPasswordValid) {
        console.log('Login successful');
        return user;
      }
    }

    console.log('Login failed. User not found or invalid password.');
    return null;
  }

  async getAllSeller(): Promise<WorkerProfile[]> {
    return this.workerProfileRepository.find();
  }
  async getSellerById(id: number): Promise<WorkerProfile> {
    return this.workerProfileRepository.findOneBy({ workerid: id });
  }


}

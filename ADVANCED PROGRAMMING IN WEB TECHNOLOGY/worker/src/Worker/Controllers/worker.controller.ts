import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Session,
  UseGuards,
} from '@nestjs/common';
import { SessionGuard } from '../worker.gaurds';
import { workerService } from '../services/worker.service';
import { CreateWorkerProfileDto } from '../dtos/create-worker.dto';
import { Pryment } from 'src/Services/module/pryment.entity';
import { CreatePrymentDto } from 'src/Services/dtos/Create_pryment_dto';
import { CreateCategoryDto } from 'src/Services/dtos/Create_Category_dto';
import { Category } from 'src/Services/module/category.entity';


@Controller('Worker')
export class WorkerController {
  constructor(private readonly workerService: workerService) {}


  @Get('hello')
  getHello(): string {
    return 'hello from worker';
  }
  @Get('profile')
  @UseGuards(SessionGuard)
  async getProfile(@Session() session) {
    if (session && session.email) {
      const profile = await this.workerService.getProfileByEmail(
        session.email,
      );

      if (profile) {
        return profile;
      } else {
        throw new NotFoundException('Profile not found');
      }
    } else {
      throw new ForbiddenException('Forbidden resource');
    }
  }

  @Get('index')
  @UseGuards(SessionGuard)
  getIndex(@Session() session) {
    console.log(session.email);
    return this.workerService.getAll();
  }
  @Post('login')
  async login(
    @Body() createWorkerProfileDto: CreateWorkerProfileDto,
    @Session() session,
  ) {
    const user = await this.workerService.login(createWorkerProfileDto);

    if (user) {
      session.email = createWorkerProfileDto.workerusername; // Set the email in the session

      return {
        success: true,
        message: 'Login successful',
        user: user, // This includes the user details in the response
      };
    } else {
      console.log('Unauthorized login attempt');
      throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('prypryment')
  @UseGuards(SessionGuard)
  createPryment(@Body() pryment: CreatePrymentDto): Promise<Pryment> {
    return this.workerService.addPryment(pryment);
  }
  @Get('getAllPryment')
  async getAllPryment(): Promise<{ success: boolean; data?: Pryment[] }> {
    try {
      const pryments = await this.workerService.getAllPryment();
      return { success: true, data: pryments };
    } catch (error) {
      return { success: false };
    }
  }
  @Get('singlePryment/:id')
  findOne(@Param('id') id: number) {
    return this.workerService.findOneById(id);
  }

  @Put('updatePryment/:id')
  update(
    @Param('id') id: number,
    @Body() updatePrymentDto: Partial<Pryment>,
  ) {
    return this.workerService.update(id, updatePrymentDto);
  }

  @Delete('deletePryment:id')
  remove(@Param('id') id: number) {
    return this.workerService.removePryment(id);
  }

  @Post('addCategory')
  createCategory(@Body() category: CreateCategoryDto): Promise<Category> {
    return this.workerService.addCategory(category);
  }

  @Post('Prymentcategory')
  async addPrymentToCategory(
    @Body() body: { prymentId: number; categoryId: number },
  ): Promise<any> {
    const { prymentId, categoryId } = body;

    const pryment = await this.workerService.addprymentToCategory(
      prymentId,
      categoryId,
    );
    if (pryment) {
      return { message: 'pryment added to category successfully' };
    } else {
      return { message: 'pryment or category not found' };
    }
  }

  @Get('getAllCategory')
  async getAllCategory(): Promise<{ success: boolean; data?: Category[] }> {
    try {
      const category = await this.workerService.getAllCategory();
      return { success: true, data: category };
    } catch (error) {
      return { success: false };
    }
  }


}

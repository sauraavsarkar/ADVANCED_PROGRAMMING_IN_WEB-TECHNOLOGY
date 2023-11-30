import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    Session,
    UploadedFile,
    UseGuards,
    UseInterceptors,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
import { SessionGuard } from '../worker.gaurds';
import { workerService } from '../services/worker.service';
import { WorkerProfile } from '../module/workerProfile.entity';
import { CreateWorkerProfileDto } from '../dtos/create-worker.dto';
import { Worker } from '../module/workerpersonal.entity';
  
  @Controller('Worker')
  export class WorkerProfileController {
    constructor(private readonly workerService: workerService) {}
    
  
    @Post('registrarion')
    async createWorkerWithProfile(
      @Body() data: { worker : Worker; workerProfile: WorkerProfile },
    ) {
      try {
        const { worker, workerProfile } = data;
  
        const result = await this.workerService.createWorker(
          worker,
          workerProfile,
        );
        return {
          success: true,
          message: 'worker and workerProfile created successfully',
          data: result,
        };
      } catch (error) {
        return {
          success: false,
          message: 'worker and workerProfile creation failed',
          error: error.message,
        };
      }
    }
  
    @Get('hello')
    getHello(): string {
      return 'hello from worker';
    }
  
    @Get('index')
    @UseGuards(SessionGuard)
    getIndex(@Session() session) {
      console.log(session.email);
      return this.workerService.getAll();
    }
  
    @Get('profiledetails')
    @UseGuards(SessionGuard)
    getProfile(@Session() session) {
      console.log(session.email);
      console.log('Reached the getProfile route');
      console.log('Session email:', session.email);
      return this.workerService.getProfile();
    }
  
    @Put('update/:id') 
    @UseGuards(SessionGuard)
    async updateProfile(
      @Param('id') id: number,
      @Body() updatedProfile: WorkerProfile,
    ) {
      try {
        const result = await this.workerService.updateProfile(
          id,
          updatedProfile,
        );
        return { success: true, message: 'Profile updated successfully' };
      } catch (error) {
        return {
          success: false,
          message: 'Profile update failed',
          error: error.message,
        };
      }
    }
  
    @Post('login')
    async login(
      @Body() CreateWorkerProfileDto: CreateWorkerProfileDto,
      @Session() session,
    ) {
      const user = await this.workerService.login(CreateWorkerProfileDto);
  
      if (user) {
        session.email = CreateWorkerProfileDto.workerusername;
        return true;
      } else {
        console.log('Unauthorized login attempt');
        throw new HttpException('UnauthorizedException', HttpStatus.UNAUTHORIZED);
      }
    }
  

  }
  
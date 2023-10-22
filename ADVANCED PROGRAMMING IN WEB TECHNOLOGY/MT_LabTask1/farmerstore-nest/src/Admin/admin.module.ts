import { Module } from '@nestjs/common';
import { adminController } from './admin.controller';
import { adminService } from './admin.service';

@Module({
  imports: [],
  controllers: [adminController],
  providers: [adminService],
})
export class adminModule {}
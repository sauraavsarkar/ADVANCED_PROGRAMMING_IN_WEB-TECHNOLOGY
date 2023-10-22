import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { adminModule } from './Admin/admin.module';

@Module({
  imports: [adminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
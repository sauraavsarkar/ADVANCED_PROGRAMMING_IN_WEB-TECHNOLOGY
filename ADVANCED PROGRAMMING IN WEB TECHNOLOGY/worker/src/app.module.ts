import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkerModule } from './Worker/worker.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    WorkerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'saurav',
      database: 'Worker', //Change to your database name
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



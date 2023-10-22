import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AdminModule,
    TypeOrmModule.forRoot(
      { type: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'postgres',
       password: 'saurav',
       database: 'AdminInfo',//Change to your database name
       autoLoadEntities: true,
       synchronize: true,
       } ),
      
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

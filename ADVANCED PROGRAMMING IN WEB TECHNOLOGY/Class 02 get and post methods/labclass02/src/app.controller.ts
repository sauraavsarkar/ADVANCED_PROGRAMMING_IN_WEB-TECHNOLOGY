import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { userInfo } from 'os';
import { AdminInfo } from './admin.dto';

@Controller('admin')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get('index')
  getIndex(): string {
    return this.appService.getIndex();
  }
  @Post('index')
  PostIndex(): string {
    return this.appService.PostIndex();
  }
  @Get('/Searchuserbyid/:id')
  getSearchuserbyid(@Param('id')id:number): string {
    return 'the user is ' + id;
  }
  @Get('/Searchuserbyname/:name')
  getSearchuserbyName(@Param('name') name:string): string {
    return 'the user Name is ' + name;
  }
  @Get('/Searchuserbyidname')
  getSearchuserbyidandName(@Query('name') name:string , @Query('id') id:number): string {
    return 'the user Name is ' + name + ' and id is '+id;
  }
  @Get('/Searchuserbyobject')
  getSearchuserbyobject(@Body('name') name: string , @Body('id') id:number): object {
    return {name ,id};
  }
  @Post('Adduserasadmin')
  Adduserasadmin(@Body()userInfo:AdminInfo): object {
    return {"Hi,":userInfo.name ,"your User_nmae is ":userInfo.username};
  }


}

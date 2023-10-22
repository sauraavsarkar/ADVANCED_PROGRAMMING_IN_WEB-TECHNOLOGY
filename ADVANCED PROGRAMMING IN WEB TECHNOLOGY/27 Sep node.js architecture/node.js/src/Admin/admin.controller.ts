import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { adminService } from './admin.service';
import { AdminInfo } from './admin.dto';

@Controller('Admin')
export class adminController {
    constructor(private readonly AdminService: adminService) {}

            @Get('hi')
            getHello(): string {
            return this.AdminService.getAdmin();
            }

            @Get('index')
            getIndex(): string {
            return this.AdminService.getIndex();
            }

            @Post('index')
            PostIndex(): string {
            return this.AdminService.PostIndex();
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
            return {"Hi,":userInfo.name ,"your User_nmae is ":userInfo.username ,"your email":userInfo.email};
            }


}

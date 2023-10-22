import { Body, Controller, Get, Param, Post, Put, Query, UploadedFile, UsePipes, ValidationPipe, Res, UseInterceptors} from '@nestjs/common';
import { adminService } from './admin.service';
import { AdminInfo } from './admin.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';

@Controller('Admin')
export class adminController {
    constructor(private readonly AdminService: adminService) {}

            @Get('hi')
            getHello(): string {
            return this.AdminService.getAdmin();
            }

            @Put('/updateadmin/:id')
            @UsePipes(new ValidationPipe())
            updateAdminbyID(@Param() id:number,@Body() data:AdminInfo): object{
            return this.AdminService.updateAdminById(id,data);
            }

            @UsePipes(new ValidationPipe())
            @Post('Adduserasadmin')
            Adduserasadmin(@Body()userInfo:AdminInfo): object {
            return {"Hi,":userInfo.name ,"your User_nmae is ":userInfo.username ,"your email":userInfo.email};
            }

            @Post(('/upload'))
            @UseInterceptors(FileInterceptor('myfile',
            { fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
            cb(null, true);
                else {
                    cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
                    }
            },
                limits: { fileSize: 30000 },
                storage:diskStorage({
                destination: './uploads',
                filename: function (req, file, cb) {
                cb(null,Date.now()+file.originalname)
            },
            })
            }
            ))
            uploadFile(@UploadedFile() myfileobj: Express.Multer.File):object
            {
            console.log(myfileobj)   
            return ({message:"file uploaded"});
            }

            @Get('/getimage/:name')
            getImages(@Param('name') name, @Res() res) {
            res.sendFile(name,{ root: './uploads' })
            }
            


}
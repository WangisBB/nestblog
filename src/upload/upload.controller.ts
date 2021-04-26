
import {Body, Controller, HttpCode, Post, Put,Delete, UseGuards,UploadedFile,UseInterceptors} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags,ApiBody,ApiConsumes} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import { AuthGuard } from '@nestjs/passport';
import {UploadService} from "./upload.service";
import { FileUploadDto,DeluploadDto } from './dto/FileUpload.dto';
// import fs from "fs";
import * as fs from 'fs';
// const fs=require("fs")

@ApiTags('上传文件')
@Controller('upload')
export class UploadController {
  constructor(
    private readonly articleService: UploadService
) {}

@UseGuards(AuthGuard('jwt'))
@Post('editor')
@UseInterceptors(FileInterceptor('file'))
@ApiConsumes('multipart/form-data')
@ApiBody({
  description: 'List of cats',
  type: FileUploadDto,
})
uploadFile(@UploadedFile() file) {

  fs.writeFileSync("./public/"+ file.originalname, file.buffer);
  return {src:'public/'+ file.originalname,msg:"成功",code:200}
}
@UseGuards(AuthGuard('jwt'))
@Delete('editor')

@ApiOperation({
  summary: '删除文件',
})

@HttpCode(200)
async register(@Body() params:DeluploadDto): Promise<object> {
 let res= fs.unlinkSync("./public/"+ params.originalname)
 if(res==undefined){
  return  {src:'删除'+ params.originalname,msg:"成功",code:200}
 }
  
}
}

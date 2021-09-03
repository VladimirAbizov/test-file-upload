import { FileService } from './file.service';
import { Body, Controller, Delete, Get, Param, Post, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ObjectId } from "mongoose";
import { CreateFileDto, CreateFileResponseDto, DownloadFileDto } from './create-file.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('/file')
export class FileController {
    constructor(private fileService: FileService) { }

    @Get(':id')
    download(@Param('id') id: ObjectId): Promise<DownloadFileDto> {
        return this.fileService.downloadFile(id)
    }

    @Post()
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'data', maxCount: 1 }
    ]))
    create(@UploadedFiles() files, @Body() dto: CreateFileDto): Promise<CreateFileResponseDto> {
        const file = files.data[0]
        return this.fileService.createFile(file, dto)
    }

    @Delete(':id')
    delete(@Param('id') id: ObjectId) {
        return this.fileService.removeFile(id)
    }

}
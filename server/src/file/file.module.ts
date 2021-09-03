import { AttachmentFile, AttachmentFileSchema } from './file.schema';
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { FileService } from "./file.service";
import { FileController } from './file.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: AttachmentFile.name, schema: AttachmentFileSchema }])
    ],
    controllers: [FileController],
    providers: [FileService]
})
export class FileModule { }
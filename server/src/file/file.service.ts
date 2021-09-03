import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, ObjectId } from "mongoose";
import { CreateFileResponseDto, DownloadFileDto } from "./create-file.dto";
import { AttachmentFileDocument, AttachmentFile } from "./file.schema";

@Injectable()
export class FileService {

    constructor(@InjectModel(AttachmentFile.name) private fileModel: Model<AttachmentFileDocument>) { }

    async getFile(fileId: ObjectId): Promise<AttachmentFile> {
        return this.sendRequestWithCheckError(async (): Promise<AttachmentFile> => {
            const findedFile = await this.fileModel.findById(fileId)
            return findedFile
        });
    }

    async getFileByUserId(userId: string): Promise<AttachmentFile> {
        return this.sendRequestWithCheckError(async (): Promise<AttachmentFile> => {
            const findedFile = await this.fileModel.findOne({ user: userId })
            return findedFile
        });
    }

    async getArrayFiles(userId: string): Promise<AttachmentFile[]> {
        return this.sendRequestWithCheckError(async (): Promise<AttachmentFile[]> => {
            const findedFiles = await this.fileModel.find({ user: userId })
            return findedFiles
        }, () => { return HttpStatus.INTERNAL_SERVER_ERROR });
    }

    async downloadFile(fileId: ObjectId): Promise<DownloadFileDto> {
        return this.sendRequestWithCheckError(async (): Promise<DownloadFileDto> => {
            const file = await this.fileModel.findById(fileId)

            return new DownloadFileDto(file.data, file.type)
        });
    }

    async createFile(file, dto): Promise<CreateFileResponseDto> {
        let data = file.buffer.toString('base64')
        const request = { ...dto, data }
        return this.sendRequestWithCheckError(async (): Promise<CreateFileResponseDto> => {
            const createdFile = await this.fileModel.create({ ...request })

            return new CreateFileResponseDto(createdFile._id, createdFile.name)
        });
    }

    async removeFile(fileId: ObjectId) {
        return this.sendRequestWithCheckError(async (): Promise<ObjectId> => {
            const deletedFile = await this.fileModel.findByIdAndDelete(fileId)
            return deletedFile._id
        });
    }

    async sendRequestWithCheckError(request, errorCallback = null) {
        try {
            return await request()
        } catch (e) {
            //если нужна будет отдельная обработка ошибок
            if (errorCallback != null) errorCallback();
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
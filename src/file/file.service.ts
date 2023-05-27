import { Injectable } from '@nestjs/common';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService {

    constructor(
        private readonly fileRepo : FileRepository
    ){}

    async saveFile(file : Express.Multer.File) {
        return await this.fileRepo.addFile(file)
    }
}

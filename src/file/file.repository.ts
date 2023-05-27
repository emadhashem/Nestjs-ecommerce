import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileEntity } from "src/entities/_imgs/file.entity";
import { Repository } from "typeorm";


@Injectable()
export class FileRepository {

    constructor(
        @InjectRepository(FileEntity)
        private readonly fileDbRepo : Repository<FileEntity>
    ){}

    async addFile(file: Express.Multer.File) : Promise<FileEntity> {
        try {
            const newFile = this.fileDbRepo.create({
                original_name: file.originalname,
                file_name: file.filename ,
                path: file.path,
            })
            return await this.fileDbRepo.save(newFile)
        } catch (error) {
            console.log(error);
            throw new BadRequestException(error.message)
        }
    }
}
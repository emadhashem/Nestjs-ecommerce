import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepo: Repository<UserEntity>
    ) { }
    async createNewUser(createUserDto: CreateUserDto) {
        const findUser = await this.findUserByEmail(createUserDto.email)
        if (findUser) {
            throw new HttpException('This email is already in use', HttpStatus.CONFLICT)
        }
        const newUser = this.userRepo.create()
        newUser.f_name = createUserDto.fname
        newUser.l_name = createUserDto.lname
        newUser.email = createUserDto.email
        newUser.password = createUserDto.password
        return await this.userRepo.manager.save(newUser)
    }
    async findUserByEmail(email: string) {
        return await this.userRepo.findOneBy({ email })
    }
}

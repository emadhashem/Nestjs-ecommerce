import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>,
    
    ) { }
    async createNewUser(createUserDto: CreateUserDto) {
        const newUser = this.userRepo.create()
        newUser.user_name = createUserDto.userName
        newUser.password = createUserDto.password
        newUser.email = createUserDto.email
        return await this.userRepo.save(newUser)
    }

    async findUserByEmail(email: string) {
        const res =  await this.userRepo.createQueryBuilder()
        .select('*')
        .from(User , 'user')
        .where('user.email = :_email' , {_email : email})
        .execute()
        return res[0]
    }
    async validateUserPassword(candidatepass: string, hash: string) {
        return await User.comparePassword(candidatepass, hash)
    } 


}

import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user/user.entity';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { UserRepositoryService } from 'src/user/user.repository.service';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepo: UserRepositoryService,
        private readonly jwtService: JwtService
    ) { }
    async signUp(createUserDto: CreateUserDto) {
        try {
            return await this.userRepo.createNewUser(createUserDto)
        } catch (error) {
            if (error instanceof QueryFailedError
            ) {
                throw new ConflictException('Email already exists.');
            }
            throw error
        }
    }
    async login(email: string, password: string) {
        const findUser = await this.userRepo.findUserByEmail(email)
        const { password: hashPass } = findUser
        if (!findUser || ! await this.userRepo.validateUserPassword(password, hashPass)) {
            throw new NotFoundException()
        }
        const access_token = await this.singAccessToken({ sub: findUser })
        return {
            access_token
        }
    }

    async singAccessToken(payload: { sub: User }) {
        return await this.jwtService.signAsync(payload)
    }
}

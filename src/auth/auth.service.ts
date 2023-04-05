import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/user/user.entity';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { UserRepository } from 'src/user/user.repository';
import { QueryFailedError } from 'typeorm';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {

    constructor(
        private readonly userRepo: UserRepository,
        private readonly jwtService: JwtService,
        private readonly authRepo : AuthRepository
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

    async logout(token : string) {
        try {
            await this.authRepo.addToken(token)
            return 'Logout success'
        } catch (error) {
            throw new error
        }
    }
}

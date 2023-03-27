import { Body, Controller, Get, Next, Post, Request as REQ, UsePipes, ValidationPipe } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Post('create')
    @UsePipes(new ValidationPipe({ transform: true }))
    async createNewUser(@Body() createUser: CreateUserDto, @Next() next: NextFunction) {
        try {
            return await this.userService.createNewUser(createUser)
        } catch (error) {
            next(error)
        }
    }

}

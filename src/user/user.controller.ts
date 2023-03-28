import { Body, Controller, Get, HttpException, Next, Post, Req, Request as REQ, UsePipes, ValidationPipe } from '@nestjs/common';
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
    async createNewUser(@Body() createUser: CreateUserDto) {
        return await this.userService.createNewUser(createUser)
    }
    @Post('login')
    async loginUser(@Req() req: Request) {
        return this.userService.loginUser(req.body)
    }

}

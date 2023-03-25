import { Body, Controller, Get, Post, Request as REQ, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }
    
    @Post('create')
    @UsePipes(new ValidationPipe({transform : true}))
    createNewUser(@Body() createUser : CreateUserDto) {
        return this.userService.createNewUser(createUser)
    }

}

import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    
    @Post()
    test() {
        return 'dcmsdc'
    }

}

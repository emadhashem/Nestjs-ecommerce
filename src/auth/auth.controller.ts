import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/createUser.dto';
import { Public } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authservice: AuthService) {}

  @Public()
  @Post('signup')
  @UsePipes(ValidationPipe)
  async signUp(@Body() createUserDto: CreateUserDto) {
    await this.authservice.signUp(createUserDto);
    return {
      message: 'success',
    };
  }

  @Public()
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    return this.authservice.login(email, password);
  }

  @Get('logout')
  async logout(@Req() req: Request) {
    return req['user'];
  }
}

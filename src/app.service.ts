import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  
  getHello() {
    return {
      data: 'hello world'
    }
  }
}

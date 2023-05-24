import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userDbRepo: Repository<User>,
  ) {}
  async createNewUser(createUserDto: CreateUserDto) {
    const newUser = this.userDbRepo.create();
    newUser.user_name = createUserDto.userName;
    newUser.password = createUserDto.password;
    newUser.email = createUserDto.email;
    return await this.userDbRepo.save(newUser);
  }

  async findUserByEmail(email: string) {
    return await this.userDbRepo.findOne({
      where: {
        email,
      },
    });
  }

  async findUserById(id: string) {
    return await this.userDbRepo.findOneBy({ id });
  }

  async validateUserPassword(candidatepass: string, hash: string) {
    return await User.comparePassword(candidatepass, hash);
  }
}

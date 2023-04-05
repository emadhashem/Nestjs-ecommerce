import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop/shop.entity';
import { User } from 'src/entities/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { ShopController } from './shop.controller';
import { ShopRepository } from './shop.repository';
import { ShopService } from './shop.service';

@Module({
  imports: [TypeOrmModule.forFeature([Shop, User])],
  controllers: [ShopController],
  providers: [ShopService, ShopRepository, UserRepository],
  exports : [ShopRepository]
})
export class ShopModule { }

import { Module } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop/shop.entity';
import { ShopRepository } from './shop.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), UserModule],
  providers: [ShopService, ShopRepository],
  controllers: [ShopController],
})
export class ShopModule {}

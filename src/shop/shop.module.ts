import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ShopController } from './shop.controller';
import { ShopService } from './shop.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop/shop.entity';
import { ShopRepository } from './shop.repository';
import { UserModule } from 'src/user/user.module';
import { PaginationMiddleware } from 'src/middlewares/PaginationMiddleware';

@Module({
  imports: [TypeOrmModule.forFeature([Shop]), UserModule],
  providers: [ShopService, ShopRepository],
  controllers: [ShopController],
})
export class ShopModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PaginationMiddleware)
    .forRoutes('/shop/get-all-shops', '/shop/search-shop')
  }
}

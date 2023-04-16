import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CronModule } from './cron/cron.module';
import { ShopModule } from './shop/shop.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';


import databaseConfig from './utils/database.config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }),
  ScheduleModule.forRoot(),
  TypeOrmModule.forRoot(databaseConfig()),
    AuthModule,
    CronModule,
    ShopModule,
    ProductModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

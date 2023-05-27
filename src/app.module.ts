import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ShopModule } from './shop/shop.module';
import { CategoryModule } from './category/category.module';

import databaseConfig from './utils/database.config';
import { MulterModule } from '@nestjs/platform-express';
import { multerConfig } from './utils/multer.config';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(databaseConfig()),
    AuthModule,
    ShopModule,
    CategoryModule,
    FileModule,
    MulterModule.register({dest : '../uploads'})
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';


import databaseConfig from './utils/database.config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }),
  TypeOrmModule.forRoot(databaseConfig()),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

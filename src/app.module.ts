import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidationExceptionFilter } from './exception handlers/ValidationExceptionFilter';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import databaseConfig from './utils/database.config';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env'
  }),
  TypeOrmModule.forRoot(databaseConfig()),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: 'APP_VALIDATE_FILTER',
    useClass: ValidationExceptionFilter
  }],
})
export class AppModule { }

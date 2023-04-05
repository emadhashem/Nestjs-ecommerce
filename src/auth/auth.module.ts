import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccessToken } from 'src/entities/access_token/accessToken.entity';
import { User } from 'src/entities/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/user.repository';
import { AuthController } from './auth.controller';
import { AuthGuard } from './auth.guard';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        privateKey: Buffer.from(configService.get<string>('JWT_ACCESS_TOKEN_PRIVATE_KEY')
          , 'base64').toString(),
        publicKey: Buffer.from(configService.get<string>('JWT_ACCESS_TOKEN_PUBLIC_KEY'),
          'base64'
        ).toString(),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRATION_TIME') + 'm',
          algorithm: 'RS256'
        },
        global : true
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, AccessToken]),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, AuthRepository, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
  exports : [AuthRepository, JwtModule]
})
export class AuthModule { }

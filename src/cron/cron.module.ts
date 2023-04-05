import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { CronService } from './cron.service';

@Module({
  imports: [AuthModule],
  providers: [CronService]
})
export class CronModule { }

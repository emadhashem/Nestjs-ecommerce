import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AuthRepository } from 'src/auth/auth.repository';

@Injectable()
export class CronService {

    private readonly logger = new Logger(CronService.name);
    constructor(
        private readonly authRepo: AuthRepository,
        private readonly jwtService: JwtService
    ) { }
    @Cron(CronExpression.EVERY_5_HOURS)
    async deleteTokens() {

        const all = await this.authRepo.getAll()
        for (let { token, id } of all) {
            try {
                await this.jwtService.verifyAsync(token)
                this.logger.debug(`still in the expiration interval`)
            } catch (error) {
                await this.authRepo.removeToken(token)
                this.logger.debug(`token with id : ${id} deleted.`)
            }
        }
    }
}

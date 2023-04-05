

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AccessToken } from 'src/entities/access_token/accessToken.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(AccessToken)
        private readonly accessTokenRepo: Repository<AccessToken>
    ) { }

    async addToken(token: string) {
        const tk = this.accessTokenRepo.create({ token })
        return await this.accessTokenRepo.save(tk)
    }
    async removeToken(token: string) {
        return await this.accessTokenRepo.createQueryBuilder('tk')
            .delete()
            .where('token = :_token', { _token : token })
            .execute()

    }
    async getAll() {
        return await this.accessTokenRepo.find()
    }
    async findToken(token : string) {
        return await this.accessTokenRepo.findOneBy({
            token
        })
    }
}

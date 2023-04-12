import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { QueryFailedError } from 'typeorm';
import { CreateShopDto } from './dtos/createShop.dto';
import { UpdateShopDto } from './dtos/updateShop.dto';
import { ShopRepository } from './shop.repository';

@Injectable()
export class ShopService {

    constructor(
        private readonly shopRepo: ShopRepository,
        private readonly userRepo: UserRepository
    ) { }

    async createNewShop(createShopDto: CreateShopDto) {
        try {
            const findUser = await this.userRepo.findUserByEmail(createShopDto.email)
            if (!findUser) throw new BadRequestException('User Not found')
            const shops = await this.shopRepo.getShopsByUserId(findUser.id)
            if (shops.length >= 3) throw new BadRequestException('You reached the max number of shops')
            return await this.shopRepo.create(createShopDto, findUser)
        } catch (error) {
            if (error instanceof QueryFailedError && error.message.includes('Duplicate')) throw new ConflictException('Shop name used')
            throw error
        }
    }
    async getAllUserShops(userId: string) {
        return await this.shopRepo.getShopsByUserId(userId)
    }
    async updateShop(updateshopDto: UpdateShopDto) {
        const findShop = await this.shopRepo.findShopByName(updateshopDto.name, updateshopDto.user_id)
        if (!findShop) throw new BadRequestException('Shop Not Found!.')
        return await this.shopRepo.updateShop(updateshopDto, findShop)
    }
}

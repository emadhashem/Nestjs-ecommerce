import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shop } from "src/entities/shop/shop.entity";
import { User } from "src/entities/user/user.entity";
import { Repository } from "typeorm";
import { CreateShopDto } from "./dtos/createShop.dto";


@Injectable()
export class ShopRepository {
    constructor(
        @InjectRepository(Shop)
        private readonly shopRepo: Repository<Shop>,
    ) { }

    async create(createShopDto: CreateShopDto, user: User) {
        try {
            const newShop = this.shopRepo.create()
            newShop.shop_name = createShopDto.name
            newShop.shop_description = createShopDto.description
            newShop.shop_phone_number = createShopDto.phone
            newShop.shop_address = createShopDto.address
            newShop.shop_owner = user
            const res = await this.shopRepo.save(newShop)
            return await this.shopRepo.findOneBy({
                id: res.id
            })
        } catch (error) {
            throw error
        }
    }
    async getShopsByUserId(userId: string) {
        const res = await this.shopRepo.createQueryBuilder('shop')
            .leftJoinAndSelect("shop.shop_owner", "owner")
            .select(['shop.shop_name', 'shop.shop_description', 'owner.id'])
            .where('shop.shop_owner_id = :id', { id: userId })
            .getMany()
        return res
    }
}

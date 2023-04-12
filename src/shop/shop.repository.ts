import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shop } from "src/entities/shop/shop.entity";
import { User } from "src/entities/user/user.entity";
import { Repository } from "typeorm";
import { CreateShopDto } from "./dtos/createShop.dto";
import { UpdateShopDto } from "./dtos/updateShop.dto";


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

    async findShopByName(name: string, user_id: string) {
        return await this.shopRepo.createQueryBuilder('shop')
            .where('shop.shop_owner_id = :user_id AND shop.shop_name = :name', { name, user_id })
            .getOne()
    }
    async updateShop(updateShopDto: UpdateShopDto, shop: Shop) {
        shop.shop_name = updateShopDto.name
        shop.shop_address = updateShopDto.address
        shop.shop_description = updateShopDto.description
        shop.shop_phone_number = updateShopDto.phone
        return await this.shopRepo.save(shop)
    }
}

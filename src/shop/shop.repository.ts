import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop/shop.entity';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dto/CreateShop.dto';
import { User } from 'src/entities/user/user.entity';

@Injectable()
export class ShopRepository {
  constructor(
    @InjectRepository(Shop)
    private readonly shopDbRepo: Repository<Shop>,
  ) {}

  async createShop(createShopDto: CreateShopDto, owner: User) {
    try {
      const newShop = this.shopDbRepo.create({ ...createShopDto });
      newShop.shop_owner = owner;
      return await this.shopDbRepo.save(newShop);
    } catch (error) {
      throw error;
    }
  }

  async getUserShops(ownerId: string): Promise<Shop[]> {
    return await this.shopDbRepo
      .createQueryBuilder('shop')
      .where('shop.shop_owner_id = :id', { id: ownerId })
      .execute();
  }
}

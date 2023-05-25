import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop/shop.entity';
import { NoVersionOrUpdateDateColumnError, Repository } from 'typeorm';
import { CreateShopDto } from './dto/CreateShop.dto';
import { User } from 'src/entities/user/user.entity';
import { UpdateShopDto } from './dto/UpdateShop.dto';

@Injectable()
export class ShopRepository {
  constructor(
    @InjectRepository(Shop)
    private readonly shopDbRepo: Repository<Shop>,
  ) { }

  async createShop(createShopDto: CreateShopDto, owner: User) {
    try {
      const newShop = this.shopDbRepo.create({ ...createShopDto });
      newShop.shop_owner = owner;
      await this.shopDbRepo.save(newShop);
    } catch (error) {
      if (error.message.includes('Duplicate')) throw new ConflictException('Shop name used.')
      throw error;
    }
  }

  async getUserShops(ownerId: string): Promise<Shop[]> {
    return await this.shopDbRepo
      .createQueryBuilder('shop')
      .where('shop.shop_owner_id = :id', { id: ownerId })
      .execute();
  }

  async getShopByNameOrId(key: 'shop_name' | 'id', value: string, ownerId: string)
    : Promise<Shop> {
    if (key === 'id') {
      return await this.shopDbRepo.createQueryBuilder('shop')
        .where('shop.id = :id AND shop.shop_owner_id = :ownerId', { ownerId, id: value })
        .getOne()
    }
    return await this.shopDbRepo.createQueryBuilder('shop')
      .where('shop.shop_name = :shop_name AND shop.shop_owner_id = :ownerId', { ownerId, shop_name: value })
      .getOne()
  }

  async updateShop(updateShopDto: UpdateShopDto) {
    const reult =  await this.shopDbRepo.update({
      id : updateShopDto.id
    } , {
      ...updateShopDto
    })
    if(reult.affected === 0) throw new BadRequestException('Update fail.')
    
  }
}

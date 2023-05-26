import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop/shop.entity';
import { Repository } from 'typeorm';
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

  async getShopByNameOrIdAndOwner(key: 'shop_name' | 'id', value: string, ownerId: string)
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

  async getShopById(id : string) {
    return await this.shopDbRepo.createQueryBuilder('shop')
      .where('shop.id = :id', { id })
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

  async deleteShop(shopId : string , ownerId : string) {
    const result = await this.shopDbRepo
      .createQueryBuilder()
      .delete()
      .where('id = :id AND shop_owner_id = :ownerId' , {id : shopId, ownerId})
      .execute()
      if(result.affected === 0) throw new BadRequestException('Delte fail.')
  }

  async getAllShopsByFilters(skip : string, limit : string , shop_name?: string, shop_address? : string) {
    const qb = this.shopDbRepo.createQueryBuilder()

    if(shop_name) {
      qb.andWhere('shop_name LIKE :name' , {name : `%${shop_name}%`})
    }

    if(shop_address) {
      qb.andWhere('shop_address LIKE :address' , {address : `%${shop_address}%`})
    }
    const shops = await qb.skip(Number(skip)).take(Number(limit)).getMany()
    return shops
  }

  async shopSearch(skip : string, limit : string, searchText : string) {
    const qb = this.shopDbRepo.createQueryBuilder('shop')

    qb.orWhere('shop_name LIKE :text' , {text : `%${searchText}%`})
    .orWhere('shop_address LIKE :text' , {text : `%${searchText}%`})
    .orWhere('shop_description LIKE :text' , {text : `%${searchText}%`})

    const shops = await qb
    .skip(Number(skip)).take(Number(limit)).execute()

    return shops
    
  }
  
}

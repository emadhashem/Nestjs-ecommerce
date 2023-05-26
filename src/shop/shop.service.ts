import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShopRepository } from './shop.repository';
import { CreateShopDto } from './dto/CreateShop.dto';
import { UserRepository } from 'src/user/user.repository';
import { maxNumberOfShopsForOwner } from './shop-types-constants';
import { UpdateShopDto } from './dto/UpdateShop.dto';

@Injectable()
export class ShopService {
  constructor(
    private readonly shopRepo: ShopRepository,
    private readonly userRepo: UserRepository,
  ) { }

  async createShop(createShopDto: CreateShopDto, ownerId: string) {
    try {
      const owner = await this.userRepo.findUserById(ownerId);
      if (!owner) throw new NotFoundException('User not found');
      const shops = await this.shopRepo.getUserShops(ownerId);
      if (shops.length >= maxNumberOfShopsForOwner)
        throw new BadRequestException('You exced the limit number of shops');
      return await this.shopRepo.createShop(createShopDto, owner);
    } catch (error) {
      throw error;
    }
  }

  async updateShop(updateShopDto: UpdateShopDto, ownerId: string) {
    
    try {
      let curShop = await this.shopRepo.getShopByNameOrIdAndOwner("id" , updateShopDto.id , ownerId)
      if(!curShop) throw new NotFoundException('Shop not found.')
      return await this.shopRepo.updateShop(updateShopDto)
    } catch (error) {
      if (error.message.includes('Duplicate')) throw new ConflictException('New Shop name used.')
      throw error;
    }
  }

  async deleteShop(shopId : string , ownerId : string) {
    try {
      await this.shopRepo.deleteShop(shopId , ownerId)
    } catch (error) {
      throw error
    }
  }

  async getAllShopsByFilters( skip : string, limit : string , shop_name?: string, shop_address? : string) {
    try {
      return await this.shopRepo.getAllShopsByFilters(skip, limit , shop_name , shop_address)
    } catch (error) {
      throw error
    }
  }

  async searchShop(skip  :string , limit : string , text : string) {
    return await this.shopRepo.shopSearch(skip , limit , text);
  }

  async getShopDetails(shopId : string) {
    return await this.shopRepo.getShopById(shopId)
  }

  async getMyShops(ownerId : string) {
    return await this.shopRepo.getUserShops(ownerId)
  }
}



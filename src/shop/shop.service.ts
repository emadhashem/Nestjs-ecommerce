import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ShopRepository } from './shop.repository';
import { CreateShopDto } from './dto/CreateShop.dto';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class ShopService {
  constructor(
    private readonly shopRepo: ShopRepository,
    private readonly userRepo: UserRepository,
  ) {}

  async createShop(createShopDto: CreateShopDto, ownerId: string) {
    try {
      const owner = await this.userRepo.findUserById(ownerId);
      if (!owner) throw new NotFoundException('User not found');
      const shops = await this.shopRepo.getUserShops(ownerId);
      if (shops.length >= 3)
        throw new BadRequestException('You exced the limit number of shops');
      return await this.shopRepo.createShop(createShopDto, owner);
    } catch (error) {
      throw error;
    }
  }
}

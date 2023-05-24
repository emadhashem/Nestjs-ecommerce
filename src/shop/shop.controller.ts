import {
  Controller,
  Post,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateShopDto } from './dto/CreateShop.dto';
import { ShopService } from './shop.service';
import { Request } from 'express';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @UsePipes(ValidationPipe)
  @Post('/create-shop')
  createShop(createShopDto: CreateShopDto, @Req() req: Request) {
    return this.shopService.createShop(createShopDto, req['user'].id);
  }
}

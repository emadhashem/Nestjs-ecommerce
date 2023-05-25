import {
  Body,
  Controller,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateShopDto } from './dto/CreateShop.dto';
import { ShopService } from './shop.service';
import { Request } from 'express';
import { UpdateShopDto } from './dto/UpdateShop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @UsePipes(ValidationPipe)
  @Post('/create-shop')
  async createShop(@Body() createShopDto: CreateShopDto, @Req() req: Request) {
    await this.shopService.createShop(createShopDto, req['user'].id);
    return {
      message : 'success'
    }
  }

  @UsePipes(ValidationPipe)
  @Put('/update-shop')
  async updateShop(@Body() updateShopDto : UpdateShopDto, @Req() req: Request) {
    await this.shopService.updateShop(updateShopDto, req['user'].id)
    return {
      message : 'success'
    }

  }
}


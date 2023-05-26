import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { CreateShopDto } from './dto/CreateShop.dto';
import { ShopService } from './shop.service';
import { Request, query } from 'express';
import { UpdateShopDto } from './dto/UpdateShop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) { }

  @UsePipes(ValidationPipe)
  @Post('/create-shop')
  async createShop(@Body() createShopDto: CreateShopDto, @Req() req: Request) {
    await this.shopService.createShop(createShopDto, req['user'].id);
    return {
      message: 'success'
    }
  }

  @UsePipes(ValidationPipe)
  @Put('/update-shop')
  async updateShop(@Body() updateShopDto: UpdateShopDto, @Req() req: Request) {
    await this.shopService.updateShop(updateShopDto, req['user'].id)
    return {
      message: 'success'
    }
  }

  @Delete('/delete-shop')
  async deleteShop(@Query('id') id: string, @Req() req: Request) {
    await this.shopService.deleteShop(id, req['user'].id)
    return {
      message: 'success'
    }
  }

  
  @Get('/get-all-shops')
  async getAllshops(
    @Req() req: Request,
    @Query('shop_name') shop_name?: string,
    @Query('shop_address') shop_address?: string
  ) {

    return await this.shopService.getAllShopsByFilters(
      req['pagination'].skip,
      req['pagination'].limit,
      shop_name, shop_address
    )
  }

  
  @Get('/search-shop')
  async searchShop(@Req() req: Request, @Query('text') text: string,) {
    return await this.shopService.searchShop(req['pagination'].skip,
      req['pagination'].limit,
      text)
  }

  @Get('/shop')
  async getShop(@Query('id') id: string) {
    return await this.shopService.getShopDetails(id)
  }

  @Get('/my-shops')
  async getMyShops(@Req() req: Request) {
    return await this.shopService.getMyShops(req['user'].id)
  }
}


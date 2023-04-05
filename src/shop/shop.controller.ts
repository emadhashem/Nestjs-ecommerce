import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CreateShopDto } from './dtos/createShop.dto';
import { ShopService } from './shop.service';

@Controller('shop')
export class ShopController {

    constructor(
        private readonly shopService: ShopService
    ) { }

    @Post('create')
    @UsePipes(ValidationPipe)
    createNewShop(@Body() createShopDto: CreateShopDto, @Req() req: Request) {
        return this.shopService.createNewShop({ ...createShopDto, email: req['user'].user.email })
    }

    @Get('my_shops')
    async getAllUserShops(@Req() req: Request) {
        return this.shopService.getAllUserShops(req['user'].user.id)
    }
}

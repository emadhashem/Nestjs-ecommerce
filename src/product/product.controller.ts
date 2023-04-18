import { Body, Controller, Delete, Param, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { Request } from 'express';
import { CreatePorductDto } from './dtos/createProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productService: ProductService
    ) { }

    @UsePipes(ValidationPipe)
    @Post('/create')
    create(@Req() req: Request, @Body() createPorductDto: CreatePorductDto) {
        return this.productService.create(createPorductDto, req['user'].user.id)
    }

    @Delete('/delete/:id')
    delete(@Param('id') id : string) {
        return this.productService.delete(id)
    }
}

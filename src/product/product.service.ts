import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/category/category.repository';
import { ShopRepository } from 'src/shop/shop.repository';
import { CreatePorductDto } from './dtos/createProduct.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
    constructor(
        private readonly productRepo: ProductRepository,
        private readonly categoryRepo: CategoryRepository,
        private readonly shopRepo: ShopRepository,
    ) { }

    async create(createPorductDto: CreatePorductDto, user_id: string) {
        const shop = await this.shopRepo.findShopByName(createPorductDto.name, user_id)
        if (!shop) throw new BadRequestException('Shop not found')
        const category = await this.categoryRepo.findCategotyByName(createPorductDto.category_name)
        if (!category) throw new BadRequestException('Category not found')

        return await this.productRepo.create(createPorductDto, category, shop)
    }

    async delete(id: string) {
        return await this.productRepo.delete(id)
    }
}

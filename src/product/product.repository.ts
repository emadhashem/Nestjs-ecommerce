import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category/category.entity';
import { Product } from 'src/entities/product/product.entity';
import { Shop } from 'src/entities/shop/shop.entity';
import { Repository } from 'typeorm';
import { CreatePorductDto } from './dtos/createProduct.dto';

@Injectable()
export class ProductRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productRepo: Repository<Product>
    ) { }

    async create(createPorductDto: CreatePorductDto, category: Category, shop: Shop) {
        try {
            const newProduct = this.productRepo.create(
                {
                    product_name: createPorductDto.category_name,
                    product_description: createPorductDto.description,
                    product_price: createPorductDto.price,
                    shop: shop,
                    category: category,
                    product_stock_quantity : createPorductDto.stock_quantity
                }
            )
            return await this.productRepo.save(newProduct)
        } catch (error) {
            throw new ConflictException('Porduct name must be uniqe')
        }
    }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { CategoryRepository } from 'src/category/category.repository';
import { Category } from 'src/entities/category/category.entity';
import { Product } from 'src/entities/product/product.entity';
import { Shop } from 'src/entities/shop/shop.entity';
import { ShopModule } from 'src/shop/shop.module';
import { ShopRepository } from 'src/shop/shop.repository';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Shop])],
  controllers: [ProductController],
  providers: [ProductService, CategoryRepository, ShopRepository, ProductRepository]
})
export class ProductModule { }

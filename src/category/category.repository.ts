import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dtos/createCategory.dto';

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepo: Repository<Category>
    ) { }
    async createCategory(createCategoryDto : CreateCategoryDto) {
        try {
            const newCategory = this.categoryRepo.create()
            newCategory.category_name = createCategoryDto.name
            return await this.categoryRepo.save(newCategory)
        } catch (error) {
            throw new ConflictException('Name must be unique')
        }
    }
}

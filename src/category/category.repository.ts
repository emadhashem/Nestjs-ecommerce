import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryRepository {

    constructor(
        @InjectRepository(Category)
        private readonly categoryDbRepo : Repository<Category>
    ){}

    async createCategory(createCategoryDto : CreateCategoryDto) {
        try {
            const newCategory = this.categoryDbRepo.create({...createCategoryDto})
            await this.categoryDbRepo.save(newCategory)
        } catch (error) {
            if(error.message.includes('Duplicate')) throw new ConflictException('Category name already exits.')
            throw error
        }
    }

    async getAllCategory()  {
        return await this.categoryDbRepo.find()
    }
}

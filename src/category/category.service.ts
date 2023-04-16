import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dtos/createCategory.dto';

@Injectable()
export class CategoryService {
    constructor(
        private readonly categoryRepo: CategoryRepository
    ) { }

    async create(createCategoryDto: CreateCategoryDto) {
        return await this.categoryRepo.createCategory(createCategoryDto)
    }
}

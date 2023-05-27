import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategoryService {

    constructor(
        private readonly categoryRepo : CategoryRepository
    ) {}

    async createCategory(createCategoryDto : CreateCategoryDto) {
        return await this.categoryRepo.createCategory(createCategoryDto)
    }

    async getAllCategory() {
        return await this.categoryRepo.getAllCategory()
    }
}

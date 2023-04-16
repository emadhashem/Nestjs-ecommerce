import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dtos/createCategory.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Public()
    @UsePipes(ValidationPipe)
    @Post('create')
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.create(createCategoryDto)
    }
}

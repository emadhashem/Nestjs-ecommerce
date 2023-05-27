import { Body, Controller, Get, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Request } from 'express';
import { AdminRoleGuard } from 'src/user/adminRole.Guard';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Controller('category')
export class CategoryController {

    constructor(
        private readonly categoryService : CategoryService
    ){}

    @Post('/create-category')
    @UseGuards(AdminRoleGuard)
    @UsePipes(ValidationPipe)
    async createCategory(@Body() createCategoryDto : CreateCategoryDto) {
        await this.categoryService.createCategory(createCategoryDto)
        return {message : 'success'}
    }

    @Get('/get-all-category')
    async getAllcategory() {
        return await this.categoryService.getAllCategory()
    }
}

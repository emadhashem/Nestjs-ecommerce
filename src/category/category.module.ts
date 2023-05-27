import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/entities/category/category.entity';
import { CategoryRepository } from './category.repository';
import { ADMIN_ROLE_GUARD, AdminRoleGuard } from 'src/user/adminRole.Guard';

@Module({
  imports : [TypeOrmModule.forFeature([Category])],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository, {
    provide : ADMIN_ROLE_GUARD,
    useClass : AdminRoleGuard
  }]
})
export class CategoryModule {}

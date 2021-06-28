import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import Category from '../entities/category.entity';
import { CategoryService } from '../services/category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('ADMIN')
  async create(
    @Body()
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  async index(): Promise<Category[]> {
    return this.categoryService.getAll();
  }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import Category from '../entities/category.entity';
import { CategoryService } from '../services/category.service';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Post()
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

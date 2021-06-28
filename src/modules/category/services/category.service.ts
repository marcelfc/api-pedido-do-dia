import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import Category from '../entities/category.entity';
import { CategoriesRepository } from '../repositories/categories.repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoriesRepository)
    private categoriesRepository: CategoriesRepository,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.createAndSave(createCategoryDto);
  }

  async getAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }
}

import { EntityRepository, Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import Category from '../entities/category.entity';

@EntityRepository(Category)
export class CategoriesRepository extends Repository<Category> {
  async createAndSave(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.create({
      ...createCategoryDto,
    });

    await this.save(newCategory);

    return newCategory;
  }
}

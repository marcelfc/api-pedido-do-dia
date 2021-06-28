import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from '../../src/modules/category/services/category.service';
import * as ormconfig from '../../src/config/ormconfig';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import Category from '../../src/modules/category/entities/category.entity';
import { CategoryModule } from '../../src/modules/category/category.module';
import { CategoriesRepository } from '../../src/modules/category/repositories/categories.repository';
import { CreateCategoryDto } from '../../src/modules/category/dtos/create-category.dto';

initialiseTestTransactions();

describe('CategoryService', () => {
  let service: CategoryService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), CategoryModule],
      providers: [
        {
          provide: getRepositoryToken(Category),
          useValue: new CategoriesRepository(),
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it(
    'should be able to create a new Category',
    runInTransaction(async () => {
      const createCategoryDto: CreateCategoryDto = {
        category: 'Pizza',
      };

      const result = await service.create(createCategoryDto);

      expect(result).toEqual({
        id: expect.any(String),
        category: 'Pizza',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    }),
  );

  it(
    'should be able to list all categories',
    runInTransaction(async () => {
      const result = await service.getAll();

      expect(result).toHaveLength(2);
    }),
  );
});

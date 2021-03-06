import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import { CreateCategoryDto } from '../../src/modules/category/dtos/create-category.dto';

initialiseTestTransactions();

describe('Category EndPoints', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  test(
    'Create a new Category',
    runInTransaction(async () => {
      // login
      const credentials = {
        email: 'admin@admin.com',
        password: '12345678',
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(credentials);

      const { token } = loginResponse.body;

      const createCategoryDto: CreateCategoryDto = {
        category: 'Pizza',
      };

      await request(app.getHttpServer())
        .post('/category')
        .set('Authorization', `Bearer ${token}`)
        .send(createCategoryDto)
        .expect(201);
    }),
  );

  test(
    'Return all categories',
    runInTransaction(async () => {
      const response = await request(app.getHttpServer())
        .get('/category')
        .expect(200);

      expect(response.body).toHaveLength(2);
    }),
  );
});

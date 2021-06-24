import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import { CreateTypeServiceDto } from '../../src/modules/type-service/dtos/create-type-service.dto';

initialiseTestTransactions();

describe('Form Payment EndPoints', () => {
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
    'Create a new Form Payment',
    runInTransaction(async () => {
      const createTypeServiceDto: CreateTypeServiceDto = {
        type_service: 'Delivery',
        delivery: true,
      };

      await request(app.getHttpServer())
        .post('/type-service')
        .send(createTypeServiceDto)
        .expect(201);
    }),
  );

  test(
    'Return all forms payment',
    runInTransaction(async () => {
      const response = await request(app.getHttpServer())
        .get('/type-service')
        .expect(200);

      expect(response.body).toHaveLength(2);
    }),
  );
});

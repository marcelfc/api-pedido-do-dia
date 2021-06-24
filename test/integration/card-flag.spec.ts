import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import { CreateCardFlagDto } from '../../src/modules/card-flag/dtos/create-card-flag.dto';

initialiseTestTransactions();

describe('Unit Measure EndPoints', () => {
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
    'Create a new Unit measure',
    runInTransaction(async () => {
      const createCardFlagDto: CreateCardFlagDto = {
        card_flag: 'American Express',
      };

      await request(app.getHttpServer())
        .post('/card-flag')
        .send(createCardFlagDto)
        .expect(201);
    }),
  );

  test(
    'Return all units measure',
    runInTransaction(async () => {
      const response = await request(app.getHttpServer())
        .get('/card-flag')
        .expect(200);

      expect(response.body).toHaveLength(2);
    }),
  );
});

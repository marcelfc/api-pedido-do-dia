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

describe('Card Flag EndPoints', () => {
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
    'Create a new Card Flag',
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

      const createCardFlagDto: CreateCardFlagDto = {
        card_flag: 'American Express',
      };

      await request(app.getHttpServer())
        .post('/card-flag')
        .set('Authorization', `Bearer ${token}`)
        .send(createCardFlagDto)
        .expect(201);
    }),
  );

  test(
    'Return all card flags',
    runInTransaction(async () => {
      const response = await request(app.getHttpServer())
        .get('/card-flag')
        .expect(200);

      expect(response.body).toHaveLength(2);
    }),
  );
});

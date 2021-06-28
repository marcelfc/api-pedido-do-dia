import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import { CreateFormPaymentDto } from '../../src/modules/form-payment/dtos/create-form-payment.dto';

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
      // login
      const credentials = {
        email: 'admin@admin.com',
        password: '12345678',
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(credentials);

      const { token } = loginResponse.body;

      const createFormPaymentDto: CreateFormPaymentDto = {
        form_payment: 'Credit Card',
        credit: true,
        debit: false,
      };

      await request(app.getHttpServer())
        .post('/form-payment')
        .set('Authorization', `Bearer ${token}`)
        .send(createFormPaymentDto)
        .expect(201);
    }),
  );

  test(
    'Return all forms payment',
    runInTransaction(async () => {
      const response = await request(app.getHttpServer())
        .get('/form-payment')
        .expect(200);

      expect(response.body).toHaveLength(2);
    }),
  );
});

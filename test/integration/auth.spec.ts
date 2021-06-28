import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import { IUserLogin } from '../../src/modules/auth/interfaces/user-login.interface';
import { UserRole } from '../../src/modules/user/entities/user.entity';

initialiseTestTransactions();

describe('Auth EndPoints', () => {
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
    'Login with valid credentials',
    runInTransaction(async () => {
      const userLogin: IUserLogin = {
        email: 'user@user.com',
        password: '12345678',
      };

      const response = await request(app.getHttpServer())
        .post('/auth/login')
        .send(userLogin)
        .expect(200);

      expect(response.body).toEqual({
        user: {
          role: UserRole.BASIC,
          email: 'user@user.com',
          id: expect.any(String),
        },
        token: expect.any(String),
      });
    }),
  );

  test(
    'Return erro while Login with invalid credentials',
    runInTransaction(async () => {
      const userLogin: IUserLogin = {
        email: 'user-invalid@user.com',
        password: '12345678',
      };

      await request(app.getHttpServer())
        .post('/auth/login')
        .send(userLogin)
        .expect(401);
    }),
  );
});

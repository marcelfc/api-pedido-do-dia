import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import { CreateUserDto } from '../../src/modules/user/dtos/create-user.dto';

initialiseTestTransactions();

describe('User EndPoints', () => {
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
    'Create a new user',
    runInTransaction(async () => {
      const createUserDto: CreateUserDto = {
        name: 'Joe Gomes',
        email: 'joe_gomes@gmail.com',
        password: '12345678',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto)
        .expect(201);
    }),
  );

  test(
    'Not should be able to create a user with e-mail already existing',
    runInTransaction(async () => {
      const createUserDto: CreateUserDto = {
        name: 'Albert Moraes',
        email: 'user@user.com',
        password: '12345678',
      };

      await request(app.getHttpServer())
        .post('/user')
        .send(createUserDto)
        .expect(400);
    }),
  );
});

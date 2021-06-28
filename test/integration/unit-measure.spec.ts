import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import { CreateUnitMeasureDto } from '../../src/modules/unit-measure/dtos/create-unit-measure.dto';

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
      // login
      const credentials = {
        email: 'admin@admin.com',
        password: '12345678',
      };

      const loginResponse = await request(app.getHttpServer())
        .post('/auth/login')
        .send(credentials);

      const { token } = loginResponse.body;

      const createUnitMeasureDto: CreateUnitMeasureDto = {
        unit: 'Unidade',
        abbreviation: 'Und',
      };

      await request(app.getHttpServer())
        .post('/unit-measure')
        .set('Authorization', `Bearer ${token}`)
        .send(createUnitMeasureDto)
        .expect(201);
    }),
  );

  test(
    'Return all units measure',
    runInTransaction(async () => {
      const response = await request(app.getHttpServer())
        .get('/unit-measure')
        .expect(200);

      expect(response.body).toHaveLength(2);
    }),
  );
});

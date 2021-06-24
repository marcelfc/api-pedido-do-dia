import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { TypeServiceService } from '../../src/modules/type-service/services/type-service.service';
import * as ormconfig from '../../src/config/ormconfig';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import TypeService from '../../src/modules/type-service/entities/type-service.entity';
import { TypeServiceModule } from '../../src/modules/type-service/type-service.module';
import { TypeServicesRepository } from '../../src/modules/type-service/repositories/type-services.repository';
import { CreateTypeServiceDto } from '../../src/modules/type-service/dtos/create-type-service.dto';

initialiseTestTransactions();

describe('TypeServiceService', () => {
  let service: TypeServiceService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), TypeServiceModule],
      providers: [
        {
          provide: getRepositoryToken(TypeService),
          useValue: new TypeServicesRepository(),
        },
      ],
    }).compile();

    service = module.get<TypeServiceService>(TypeServiceService);
  });

  it(
    'should be able to create a new Type Service',
    runInTransaction(async () => {
      const createTypeServiceDto: CreateTypeServiceDto = {
        type_service: 'Delivery',
        delivery: true,
      };

      const result = await service.create(createTypeServiceDto);

      expect(result).toEqual({
        id: expect.any(String),
        type_service: 'Delivery',
        delivery: true,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    }),
  );

  it(
    'should be able to list all types services',
    runInTransaction(async () => {
      const result = await service.getAll();

      expect(result).toHaveLength(2);
    }),
  );
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UnitMeasureService } from './unit-measure.service';
import * as ormconfig from '../../../config/ormconfig';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import UnitMeasure from '../entities/unit-measure.entity';
import { UnitMeasureModule } from '../unit-measure.module';
import { UnitsMeasureRepository } from '../repositories/units-measure.repository';
import { CreateUnitMeasureDto } from '../dtos/create-unit-measure.dto';

initialiseTestTransactions();

describe('UnitMeasureService', () => {
  let service: UnitMeasureService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), UnitMeasureModule],
      providers: [
        {
          provide: getRepositoryToken(UnitMeasure),
          useValue: new UnitsMeasureRepository(),
        },
      ],
    }).compile();

    service = module.get<UnitMeasureService>(UnitMeasureService);
  });

  it(
    'should be able to create a new Unit Measure',
    runInTransaction(async () => {
      const createUnitMeasureDto: CreateUnitMeasureDto = {
        unit: 'Unidade',
        abbreviation: 'Und',
      };

      const result = await service.create(createUnitMeasureDto);

      expect(result).toEqual({
        id: expect.any(String),
        unit: 'Unidade',
        abbreviation: 'Und',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    }),
  );

  it(
    'should be able to create a new Unit Measure',
    runInTransaction(async () => {
      const result = await service.getAll();

      expect(result).toHaveLength(2);
    }),
  );
});

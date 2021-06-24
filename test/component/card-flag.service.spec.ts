import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CardFlagService } from '../../src/modules/card-flag/services/card-flag.service';
import * as ormconfig from '../../src/config/ormconfig';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import CardFlag from '../../src/modules/card-flag/entities/card-flag.entity';
import { CardFlagModule } from '../../src/modules/card-flag/card-flag.module';
import { CardFlagsRepository } from '../../src/modules/card-flag/repositories/card-flags.repository';
import { CreateCardFlagDto } from '../../src/modules/card-flag/dtos/create-card-flag.dto';

initialiseTestTransactions();

describe('CardFlagService', () => {
  let service: CardFlagService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), CardFlagModule],
      providers: [
        {
          provide: getRepositoryToken(CardFlag),
          useValue: new CardFlagsRepository(),
        },
      ],
    }).compile();

    service = module.get<CardFlagService>(CardFlagService);
  });

  it(
    'should be able to create a new Unit Measure',
    runInTransaction(async () => {
      const createCardFlagDto: CreateCardFlagDto = {
        card_flag: 'American Express',
      };

      const result = await service.create(createCardFlagDto);

      expect(result).toEqual({
        id: expect.any(String),
        card_flag: 'American Express',
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    }),
  );

  it(
    'should be able to list all cards flags',
    runInTransaction(async () => {
      const result = await service.getAll();

      expect(result).toHaveLength(2);
    }),
  );
});

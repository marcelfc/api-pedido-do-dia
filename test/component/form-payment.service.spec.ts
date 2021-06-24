import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { FormPaymentService } from '../../src/modules/form-payment/services/form-payment.service';
import * as ormconfig from '../../src/config/ormconfig';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import FormPayment from '../../src/modules/form-payment/entities/form-payment.entity';
import { FormPaymentModule } from '../../src/modules/form-payment/form-payment.module';
import { FormPaymentsRepository } from '../../src/modules/form-payment/repositories/form-payments.repository';
import { CreateFormPaymentDto } from '../../src/modules/form-payment/dtos/create-form-payment.dto';

initialiseTestTransactions();

describe('FormPaymentService', () => {
  let service: FormPaymentService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), FormPaymentModule],
      providers: [
        {
          provide: getRepositoryToken(FormPayment),
          useValue: new FormPaymentsRepository(),
        },
      ],
    }).compile();

    service = module.get<FormPaymentService>(FormPaymentService);
  });

  it(
    'should be able to create a new Form Payment with credit true',
    runInTransaction(async () => {
      const createFormPaymentDto: CreateFormPaymentDto = {
        form_payment: 'Credit Card',
        credit: true,
        debit: false,
      };

      const result = await service.create(createFormPaymentDto);

      expect(result).toEqual({
        id: expect.any(String),
        form_payment: 'Credit Card',
        credit: true,
        debit: false,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    }),
  );

  it(
    'should be able to create a new Form Payment with debit true',
    runInTransaction(async () => {
      const createFormPaymentDto: CreateFormPaymentDto = {
        form_payment: 'Debit Card',
        debit: true,
        credit: false,
      };

      const result = await service.create(createFormPaymentDto);

      expect(result).toEqual({
        id: expect.any(String),
        form_payment: 'Debit Card',
        credit: false,
        debit: true,
        created_at: expect.any(Date),
        updated_at: expect.any(Date),
      });
    }),
  );

  it(
    'should be able to list all payments form',
    runInTransaction(async () => {
      const result = await service.getAll();

      expect(result).toHaveLength(2);
    }),
  );
});

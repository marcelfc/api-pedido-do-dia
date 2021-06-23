import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import * as ormconfig from '../../../config/ormconfig';
import { AuthModule } from '../auth.module';
import {
  runInTransaction,
  initialiseTestTransactions,
} from 'typeorm-test-transactions';
import { IUserLogin } from '../interfaces/user-login.interface';
import { UserRole } from '../../user/entities/user.entity';

initialiseTestTransactions();

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), AuthModule],
      providers: [],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it(
    'should be able to login a new User',
    runInTransaction(async () => {
      const userLogin: IUserLogin = {
        email: 'user@user.com',
        password: '12345678',
      };

      const result = await service.login(userLogin);

      expect(result).toEqual({
        user: {
          role: UserRole.BASIC,
          email: 'user@user.com',
          id: expect.any(String),
        },
        token: expect.any(String),
      });
    }),
  );

  it(
    'not should be able to login with invalid e-mail',
    runInTransaction(async () => {
      const userLogin: IUserLogin = {
        email: 'user-invalid@user.com',
        password: '12345678',
      };

      return expect(service.login(userLogin)).rejects.toThrow(
        'Invalid credentials',
      );
    }),
  );

  it(
    'not should be able to login with invalid password',
    runInTransaction(async () => {
      const userLogin: IUserLogin = {
        email: 'user@user.com',
        password: 'invalid-password',
      };

      return expect(service.login(userLogin)).rejects.toThrow(
        'Invalid credentials',
      );
    }),
  );
});

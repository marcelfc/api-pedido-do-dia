import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import * as ormconfig from '../../config/ormconfig';
import { AuthModule } from '../auth.module';
import { UserModule } from '../../user/user.module';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../user/services/user.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig)],
      providers: [AuthService, JwtService, UserService],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import * as ormconfig from '../../config/ormconfig';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UsersRepository } from '../repositories/users.repository';
import { User, UserRole } from '../entities/user.entity';
import { UserModule } from '../user.module';

describe('UserService', () => {
  let service: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), UserModule],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: new UsersRepository(),
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be able to create a new User', async () => {
    const createUserDto: CreateUserDto = {
      name: 'Joe Gomes',
      email: 'joe_gomes@gmail.com',
      password: '12345678',
    };

    const result = await service.createUser(createUserDto);

    expect(result).toEqual({
      id: expect.any(String),
      name: 'Joe Gomes',
      email: 'joe_gomes@gmail.com',
      password: expect.any(String),
      created_at: expect.any(Date),
      updated_at: expect.any(Date),
      role: UserRole.BASIC,
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth.module';
import { UserService } from './user.service';
import * as ormconfig from '../../config/ormconfig';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormconfig), AuthModule],
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

    expect(result).resolves.toMatchObject({
      id: expect.any(Number),
      name: 'Joe Gomes',
      email: 'joe_gomes@gmail.com',
      password: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });
});

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User, UserRole } from '../entities/user.entity';
import { UsersRepository } from '../repositories/users.repository';
import { hash, genSalt } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: UsersRepository,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password, role } = createUserDto;

    const emailInUse = await this.usersRepository.findByEmail(email);

    if (emailInUse) {
      throw new BadRequestException('E-mail already in use.');
    }

    const salt = await genSalt(8);

    const hashPassword = await hash(password, salt);

    return this.usersRepository.createAndSave({
      name,
      email,
      role: role ?? UserRole.BASIC,
      password: hashPassword,
    });
  }
}

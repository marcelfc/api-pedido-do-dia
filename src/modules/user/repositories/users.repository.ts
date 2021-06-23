import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createAndSave(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.create({
      ...createUserDto,
    });

    await this.save(newUser);

    return newUser;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.findOne({ email });
  }
}

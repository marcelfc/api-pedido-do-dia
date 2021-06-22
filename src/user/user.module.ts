import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UsersRepository } from './repositories/users.repository';
import { UserService } from './services/user.service';
@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}

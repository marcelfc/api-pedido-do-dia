import { ValidationPipe } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { Validate } from 'class-validator';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}

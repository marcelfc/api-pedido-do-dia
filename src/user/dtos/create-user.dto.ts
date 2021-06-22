import { IsEmail, IsString, MinLength, Matches, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  name: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsEnum(UserRole)
  role?: UserRole;
}

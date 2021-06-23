import { Body, Controller, Post } from '@nestjs/common';
import { IUserLoginResponse } from '../interfaces/user-login-response';
import { IUserLogin } from '../interfaces/user-login.interface';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userLogin: IUserLogin): Promise<IUserLoginResponse> {
    return this.authService.login(userLogin);
  }
}

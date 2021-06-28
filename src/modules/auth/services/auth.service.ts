import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/services/user.service';
import { IUserLogin } from '../interfaces/user-login.interface';
import { compare } from 'bcrypt';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { IUserLoginResponse } from '../interfaces/user-login-response';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login({ email, password }: IUserLogin): Promise<IUserLoginResponse> {
    const existsUser = await this.userService.findUserByEmail(email);

    if (!existsUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (await compare(password, existsUser.password)) {
      const payload: IJwtPayload = {
        email: existsUser.email,
        id: existsUser.id,
        role: existsUser.role,
      };

      const token: string = this.jwtService.sign(payload);

      return {
        user: payload,
        token,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async getUserRoleByToken(token: string): Promise<string> {
    const payload = await this.jwtService.verify(token);

    console.log(payload);

    return 'payload';
  }
}

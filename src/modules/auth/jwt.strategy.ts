import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from '../user/services/user.service';
import { User } from '../user/entities/user.entity';
import { IUserLogin } from './interfaces/user-login.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: IUserLogin): Promise<void> {
    const { email, password } = payload;
    // const user: User = await this.usersRepository.findOne({ email });

    // if (!user) {
    //   throw new UnauthorizedException();
    // }

    // return user;
  }
}

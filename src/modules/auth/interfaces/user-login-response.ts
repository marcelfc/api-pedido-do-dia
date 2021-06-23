import { UserRole } from '../../../modules/user/entities/user.entity';

export interface IUserLoginResponse {
  user: {
    email: string;
    id: string;
    role: UserRole;
  };
  token: string;
}

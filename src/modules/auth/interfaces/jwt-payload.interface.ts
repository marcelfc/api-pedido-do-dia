import { UserRole } from '../../../modules/user/entities/user.entity';

export interface IJwtPayload {
  email: string;
  id: string;
  role: UserRole;
}

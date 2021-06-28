import { SetMetadata } from '@nestjs/common';

type AuthRoles = 'ADMIN' | 'BASIC';

export const Roles = (...roles: AuthRoles[]) => SetMetadata('roles', roles);

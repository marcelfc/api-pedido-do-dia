import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): void => {
    const request = ctx.switchToHttp().getRequest();

    const [_, token] = request.headers.authorization.split(' ');
  },
);

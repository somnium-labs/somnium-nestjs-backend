import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const CtxUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);

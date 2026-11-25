import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
export const CurrentUserId = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log(request.user);
    return {
      id: request.user.sub,
    };
  },
);

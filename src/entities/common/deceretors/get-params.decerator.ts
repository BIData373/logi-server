import { createParamDecorator } from "@nestjs/common";
import type { ExecutionContext } from "@nestjs/common";
export const GetParamsDecerator = createParamDecorator(
  (name: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const param = { id: Number(request.params[name]) };
    return param;
  },
);

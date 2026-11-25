import { applyDecorators, type Type } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { TransformPlainToInstance } from "class-transformer";

export function ToSwaggerAndInstace<T>(
  object: Type<T>,
  isArray: boolean = false,
) {
  return applyDecorators(
    TransformPlainToInstance(object),
    ApiOkResponse({ type: object, isArray }),
  );
}

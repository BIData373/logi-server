import { applyDecorators, type Type } from "@nestjs/common";
import {
  ApiOkResponse,
  ApiProperty,
  type ApiPropertyOptions,
  type ApiResponseOptions,
} from "@nestjs/swagger";
import {
  Expose,
  TransformPlainToInstance,
  type ClassTransformOptions,
} from "class-transformer";

export function ToSwaggerAndInstace<T>(
  object: Type<T>,
  isArray: boolean = false,
) {
  console.log(object, isArray);
  return applyDecorators(
    TransformPlainToInstance(object),
    ApiOkResponse({ type: object, isArray }),
  );
}

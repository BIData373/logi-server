import { Injectable } from "@nestjs/common";
import {
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from "class-validator";
import { PrismaService } from "../../../prisma.service.js";
import { type ModelName } from "../types/model-name.type.js";
import { GetContextDto } from "../dto/request/get-context.dto.js";
import type { Relations } from "../types/relation-name.type.js";
type ModelAccessor = {
  first(filter: { id: number }): Promise<unknown | null>;
  include(object: string): ModelAccessor;
};
@ValidatorConstraint({ async: true })
@Injectable()
export class entityExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}
  async validate(id: number, validationArguments?: ValidationArguments) {
    if (typeof id != "number") return false;
    const [entityClass, includes] = validationArguments?.constraints as [
      ModelName,
      ModelName[],
    ];
    const orm = this.prisma.orm[entityClass] as unknown as ModelAccessor;
    let query = orm;
    for (const relation of includes ?? []) {
      query = query.include(relation);
    }
    const entity = await query.first({
      id,
    });
    if (entity) {
      if (validationArguments?.object instanceof GetContextDto)
        (validationArguments?.object as GetContextDto).context = entity;
      return true;
    } else {
      return false;
    }
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `one or more of the Entities (${validationArguments?.value}) does not exist`;
  }
}

export function EntityExist<T extends ModelName>(
  entityClass: T,
  options?: ValidationOptions,
  includes?: Relations<T>[],
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      constraints: [entityClass, includes],
      validator: entityExistsConstraint,
    });
  };
}

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

@ValidatorConstraint({ async: true })
@Injectable()
export class entityExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}
  async validate(id: number, validationArguments?: ValidationArguments) {
    const orm = this.prisma.orm as any;
    const [entityClass] = validationArguments?.constraints as any;

    const entity = await orm[entityClass].where({ id }).first();
    (validationArguments?.object as any).foundEntitiy = entity;

    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return "entity not exsist";
  }
}

export function EntityExist(
  entityClass: keyof ModelName,
  options?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      constraints: [entityClass],
      validator: entityExistsConstraint,
    });
  };
}

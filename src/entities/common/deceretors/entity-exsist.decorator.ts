import { Inject, Injectable } from "@nestjs/common";
import type { Contract } from "@prisma/orm-postgres/contract/types";
import {
  registerDecorator,
  type ValidationOptions,
  type ValidationArguments,
  ValidatorConstraint,
  type ValidatorConstraintInterface,
} from "class-validator";
import { PrismaService } from "../../../prisma.service.js";

@ValidatorConstraint({ async: true })
@Injectable()
export class entityExistsConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}
  async validate(id: number, validationArguments?: ValidationArguments) {
    const orm = this.prisma.orm as any;
    console.log(validationArguments?.constraints);
    const [entityClass] = validationArguments?.constraints as any;
    console.log(orm[String(entityClass)]);
    const entity = await orm[entityClass].where({ id }).first();
    console.log(entity);
    return entity;
  }
  defaultMessage(validationArguments?: ValidationArguments): string {
    return "user not exsist";
  }
}

export function EntityExist(entityClass: any, options?: ValidationOptions) {
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

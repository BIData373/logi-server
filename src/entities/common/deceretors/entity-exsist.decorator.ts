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
type ModelAccessor = { first(filter: { id: number }): Promise<unknown | null> };
@ValidatorConstraint({ async: true })
@Injectable()
export class entityExistsConstraint implements ValidatorConstraintInterface {
  private badValue: number[] = [];
  constructor(private readonly prisma: PrismaService) {}
  async validate(id: number, validationArguments?: ValidationArguments) {
    if (typeof id != "number") return false;
    const [entityClass] = validationArguments?.constraints as [ModelName];
    const orm = this.prisma.orm[entityClass] as unknown as ModelAccessor;
    const entity = await orm.first({
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

export function EntityExist(
  entityClass: ModelName,
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

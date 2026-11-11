import { Type } from "class-transformer";
import { IsEmail, IsNegative, IsString } from "class-validator";
import { EntityExist } from "../../common/deceretors/entity-exsist.decorator.js";
import { models } from "../../../prisma/contract";

export class GetProductDto {
  @Type(() => Number)
  @EntityExist("Products")
  id: number;

  foundEntitiy: any;
}

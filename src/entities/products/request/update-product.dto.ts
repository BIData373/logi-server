import { Type } from "class-transformer";
import { IsEmail, IsNegative, IsString } from "class-validator";
import { EntityExist } from "../../common/deceretors/entity-exsist.decorator.js";

export class UpdateProductDto {
  @EntityExist("Products")
  id: number;
}

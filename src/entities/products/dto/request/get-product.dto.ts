import { Type } from "class-transformer";
import { IsPositive } from "class-validator";
import { EntityExist } from "../../../common/deceretors/entity-exsist.decorator.js";
import { GetContextDto } from "../../../common/dto/request/get-context.dto.js";

export class GetProductDto extends GetContextDto {
  @Type(() => Number)
  @IsPositive()
  @EntityExist("Product")
  id: number;
}

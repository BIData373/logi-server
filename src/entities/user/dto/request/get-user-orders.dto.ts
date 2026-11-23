import { Type } from "class-transformer";
import { GetContextDto } from "../../../common/dto/request/get-context.dto.js";
import { IsPositive } from "class-validator";
import { EntityExist } from "../../../common/deceretors/entity-exsist.decorator.js";

export class GetUserOrdersDto extends GetContextDto {
  @Type(() => Number)
  @IsPositive()
  @EntityExist("User", {}, ["orders"])
  id: number;
}

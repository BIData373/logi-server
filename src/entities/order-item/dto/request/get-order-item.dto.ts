import { Type } from "class-transformer";
import { IsPositive } from "class-validator";
import { EntityExist } from "../../../common/decorators/entity-exsist.decorator.js";
import { GetContextDto } from "../../../common/dto/request/get-context.dto.js";

export class GetOrderItemDto extends GetContextDto {
  @Type(() => Number)
  @IsPositive()
  @EntityExist("OrderItem", {}, ["variant"])
  id: number;
}

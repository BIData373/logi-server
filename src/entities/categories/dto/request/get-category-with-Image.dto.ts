import { Type } from "class-transformer";
import { IsPositive } from "class-validator";
import { GetContextDto } from "../../../common/dto/request/get-context.dto.js";
import { EntityExist } from "../../../common/decorators/entity-exsist.decorator.js";

export class GetCategoryWithImageDto extends GetContextDto {
  @Type(() => Number)
  @IsPositive()
  @EntityExist("Category", {}, ["image"])
  id: number;
}

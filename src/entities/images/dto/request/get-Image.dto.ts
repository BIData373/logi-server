import { Type } from "class-transformer";
import { IsPositive } from "class-validator";
import { GetContextDto } from "../../../common/dto/request/get-context.dto.js";
import { EntityExist } from "../../../common/deceretors/entity-exsist.decorator.js";

export class GetImageDto extends GetContextDto {
  @Type(() => Number)
  @IsPositive()
  @EntityExist("Image")
  id: number;
}

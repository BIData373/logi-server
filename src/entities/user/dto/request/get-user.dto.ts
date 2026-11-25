import { Type } from "class-transformer";
import { IsPositive } from "class-validator";
import { GetContextDto } from "../../../common/dto/request/get-context.dto.js";
import { EntityExist } from "../../../common/decorators/entity-exsist.decorator.js";

export class GetUserDto extends GetContextDto {
  @Type(() => Number)
  @IsPositive()
  @EntityExist("User")
  id: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCartItemDto {
  @ApiProperty()
  @IsString()
  quantity: number;
}

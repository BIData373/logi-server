import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateOrderItemDto {
  @ApiProperty()
  @IsString()
  quantity: number;
}

import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateOrderItemDto {
  @ApiProperty()
  @IsNumber()
  quantity: number;
}

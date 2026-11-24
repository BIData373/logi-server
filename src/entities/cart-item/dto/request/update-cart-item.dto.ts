import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateCartItemDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status: string;
}

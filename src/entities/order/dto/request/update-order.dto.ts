import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";

export class UpdateOrderDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  estimatedDate: Date;
}

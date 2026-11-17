import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsOptional, IsString } from "class-validator";
import { transformToIdArr } from "../../common/functions/transform-arrey.js";

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  discrption: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsOptional()
  @Transform(transformToIdArr)
  imagesToDelete: { id: number }[];

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsOptional()
  @Transform(transformToIdArr)
  imagesToAdd: { id: number }[];
}

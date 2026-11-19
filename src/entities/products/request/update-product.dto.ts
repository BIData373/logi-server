import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsOptional, IsPositive, IsString } from "class-validator";
import { EntityExist } from "../../common/deceretors/entity-exsist.decorator.js";

export class UpdateProductDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  @EntityExist("Image", { each: true })
  imagesToDelete: number[];

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  @EntityExist("Image", { each: true })
  imagesToAdd: number[];
}

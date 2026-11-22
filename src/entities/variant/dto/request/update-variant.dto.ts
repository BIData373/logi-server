import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { EntityExist } from "../../../common/deceretors/entity-exsist.decorator.js";
import { TransformToBoolean } from "../../../common/deceretors/transform-to-boolean.decorator.js";

export class UpdateVariantDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  sku: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsPositive()
  @EntityExist("Product")
  productId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @TransformToBoolean()
  @IsBoolean()
  isPrivate: boolean;
}

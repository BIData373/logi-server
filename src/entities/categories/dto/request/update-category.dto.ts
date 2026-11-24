import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from "class-validator";
import { TransformToBoolean } from "../../../common/decorators/transform-to-boolean.decorator.js";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EntityExist } from "../../../common/decorators/entity-exsist.decorator.js";

export class UpdateCategoryDto {
  @ApiProperty()
  @IsString()
  slug: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional({ type: Number })
  @EntityExist("Image")
  @IsPositive()
  imageId: number;
}

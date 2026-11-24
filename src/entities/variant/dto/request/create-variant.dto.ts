import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsPositive, IsString } from "class-validator";
import { EntityExist } from "../../../common/decorators/entity-exsist.decorator.js";
import { TransformToBoolean } from "../../../common/decorators/transform-to-boolean.decorator.js";

export class CreateVariantDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @TransformToBoolean()
  @IsBoolean()
  isPrivate: boolean;
}

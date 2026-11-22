import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsOptional, IsPositive, IsString } from "class-validator";
import { EntityExist } from "../../../common/deceretors/entity-exsist.decorator.js";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  @EntityExist("Image", { each: true })
  imagesToAdd: number[];
}

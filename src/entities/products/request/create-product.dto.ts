import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsPositive, IsString } from "class-validator";
import { EntityExist } from "../../common/deceretors/entity-exsist.decorator.js";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional({ type: Number, isArray: true })
  @IsArray()
  @IsPositive({ each: true })
  @EntityExist("Image", { each: true })
  imagesToAdd: number[];
}

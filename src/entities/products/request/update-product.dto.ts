import { Transform } from "class-transformer";
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";
import { EntityExist } from "../../common/deceretors/entity-exsist.decorator.js";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  @EntityExist("Image", { each: true })
  imagesToDelete: number[];

  @IsOptional()
  @IsArray()
  @IsPositive({ each: true })
  @EntityExist("Image", { each: true })
  imagesToAdd: number[];
}

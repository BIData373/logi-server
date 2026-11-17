import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from "class-validator";
import { TransformToBoolean } from "../../../common/deceretors/transform-to-boolean.decorator.js";
import { ApiProperty } from "@nestjs/swagger";

export class CreateImageDto {
  @ApiProperty()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @TransformToBoolean()
  @IsBoolean()
  isPrimary: boolean;
}

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

export class CreateImageDto {
  @IsUrl()
  url: string;

  @IsString()
  name: string;

  @TransformToBoolean()
  @IsBoolean()
  isPrimary: boolean;
}

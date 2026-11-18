import { Transform, Type } from "class-transformer";
import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from "class-validator";

export class CreateImageDto {
  @IsUrl()
  url: string;

  @IsString()
  name: string;

  @Transform((value) => {
    return Boolean(value);
  })
  @IsBoolean()
  isPrimary: boolean;
}

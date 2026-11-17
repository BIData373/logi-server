import { Type } from "class-transformer";
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

  @IsEmail()
  email: string;

  @IsBoolean()
  isPrimary: boolean;

  @Type(() => Number)
  @IsPositive()
  createdBy: number;

  @Type(() => Number)
  @IsPositive()
  productId: number;
}

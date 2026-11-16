import { IsBoolean, IsEmail, IsNumber, IsString, IsUrl } from "class-validator";

export class CreateImageDto {
  @IsUrl()
  url: string;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  isPrimary: boolean;

  @IsNumber()
  createdBy: number;

  @IsNumber()
  productId: number;
}

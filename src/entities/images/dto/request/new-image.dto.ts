import { IsBoolean, IsEmail, IsString } from "class-validator";

export class NewImageDto {
  @IsString()
  url: string;

  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  isPrimary: boolean;

  createdBy: number;
  productId: number;
}

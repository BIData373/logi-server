import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {
  @IsString()
  name: string;

  createdBy: number;

  @IsString()
  description: string;
}

import { IsNumber, IsString } from "class-validator";

export class NewProductDto {
  @IsString()
  name: string;

  createdBy: number;

  @IsString()
  discrption: string;
}

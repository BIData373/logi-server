import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { transformToIdArr } from "../../common/functions/transform-arrey.js";

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  discrption: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @Transform(transformToIdArr)
  imagesToDelete: { id: number }[];

  @IsOptional()
  @Transform(transformToIdArr)
  imagesToAdd: { id: number }[];
}

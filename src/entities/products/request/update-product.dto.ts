import { Transform } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";
import { EntityExist } from "../../common/deceretors/entity-exsist.decorator.js";

const transformToId = ({ value }: { value: number[] }) =>
  value.map((id) => ({ id }));

export class UpdateProductDto {
  @EntityExist("Products")
  id: number;

  @IsOptional()
  @IsString()
  discrption: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @Transform(transformToId)
  @IsArray()
  imagesToDelete: [];

  @IsOptional()
  @Transform(transformToId)
  @IsArray()
  imagesToAdd: [];

  foundEntitiy: any;
}

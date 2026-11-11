import { Exclude, Expose, Type } from "class-transformer";
import { GetImageResponseDto } from "../../images/dto/response/get-image.dto.js";

@Exclude()
export class GetProductResponseDto {
  @Expose()
  name: string;

  @Expose()
  createdBy: number;

  @Expose()
  discrption: string;

  @Expose()
  @Type(() => GetImageResponseDto)
  images: [];
}

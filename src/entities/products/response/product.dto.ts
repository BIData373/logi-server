import { Exclude, Expose, Type } from "class-transformer";
import { ImageDto } from "../../images/dto/response/image.dto.js";

@Exclude()
export class ProductDto {
  @Expose()
  name: string;

  @Expose()
  createdBy: number;

  @Expose()
  description: string;

  @Expose()
  @Type(() => ImageDto)
  images: ImageDto[];
}

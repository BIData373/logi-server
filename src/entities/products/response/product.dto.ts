import { Exclude, Expose, Type } from "class-transformer";
import { ExposeProperty } from "../../common/deceretors/expose-property.decorator.js";
import { ImageDto } from "../../images/dto/response/image.dto.js";

@Exclude()
export class ProductDto {
  @ExposeProperty()
  @Expose()
  name: string;

  @ExposeProperty()
  @Expose()
  createdBy: number;

  @ExposeProperty()
  @Expose()
  discrption: string;

  @ExposeProperty({ type: ImageDto, isArray: true })
  @Type(() => ImageDto)
  images: [];
}

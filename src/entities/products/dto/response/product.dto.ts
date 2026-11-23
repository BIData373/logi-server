import { Exclude, Expose, Type } from "class-transformer";
import { ExposeProperty } from "../../../common/deceretors/expose-property.decorator.js";
import { ImageDto } from "../../../images/dto/response/image.dto.js";
import { VariantDto } from "../../../variant/dto/response/variant.dto.js";

@Exclude()
export class ProductDto {
  @ExposeProperty()
  id: number;

  @ExposeProperty()
  name: string;

  @ExposeProperty()
  createdBy: number;

  @ExposeProperty()
  description: string;

  @ExposeProperty({ type: ImageDto, isArray: true })
  @Type(() => ImageDto)
  images: ImageDto[];

  @ExposeProperty({ type: VariantDto, isArray: true })
  @Type(() => VariantDto)
  variants: VariantDto[];
}

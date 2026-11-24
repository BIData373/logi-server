import { Exclude, Expose, Type } from "class-transformer";
import { ExposeProperty } from "../../../common/deceretors/expose-property.decorator.js";
import { ImageDto } from "../../../images/dto/response/image.dto.js";
import { VariantDto } from "../../../variant/dto/response/variant.dto.js";
import { ProductDto } from "./product.dto.js";

@Exclude()
export class ProductDtoWithVariant extends ProductDto {
  @ExposeProperty({ type: VariantDto, isArray: true })
  @Type(() => VariantDto)
  variants: VariantDto[];
}

import { Exclude, Type } from "class-transformer";
import { ExposeProperty } from "../../../common/decorators/expose-property.decorator.js";
import { ProductDto } from "../../../products/dto/response/product.dto.js";

@Exclude()
export class VariantDto {
  @ExposeProperty()
  id: number;

  @ExposeProperty()
  name: string;

  @ExposeProperty()
  createdBy: number;

  @ExposeProperty()
  description: string;

  @ExposeProperty()
  sku: string;

  @ExposeProperty()
  isPrivate: boolean;

  @ExposeProperty({ type: ProductDto })
  @Type(() => ProductDto)
  product: ProductDto;
}

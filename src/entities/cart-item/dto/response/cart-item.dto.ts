import { Exclude, Type } from "class-transformer";
import { ExposeProperty } from "../../../common/decorators/expose-property.decorator.js";
import { VariantDto } from "../../../variant/dto/response/variant.dto.js";

@Exclude()
export class CartItemDto {
  @ExposeProperty()
  id: number;

  @ExposeProperty()
  createdBy: number;

  @ExposeProperty()
  status: string;

  @ExposeProperty()
  deletedAt: Date;

  @ExposeProperty()
  createdAt: Date;

  @ExposeProperty()
  quantity: number;

  @ExposeProperty({ type: VariantDto })
  @Type(() => VariantDto)
  variant: VariantDto;
}

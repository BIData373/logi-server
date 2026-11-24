import { Exclude, Type } from "class-transformer";
import { ExposeProperty } from "../../../common/deceretors/expose-property.decorator.js";
import { VariantDto } from "../../../variant/dto/response/variant.dto.js";

@Exclude()
export class OrderItemDto {
  @ExposeProperty()
  id: number;

  @ExposeProperty()
  orderId: string;

  @ExposeProperty()
  createdBy: number;

  @ExposeProperty()
  estimatedDate: Date;

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

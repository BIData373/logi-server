import { Exclude, Type } from "class-transformer";
import { ExposeProperty } from "../../../common/deceretors/expose-property.decorator.js";
import { OrderItemDto } from "../../../order-item/dto/response/order-item.dto.js";

@Exclude()
export class OrderDto {
  @ExposeProperty()
  id: number;

  @ExposeProperty()
  createdBy: number;

  @ExposeProperty()
  estimatedDate: Date;

  @ExposeProperty()
  status: string;

  @ExposeProperty()
  createdAt: Date;

  @ExposeProperty()
  deletedAt: Date;

  @ExposeProperty({ type: OrderItemDto, isArray: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}

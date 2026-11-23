import { Exclude } from "class-transformer";
import { ExposeProperty } from "../../../common/deceretors/expose-property.decorator.js";

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
}

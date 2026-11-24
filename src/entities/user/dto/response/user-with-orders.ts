import { Exclude, Expose, Type } from "class-transformer";
import { ExposeProperty } from "../../../common/deceretors/expose-property.decorator.js";
import { UserDto } from "./user.dto.js";
import { OrderDto } from "../../../order/dto/response/order.dto.js";
@Exclude()
export class UserDtoWithOrders extends UserDto {
  @ExposeProperty({ type: OrderDto, isArray: true })
  @Type(() => OrderDto)
  orders: OrderDto[];
}

import { Type } from "class-transformer";
import { ExposeProperty } from "../../../common/decorators/expose-property.decorator";
import { UserDto } from "./user.dto";
import { CartItemDto } from "../../../cart-item/dto/response/cart-item.dto";

export class UserWithCartDto extends UserDto {
  @ExposeProperty({ type: CartItemDto, isArray: true })
  @Type(() => CartItemDto)
  cartItems: CartItemDto[];
}

import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam } from "@nestjs/swagger";
import { CartItemDto } from "../cart-item/dto/response/cart-item.dto.js";
import { ToSwaggerAndInstace } from "../common/decorators/to-swagger-and-instace.decorator.js";
import { OrderDto } from "../order/dto/response/order.dto.js";
import { CreateUserDto } from "./dto/request/create-user.dto.js";
import type { UserWithOrdersDto } from "./dto/response/user-with-orders.dto.js";
import { UserDto } from "./dto/response/user.dto.js";
import { UserService } from "./user.service.js";
import type { UserWithCartDto } from "./dto/response/user-with-cart.dto.js";

@Controller("users")
export class UserController {
  constructor(private readonly service: UserService) {}
  @Post()
  @ApiOperation({ operationId: "createUser" })
  @ApiBody({ type: CreateUserDto })
  @ToSwaggerAndInstace(UserDto)
  async createUser(@Body() user: CreateUserDto) {
    return await this.service.createUser(user);
  }

  @Get(":id/orders")
  @ApiOperation({ operationId: "getUserOrders" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(OrderDto, true)
  async getUserOrders(@Param("id") id: number) {
    const user = (await this.service.getUserOrdersById(
      id,
    )) as unknown as UserWithOrdersDto;
    return user.orders;
  }

  @Get(":id/cart")
  @ApiOperation({ operationId: "getUserCart" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(CartItemDto, true)
  async getUserCart(@Param("id") id: number) {
    const user = (await this.service.getUserCart(
      id,
    )) as unknown as UserWithCartDto;
    return user.cartItems;
  }
}

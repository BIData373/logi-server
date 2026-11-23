import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/request/create-user.dto.js";
import { UserService } from "./user.service.js";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { ToSwaggerAndInstace } from "../common/deceretors/to-swagger-and-instace.decorator.js";
import { UserDto } from "./dto/response/user.dto.js";
import { OrderDto } from "../order/dto/response/order.dto.js";
import { GetUserDto } from "./dto/request/get-user.dto.js";
import { GetUserOrdersDto } from "./dto/request/get-user-orders.dto.js";

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
  async getUserOrders(@Param() user: GetUserOrdersDto) {
    const context = await user.context;
    return context != null && "orders" in context ? context.orders : undefined;
  }
}

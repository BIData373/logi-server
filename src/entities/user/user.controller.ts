import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/request/create-user.dto.js";
import { UserService } from "./user.service.js";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { ToSwaggerAndInstace } from "../common/decorators/to-swagger-and-instace.decorator.js";
import { UserDto } from "./dto/response/user.dto.js";
import { OrderDto } from "../order/dto/response/order.dto.js";
import { GetUserDto } from "./dto/request/get-user.dto.js";
import { GetUserOrdersDto } from "./dto/request/get-user-orders.dto.js";
import type { UserDtoWithOrders } from "./dto/response/user-with-orders.dto.js";

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
    )) as unknown as UserDtoWithOrders;
    return user.orders;
  }
}

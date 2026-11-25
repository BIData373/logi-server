import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam } from "@nestjs/swagger";
import { OrderService } from "./order.service.js";
import { CreateOrderDto } from "./dto/request/create-order.dto.js";
import { ToSwaggerAndInstace } from "../common/decorators/to-swagger-and-instace.decorator.js";
import { OrderDto } from "./dto/response/order.dto.js";
import { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { GetParamsDecerator } from "../common/decorators/get-params.decorator.js";
import { GetOrderDto } from "./dto/request/get-order.dto.js";
import { UpdateOrderDto } from "./dto/request/update-order.dto.js";
import { CurrentUserId } from "../common/decorators/current-user-id.decorator.js";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  @ApiBody({ type: CreateOrderDto })
  @ApiOperation({ operationId: "createOrder" })
  @ToSwaggerAndInstace(OrderDto)
  async createOrder(
    @Body() order: CreateOrderDto,
    @CurrentUserId() user: GetUserDto,
  ) {
    return await this.orderService.createOrder(user.id);
  }

  @Get(":id")
  @ApiOperation({ operationId: "getOrderById" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(OrderDto)
  async getOrderById(@Param("id") id: number) {
    return await this.orderService.getOrderById(id);
  }

  @Patch("/:id")
  @ApiBody({ type: UpdateOrderDto })
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "updateOrder" })
  @ToSwaggerAndInstace(OrderDto)
  async updateOrder(
    @Param() order: GetOrderDto,
    @Body() newOrder: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrder(order.id, newOrder);
  }

  @Delete("/:id")
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "deleteOrder" })
  @ToSwaggerAndInstace(OrderDto)
  async deleteOrder(@Param() order: GetOrderDto) {
    return await this.orderService.deleteOrder(order.id);
  }
}

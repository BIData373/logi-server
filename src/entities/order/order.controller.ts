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
import { ToSwaggerAndInstace } from "../common/deceretors/to-swagger-and-instace.decorator.js";
import { OrderDto } from "./dto/response/order.dto.js";
import { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { GetParamsDecerator } from "../common/deceretors/get-params.decerator.js";
import { GetOrderDto } from "./dto/request/get-order.dto.js";
import { UpdateOrderDto } from "./dto/request/update-order.dto.js";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post(":userId")
  //   @ApiBody({ type: CreateOrderDto })
  @ApiOperation({ operationId: "createOrder" })
  @ApiParam({ name: "userId", type: Number })
  @ToSwaggerAndInstace(OrderDto)
  async createProduct(
    @Body() order: CreateOrderDto,
    @GetParamsDecerator("userId") user: GetUserDto,
  ) {
    return await this.orderService.createOrder(user.id);
  }

  @Get(":id")
  @ApiOperation({ operationId: "getOrderById" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(OrderDto)
  async getVariantById(@Param() order: GetOrderDto) {
    return order.context;
  }

  @Patch("/:id")
  @ApiBody({ type: UpdateOrderDto })
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "updateOrder" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(OrderDto)
  async updateVariant(
    @Param() order: GetOrderDto,
    @Body() newOrder: UpdateOrderDto,
  ) {
    return await this.orderService.updateOrder(order.id, newOrder);
  }

  @Delete("/:id")
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "deleteOrder" })
  @ToSwaggerAndInstace(OrderDto)
  async deleteVariant(@Param() order: GetOrderDto) {
    return await this.orderService.deleteOrder(order.id);
  }
}

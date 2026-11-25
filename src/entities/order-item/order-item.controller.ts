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
import { CreateOrderItemDto } from "./dto/request/create-order-item.dto.js";
import { ToSwaggerAndInstace } from "../common/decorators/to-swagger-and-instace.decorator.js";
import { OrderItemDto } from "./dto/response/order-item.dto.js";
import { GetParamsDecerator } from "../common/decorators/get-params.decorator.js";
import { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { GetOrderDto } from "../order/dto/request/get-order.dto.js";
import { OrderItemService } from "./order-item.service.js";
import { GetVariantDto } from "../variant/dto/request/get-variant.dto.js";
import { GetOrderItemDto } from "./dto/request/get-order-item.dto.js";
import { UpdateOrderItemDto } from "./dto/request/update-order-item.dto.js";
import { CurrentUserId } from "../common/decorators/current-user-id.decorator.js";

@Controller("order-items")
export class OrderItemController {
  constructor(private readonly orderItemService: OrderItemService) {}
  @Post("/:orderId/:variantId")
  @ApiBody({ type: CreateOrderItemDto })
  @ApiOperation({ operationId: "createOrderItem" })
  @ApiParam({ name: "variantId", type: Number })
  @ApiParam({ name: "orderId", type: Number })
  @ToSwaggerAndInstace(OrderItemDto)
  async createOrderItem(
    @Body() orderItem: CreateOrderItemDto,
    @CurrentUserId() user: GetUserDto,
    @GetParamsDecerator("variantId") variant: GetVariantDto,
    @GetParamsDecerator("orderId") order: GetOrderDto,
  ) {
    return await this.orderItemService.createOrderItem(
      orderItem,
      user.id,
      variant.id,
      order.id,
    );
  }

  @Get(":id")
  @ApiOperation({ operationId: "getOrderItemById" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(OrderItemDto)
  async getOrderItemById(@Param() orderItem: GetOrderItemDto) {
    return orderItem.context;
  }

  @Patch("/:id")
  @ApiBody({ type: UpdateOrderItemDto })
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "updateOrderItem" })
  @ToSwaggerAndInstace(OrderItemDto)
  async updateOrderItem(
    @Param() orderItem: GetOrderItemDto,
    @Body() newOrderItem: UpdateOrderItemDto,
  ) {
    return await this.orderItemService.updateOrderItem(
      orderItem.id,
      newOrderItem,
    );
  }

  @Delete("/:id")
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "deleteOrderItem" })
  @ToSwaggerAndInstace(OrderItemDto)
  async deleteOrderItem(@Param() orderItem: GetOrderItemDto) {
    return await this.orderItemService.deleteOrderItem(orderItem.id);
  }
}

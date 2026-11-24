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
import { ToSwaggerAndInstace } from "../common/deceretors/to-swagger-and-instace.decorator.js";
import { GetParamsDecerator } from "../common/deceretors/get-params.decerator.js";
import { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { GetVariantDto } from "../variant/dto/request/get-variant.dto.js";
import type { CartItemService } from "./cart-item.service.js";
import { CreateCartItemDto } from "./dto/request/create-cart-item.dto.js";
import { CartItemDto } from "./dto/response/cart-item.dto.js";
import type { GetCartItemDto } from "./dto/request/get-cart-item.dto.js";
import { UpdateCartItemDto } from "./dto/request/update-cart-item.dto.js";

@Controller("cart-items")
export class OrderItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post(":userId/:orderId/:variantId")
  @ApiBody({ type: CreateCartItemDto })
  @ApiOperation({ operationId: "createOrderItem" })
  @ApiParam({ name: "userId", type: Number })
  @ApiParam({ name: "variantId", type: Number })
  @ApiParam({ name: "orderId", type: Number })
  @ToSwaggerAndInstace(CartItemDto)
  async createProduct(
    @Body() cartItem: CreateCartItemDto,
    @GetParamsDecerator("userId") user: GetUserDto,
    @GetParamsDecerator("variantId") variant: GetVariantDto,
  ) {
    return await this.cartItemService.createOrderItem(
      cartItem,
      user.id,
      variant.id,
    );
  }

  @Get(":id")
  @ApiOperation({ operationId: "getCartItemById" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(CartItemDto)
  async getVariantById(@Param() id: number) {
    return this.cartItemService.getCartItemById(id);
  }

  @Patch("/:id")
  @ApiBody({ type: UpdateCartItemDto })
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "updateCartItem" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(CartItemDto)
  async updateVariant(
    @Param() cartItem: GetCartItemDto,
    @Body() newcartItem: UpdateCartItemDto,
  ) {
    return await this.cartItemService.updateCartItem(cartItem.id, newcartItem);
  }

  @Delete("/:id")
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "deleteCartItem" })
  @ToSwaggerAndInstace(CartItemDto)
  async deleteVariant(@Param() cartItem: GetCartItemDto) {
    return await this.cartItemService.deleteCartItem(cartItem.id);
  }
}

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
import { ToSwaggerAndInstace } from "../common/decorators/to-swagger-and-instace.decorator.js";
import { GetParamsDecerator } from "../common/decorators/get-params.decorator.js";
import { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { GetVariantDto } from "../variant/dto/request/get-variant.dto.js";
import { CartItemService } from "./cart-item.service.js";
import { CreateCartItemDto } from "./dto/request/create-cart-item.dto.js";
import { CartItemDto } from "./dto/response/cart-item.dto.js";
import { GetCartItemDto } from "./dto/request/get-cart-item.dto.js";
import { UpdateCartItemDto } from "./dto/request/update-cart-item.dto.js";
import { CurrentUserId } from "../common/decorators/current-user-id.decorator.js";

@Controller("cart-items")
export class CartItemController {
  constructor(private readonly cartItemService: CartItemService) {}

  @Post("/:variantId")
  @ApiBody({ type: CreateCartItemDto })
  @ApiOperation({ operationId: "createCartItem" })
  @ApiParam({ name: "variantId", type: Number })
  @ToSwaggerAndInstace(CartItemDto)
  async createCartItem(
    @Body() cartItem: CreateCartItemDto,
    @CurrentUserId() user: GetUserDto,
    @GetParamsDecerator("variantId") variant: GetVariantDto,
  ) {
    return await this.cartItemService.createCartItem(
      cartItem,
      user.id,
      variant.id,
    );
  }

  @Get(":id")
  @ApiOperation({ operationId: "getCartItemById" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(CartItemDto)
  async getCartItemById(@Param("id") id: number) {
    return await this.cartItemService.getCartItemById(id);
  }

  @Patch("/:id")
  @ApiBody({ type: UpdateCartItemDto })
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "updateCartItem" })
  @ToSwaggerAndInstace(CartItemDto)
  async updateCartItem(
    @Param() cartItem: GetCartItemDto,
    @Body() newCartItem: UpdateCartItemDto,
  ) {
    return await this.cartItemService.updateCartItem(cartItem.id, newCartItem);
  }

  @Delete("/:id")
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "deleteCartItem" })
  @ToSwaggerAndInstace(CartItemDto)
  async deleteCartItem(@Param() cartItem: GetCartItemDto) {
    return await this.cartItemService.deleteCartItem(cartItem.id);
  }
}

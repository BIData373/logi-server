import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import { CreateCartItemDto } from "./dto/request/create-cart-item.dto.js";
import { UpdateCartItemDto } from "./dto/request/update-cart-item.dto.js";

@Injectable()
export class CartItemService {
  constructor(private readonly prisma: PrismaService) {}

  async createCartItem(
    orderItem: CreateCartItemDto,
    createdBy: number,
    variantId: number,
  ) {
    return await this.prisma.orm.CartItem.create({
      ...orderItem,
      createdBy,
      variantId,
      status: "created",
    });
  }

  async updateCartItem(id: number, updates: UpdateCartItemDto) {
    const update = await this.prisma.orm.CartItem.where({ id }).update({
      ...updates,
      updatedAt: new Date(),
    });
    return update;
  }

  async getCartItemById(id: number) {
    return await this.prisma.orm.CartItem.include("variant", (variant) =>
      variant.include("product"),
    ).first({ id });
  }

  async deleteCartItem(id: number) {
    const update = await this.prisma.orm.CartItem.where({ id }).update({
      deletedAt: new Date(),
    });
    return update;
  }
}

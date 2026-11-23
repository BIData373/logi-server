import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import { CreateOrderItemDto } from "./dto/request/create-order_item.dto.js";
import { UpdateOrderItemDto } from "./dto/request/update-order-item.dto.js";

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrderItem(
    orderItem: CreateOrderItemDto,
    createdBy: number,
    variantId: number,
    orderId: number,
  ) {
    return await this.prisma.orm.orderItem.create({
      orderId,
      ...orderItem,
      createdBy,
      variantId,
      status: "created",
    });
  }

  async updateOrderItem(id: number, updates: UpdateOrderItemDto) {
    const update = await this.prisma.orm.orderItem.where({ id }).update({
      ...updates,
      updatedAt: new Date(),
    });
    return update;
  }

  async deleteOrderItem(id: number) {
    const update = await this.prisma.orm.Order.where({ id }).update({
      deletedAt: new Date(),
    });
    return update;
  }
}

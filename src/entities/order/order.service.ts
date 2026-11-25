import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { UpdateOrderDto } from "./dto/request/update-order.dto.js";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrder(createdBy: number) {
    return await this.prisma.orm.Order.create({ createdBy, status: "created" });
  }

  async getOrderById(id: number) {
    return await this.prisma.orm.Order.include("orderItems", (orderItems) =>
      orderItems.include("variant", (variant) => variant.include("product")),
    ).first({ id });
  }

  async updateOrder(id: number, updates: UpdateOrderDto) {
    new Date();
    let update;
    update = await this.prisma.orm.Order.where({ id }).update({
      ...updates,
      updatedAt: new Date(),
    });
    return update;
  }

  async deleteOrder(id: number) {
    const update = await this.prisma.orm.Order.where({ id }).update({
      deletedAt: new Date(),
    });
    return update;
  }
}

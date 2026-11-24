import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { CreateUserDto } from "./dto/request/create-user.dto.js";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(user: CreateUserDto) {
    return await this.prisma.orm.User.create({
      email: user.email,
      username: user.username,
      name: user.name,
    });
  }
  async getUserOrdersById(id: number) {
    return await this.prisma.orm.User.include("orders", (orders) =>
      orders.include("orderItems", (orderItems) =>
        orderItems.include("variant", (variant) => variant.include("product")),
      ),
    ).first({ id });
  }

  async getUserCart(id: number) {
    return await this.prisma.orm.User.include("cartItem").first({ id });
  }
}

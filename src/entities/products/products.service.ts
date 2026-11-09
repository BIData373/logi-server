import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { NewProductDto } from "./request/new-product.dto.js";

@Injectable()
export class ProductsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.orm.Products.all();
  }

  async createProduct(product: NewProductDto) {
    await this.prisma.orm.Products.create(product);
  }

  async findById(id: number) {
    return await this.prisma.orm.Products.where({ id: id })
      .include("images")
      .first();
  }
}

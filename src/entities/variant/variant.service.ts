import { Injectable } from "@nestjs/common";
import { CreateVariantDto } from "./dto/request/create-variant.dto.js";
import { PrismaService } from "../../prisma.service.js";
import type { UpdateVariantDto } from "./dto/request/update-variant.dto.js";

@Injectable()
export class VariantService {
  constructor(private readonly prisma: PrismaService) {}

  async createVariant(
    variant: CreateVariantDto,
    createdBy: number,
    productId: number,
  ) {
    return await this.prisma.orm.Variant.create({
      createdBy,
      ...variant,
      productId,
    });
  }

  async updateVariante(id: number, updates: UpdateVariantDto) {
    new Date();
    let update;
    update = await this.prisma.orm.Variant.where({ id: id }).update({
      ...updates,
      updatedAt: new Date(),
    });
    return update;
  }

  async deleteVariante(id: number) {
    new Date();
    let update;
    update = await this.prisma.orm.Variant.where({ id: id }).update({
      deletedAt: new Date(),
    });
    return update;
  }
}

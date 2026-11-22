import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import { transformToIdArray } from "../common/functions/transform-array.js";
import type { UpdateProductDto } from "./dto/request/update-product.dto.js";
import type { CreateProductDto } from "./dto/request/create-product.dto.js";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.orm.Product.include("images").all();
  }

  async createProduct(
    { imagesToAdd, ...product }: CreateProductDto,
    id: number,
  ) {
    return await this.prisma.orm.Product.create({
      createdBy: id,
      ...product,
      images: (images) => images.connect(transformToIdArray(imagesToAdd)),
    });
  }

  async updateProduct(
    id: number,
    { imagesToDelete, imagesToAdd, ...updates }: UpdateProductDto,
  ) {
    new Date();
    let update;
    await this.prisma.db.transaction(async (tx) => {
      update = await tx.orm.public.Product.where({ id: id }).update({
        ...updates,
        updatedAt: new Date(),
      });

      if (imagesToDelete)
        update = await tx.orm.public.Product.where({ id }).update({
          images: (images) =>
            images.disconnect(transformToIdArray(imagesToDelete)),
        });

      if (imagesToAdd)
        update = await tx.orm.public.Product.where({ id }).update({
          images: (images) => images.connect(transformToIdArray(imagesToAdd)),
        });
    });
    return update;
  }

  async deleteProduct(id: number) {
    new Date();
    let update;
    update = await this.prisma.orm.Product.where({ id: id }).update({
      deletedAt: new Date(),
    });
    return update;
  }
}

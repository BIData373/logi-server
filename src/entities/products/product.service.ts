import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { CreateProductDto } from "./request/create-product.dto.js";
import type { UpdateProductDto } from "./request/update-product.dto.js";

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.orm.Product.include("images").all();
  }

  async createProduct(product: CreateProductDto) {
    return await this.prisma.orm.Product.create(product);
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
          images: (images) => images.disconnect(imagesToDelete),
        });

      if (imagesToAdd)
        update = await tx.orm.public.Product.where({ id }).update({
          images: (images) => images.connect(imagesToAdd),
        });
    });
    return update;
  }
}

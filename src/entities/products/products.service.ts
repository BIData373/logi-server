import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { CreateProductDto } from "./request/create-product.dto.js";
import type { UpdateProductDto } from "./request/update-product.dto.js";

@Injectable()
export class ProductsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.orm.Products.include("images").all();
  }

  async createProduct(product: CreateProductDto) {
    await this.prisma.orm.Products.create(product);
  }

  async updateProduct(product: UpdateProductDto) {
    new Date();
    const { id, foundEntitiy, imagesToDelete, imagesToAdd, ...updates } =
      product;

    this.prisma.db.transaction(async (tx) => {
      const update = await tx.orm.public.Products.where({ id: id }).update({
        ...updates,
        updatedAt: new Date(),
      });

      if (imagesToDelete)
        tx.orm.public.Products.where({ id }).update({
          images: (images) => images.disconnect(imagesToDelete),
        });

      if (imagesToAdd)
        tx.orm.public.Products.where({ id }).update({
          images: (images) => images.disconnect(imagesToAdd),
        });
    });
  }
}

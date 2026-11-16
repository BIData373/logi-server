import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { CreateProductDto } from "./request/create-product.dto.js";
import type { UpdateProductDto } from "./request/update-product.dto.js";

@Injectable()
export class ProductService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.orm.Product.include("images").all();
  }

  async createProduct(product: CreateProductDto) {
    await this.prisma.orm.Product.create(product);
  }

  async updateProduct(
    id: number,
    { imagesToDelete, imagesToAdd, ...updates }: UpdateProductDto,
  ) {
    new Date();
    console.log(imagesToDelete);
    await this.prisma.db.transaction(async (tx) => {
      const update = await tx.orm.public.Product.where({ id: id }).update({
        ...updates,
        updatedAt: new Date(),
      });

      if (imagesToDelete)
        await tx.orm.public.Product.where({ id }).update({
          images: (images) => images.disconnect(imagesToDelete),
        });

      if (imagesToAdd)
        await tx.orm.public.Product.where({ id }).update({
          images: (images) => images.connect(imagesToAdd),
        });
    });
  }
}

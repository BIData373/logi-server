import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { NewProductDto } from "./request/new-product.dto.js";
import type { UpdateProductDto } from "./request/update-product.dto.js";

@Injectable()
export class ProductsService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}
  async findAll() {
    return this.prisma.orm.Products.include("images").all();
  }

  async createProduct(product: NewProductDto) {
    await this.prisma.orm.Products.create(product);
  }

  async updateProduct(product: UpdateProductDto) {
    console.log(new Date());
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

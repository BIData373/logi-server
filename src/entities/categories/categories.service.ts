import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/request/create-category.dto.js";
import { PrismaService } from "../../prisma.service.js";
import type { UpdateCategoryDto } from "./dto/request/update-category.dto.js";

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCategory(category: CreateCategoryDto, createdBy: number) {
    return await this.prisma.orm.Category.create({
      ...category,
      createdBy,
    });
  }

  async getAll() {
    return await this.prisma.orm.Category.include("image").all();
  }

  async updateCategory(id: number, updates: UpdateCategoryDto) {
    return await this.prisma.orm.Category.where({ id: id }).update({
      ...updates,
      updatedAt: new Date(),
    });
  }
  async deleteCategory(id: number) {
    return await this.prisma.orm.Category.where({ id: id }).update({
      deletedAt: new Date(),
    });
  }
}

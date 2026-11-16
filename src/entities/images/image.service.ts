import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { CreateImageDto } from "./dto/request/create-image.dto.js";

@Injectable()
export class ImageService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async addImage(image: CreateImageDto) {
    return await this.prisma.orm.Image.create(image);
  }
}

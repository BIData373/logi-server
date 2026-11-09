import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma.service.js";
import type { NewImageDto } from "./dto/request/new-image.dto.js";

@Injectable()
export class ImagesService {
  constructor(@Inject(PrismaService) private readonly prisma: PrismaService) {}

  async addImage(image: NewImageDto) {
    return await this.prisma.orm.Images.create(image);
  }
}

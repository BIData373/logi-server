import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ImageService } from "./image.service.js";
import type { CreateImageDto } from "./dto/request/create-image.dto.js";
@Controller("images")
export class ImageController {
  constructor(@Inject(ImageService) private readonly service: ImageService) {}

  @Post()
  async createImage(@Body() image: CreateImageDto) {
    image;
    await this.service.createImage(image);
  }
}

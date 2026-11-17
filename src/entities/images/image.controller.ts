import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ImageService } from "./image.service.js";
import { CreateImageDto } from "./dto/request/create-image.dto.js";
@Controller("images")
export class ImageController {
  constructor(private readonly service: ImageService) {}

  @Post()
  async createImage(@Body() image: CreateImageDto) {
    return await this.service.createImage(image);
  }
}

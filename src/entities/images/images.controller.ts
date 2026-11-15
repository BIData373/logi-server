import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ImagesService } from "./images.service.js";
import type { CreateImageDto } from "./dto/request/create-image.dto.js";
@Controller("images")
export class ImagesController {
  constructor(@Inject(ImagesService) private readonly service: ImagesService) {}

  @Post()
  async addImage(@Body() image: CreateImageDto) {
    image;
    await this.service.addImage(image);
  }
}

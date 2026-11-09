import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ImagesService } from "./images.service.js";
import type { NewImageDto } from "./dto/request/new-image.dto.js";
@Controller("images")
export class ImagesController {
  constructor(@Inject(ImagesService) private readonly service: ImagesService) {}

  @Post()
  async addImage(@Body() image: NewImageDto) {
    console.log(image);
    await this.service.addImage(image);
  }
}

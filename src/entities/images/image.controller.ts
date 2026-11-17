import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ImageService } from "./image.service.js";
import { CreateImageDto } from "./dto/request/create-image.dto.js";
import { ApiBody, ApiOkResponse } from "@nestjs/swagger";
@Controller("images")
export class ImageController {
  constructor(@Inject(ImageService) private readonly service: ImageService) {}
  @ApiOkResponse()
  @ApiBody({ type: CreateImageDto })
  @Post()
  async createImage(@Body() image: CreateImageDto) {
    image;
    await this.service.createImage(image);
  }
}

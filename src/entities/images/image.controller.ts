import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { ImageService } from "./image.service.js";
import { CreateImageDto } from "./dto/request/create-image.dto.js";
import { GetProductDto } from "../products/request/get-product.dto.js";
import { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { GetParamsDecerator } from "../common/deceretors/get-params.decerator.js";
@Controller("images")
export class ImageController {
  constructor(private readonly service: ImageService) {}

  @Post(":productId/:createdBy")
  async createImage(
    @Body() image: CreateImageDto,
    @GetParamsDecerator("productId") product: GetProductDto,
    @GetParamsDecerator("createdBy") user: GetUserDto,
  ) {
    return await this.service.createImage(image, user.id, product.id);
  }
}

import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { ImageService } from "./image.service.js";
import { CreateImageDto } from "./dto/request/create-image.dto.js";
import { ApiBody, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { GetProductDto } from "../products/request/get-product.dto.js";
import { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { GetParamsDecerator } from "../common/deceretors/get-params.decerator.js";
import { ToSwaggerAndInstace } from "../common/deceretors/to-swagger-and-instace.decorator.js";
import { ImageDto } from "./dto/response/image.dto.js";
@Controller("images")
export class ImageController {
  constructor(private readonly service: ImageService) {}
  @ApiBody({ type: CreateImageDto })
  @Post(":productId/:createdBy")
  @ToSwaggerAndInstace(ImageDto)
  @ApiOperation({ operationId: "createImage" })
  async createImage(
    @Body() image: CreateImageDto,
    @GetParamsDecerator("productId") product: GetProductDto,
    @GetParamsDecerator("createdBy") user: GetUserDto,
  ) {
    return await this.service.createImage(image, user.id, product.id);
  }
}

import { Body, Controller, Inject, Param, Post } from "@nestjs/common";
import { ImageService } from "./image.service.js";
import { CreateImageDto } from "./dto/request/create-image.dto.js";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { GetProductDto } from "../products/dto/request/get-product.dto.js";
import { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { GetParamsDecerator } from "../common/deceretors/get-params.decerator.js";
import { ToSwaggerAndInstace } from "../common/deceretors/to-swagger-and-instace.decorator.js";
import { ImageDto } from "./dto/response/image.dto.js";
import { number } from "@prisma/composer";
@Controller("images")
export class ImageController {
  constructor(private readonly service: ImageService) {}
  @Post("/:createdBy")
  @ApiBody({ type: CreateImageDto })
  @ApiOperation({ operationId: "createImage" })
  @ApiParam({ name: "createdBy", type: Number })
  @ToSwaggerAndInstace(ImageDto)
  async createImage(
    @Body() image: CreateImageDto,
    @GetParamsDecerator("createdBy") user: GetUserDto,
  ) {
    return await this.service.createImage(image, user.id);
  }
}

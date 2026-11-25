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
import { GetParamsDecerator } from "../common/decorators/get-params.decorator.js";
import { ToSwaggerAndInstace } from "../common/decorators/to-swagger-and-instace.decorator.js";
import { ImageDto } from "./dto/response/image.dto.js";
import { number } from "@prisma/composer";
import { CurrentUserId } from "../common/decorators/current-user-id.decorator.js";
@Controller("images")
export class ImageController {
  constructor(private readonly service: ImageService) {}
  @Post()
  @ApiBody({ type: CreateImageDto })
  @ApiOperation({ operationId: "createImage" })
  @ToSwaggerAndInstace(ImageDto)
  async createImage(
    @Body() image: CreateImageDto,
    @CurrentUserId() user: GetUserDto,
  ) {
    console.log(user.id);
    return await this.service.createImage(image, user.id);
  }
}

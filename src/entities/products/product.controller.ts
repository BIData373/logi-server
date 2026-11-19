import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { TransformPlainToInstance } from "class-transformer";
import { ProductService } from "./product.service.js";
import { CreateProductDto } from "./request/create-product.dto.js";
import { UpdateProductDto } from "./request/update-product.dto.js";
import { ProductDto } from "./response/product.dto.js";
import { GetProductDto } from "./request/get-product.dto.js";
import { GetParamsDecerator } from "../common/deceretors/get-params.decerator.js";
import type { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { UserDto } from "../user/dto/response/user.dto.js";
import { ToSwaggerAndInstace } from "../common/deceretors/to-swagger-and-instace.decorator.js";

@Controller("products")
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Post("/:userId")
  @ApiBody({ type: CreateProductDto })
  @ApiOperation({ operationId: "createProduct" })
  @ApiParam({ name: "userId", type: Number })
  @ToSwaggerAndInstace(ProductDto)
  async createProduct(
    @Body() product: CreateProductDto,
    @GetParamsDecerator("userId") user: GetUserDto,
  ) {
    return await this.service.createProduct(product, user.id);
  }

  @Get()
  @ApiOperation({ operationId: "getAllProducts" })
  @ToSwaggerAndInstace(ProductDto, true)
  async getAllProducts() {
    return await this.service.findAll();
  }

  @Get("/:id")
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "getProductById" })
  @ToSwaggerAndInstace(ProductDto)
  async getProductById(@Param() product: GetProductDto) {
    return product.context;
  }

  @Patch("/:id")
  @ToSwaggerAndInstace(ProductDto)
  @ApiOperation({ operationId: "updateProduct" })
  @ApiBody({ type: UpdateProductDto })
  @ApiParam({ name: "id", type: Number })
  async updateProduct(
    @Param() product: GetProductDto,
    @Body() body: UpdateProductDto,
  ) {
    return await this.service.updateProduct(product.id, body);
  }
}

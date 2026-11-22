import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam } from "@nestjs/swagger";
import { GetParamsDecerator } from "../common/deceretors/get-params.decerator.js";
import { ToSwaggerAndInstace } from "../common/deceretors/to-swagger-and-instace.decorator.js";
import type { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { CreateProductDto } from "./dto/request/create-product.dto.js";
import { GetProductDto } from "./dto/request/get-product.dto.js";
import { UpdateProductDto } from "./dto/request/update-product.dto.js";
import { ProductDto } from "./dto/response/product.dto.js";
import { ProductService } from "./product.service.js";

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
  @ApiOperation({ operationId: "getProductById" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(ProductDto)
  async getProductById(@Param() product: GetProductDto) {
    return product.context;
  }

  @ApiBody({ type: UpdateProductDto })
  @ApiParam({ name: "id", type: Number })
  @Patch("/:id")
  @ApiOperation({ operationId: "updateProduct" })
  @ApiBody({ type: UpdateProductDto })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(ProductDto)
  async updateProduct(
    @Param() product: GetProductDto,
    @Body() body: UpdateProductDto,
  ) {
    return await this.service.updateProduct(product.id, body);
  }

  @Delete("/:id")
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "deleteProduct" })
  @ToSwaggerAndInstace(ProductDto)
  async deleteProduct(@Param() product: GetProductDto) {
    return await this.service.deleteProduct(product.id);
  }
}

import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { TransformPlainToInstance } from "class-transformer";
import { ProductService } from "./product.service.js";
import { CreateProductDto } from "./request/create-product.dto.js";
import { GetProductDto } from "./request/get-product.dto.js";
import { UpdateProductDto } from "./request/update-product.dto.js";
import { ProductDto } from "./response/product.dto.js";

@Controller("products")
export class ProductController {
  constructor(
    @Inject(ProductService) private readonly service: ProductService,
  ) {}

  @ApiOkResponse()
  @ApiBody({ type: CreateProductDto })
  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    await this.service.createProduct(product);
  }

  @ApiOkResponse({ type: ProductDto })
  @Get()
  @TransformPlainToInstance(ProductDto)
  async getAllProducts() {
    return await this.service.findAll();
  }

  @Get("/:id")
  @ApiParam({ name: "id", type: Number })
  @ApiOkResponse({ type: ProductDto })
  @TransformPlainToInstance(ProductDto)
  async getProductById(@Param() product: GetProductDto) {
    return product.context;
  }

  @ApiOkResponse()
  @ApiBody({ type: UpdateProductDto })
  @ApiParam({ name: "id", type: Number })
  @Patch("/:id")
  async updateProduct(
    @Param() product: GetProductDto,
    @Body() body: UpdateProductDto,
  ) {
    await this.service.updateProduct(product.id, body);
  }
}

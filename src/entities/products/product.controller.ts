import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ProductService } from "./product.service.js";
import { CreateProductDto } from "./request/create-product.dto.js";
import { UpdateProductDto } from "./request/update-product.dto.js";
import { TransformPlainToInstance } from "class-transformer";
import { ProductDto } from "./response/product.dto.js";
import { GetProductDto } from "./request/get-product.dto.js";

@Controller("products")
export class ProductController {
  constructor(
    @Inject(ProductService) private readonly service: ProductService,
  ) {}

  @Post()
  async createProduct(@Body() product: CreateProductDto) {
    return await this.service.createProduct(product);
  }

  @Get()
  @TransformPlainToInstance(ProductDto)
  async getAllProducts() {
    return await this.service.findAll();
  }

  @Get("/:id")
  @TransformPlainToInstance(ProductDto)
  async getProductById(@Param() product: GetProductDto) {
    return product.context;
  }

  @Patch("/:id")
  async updateProduct(
    @Param() product: GetProductDto,
    @Body() body: UpdateProductDto,
  ) {
    return await this.service.updateProduct(product.id, body);
  }
}

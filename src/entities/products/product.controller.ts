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
    await this.service.createProduct(product);
  }

  @Get()
  @TransformPlainToInstance(ProductDto)
  async getAllProducts() {
    ("bye");
    return await this.service.findAll();
  }

  @Get("/:id")
  @TransformPlainToInstance(ProductDto)
  async getProductById(@Param() product: GetProductDto) {
    product;
    return product.contex;
  }

  @Patch("/:id")
  async updateProduct(@Param() product: UpdateProductDto, @Body() body: any) {
    await this.service.updateProduct({ ...UpdateProductDto, ...body });
  }
}

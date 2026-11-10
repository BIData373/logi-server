import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ProductsService } from "./products.service.js";
import { NewProductDto } from "./request/new-product.dto.js";
import { UpdateProductDto } from "./request/update-product.dto.js";
import { TransformPlainToInstance } from "class-transformer";
import { GetProductResponseDto } from "./response/get-product.dto.js";
import { GetProductDto } from "./request/get-product.dto.js";

@Controller("products")
export class ProductsController {
  constructor(
    @Inject(ProductsService) private readonly service: ProductsService,
  ) {}

  @Post()
  async createProduct(@Body() product: NewProductDto) {
    await this.service.createProduct(product);
  }

  @Get()
  @TransformPlainToInstance(GetProductResponseDto)
  async getAllProducts() {
    console.log("bye");
    return await this.service.findAll();
  }

  @Get("/:id")
  @TransformPlainToInstance(GetProductResponseDto)
  async getProductById(@Param() product: GetProductDto) {
    console.log(product);
    return product.foundEntitiy;
  }

  @Patch("/:id")
  async updateProduct(@Param() product: UpdateProductDto, @Body() body: any) {
    await this.service.updateProduct({ ...UpdateProductDto, ...body });
  }
}

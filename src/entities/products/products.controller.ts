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
  async getAllProducts() {
    return await this.service.findAll();
  }

  @Get(":id")
  async getProductById(@Param("id") id: number) {
    return await this.service.findById(id);
  }
  @Patch()
  async updateProduct(@Body() product: UpdateProductDto) {
    return product;
  }
}

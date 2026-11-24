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
import { GetParamsDecerator } from "../common/decorators/get-params.decorator.js";
import { ToSwaggerAndInstace } from "../common/decorators/to-swagger-and-instace.decorator.js";
import { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { CategoriesService } from "./categories.service.js";
import { CreateCategoryDto } from "./dto/request/create-category.dto.js";
import { GetCategoryWithImageDto } from "./dto/request/get-category-with-Image.dto.js";
import { CategoryWithImageDto } from "./dto/response/category-with-image.dto.js";
import { CategoryDto } from "./dto/response/category.dto.js";
import { UpdateCategoryDto } from "./dto/request/update-category.dto.js";
import { GetCategoryDto } from "./dto/request/get-category.dto.js";

@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoryService: CategoriesService) {}

  @Post("/:createdBy")
  @ApiBody({ type: CreateCategoryDto })
  @ApiOperation({ operationId: "createCategory" })
  @ApiParam({ name: "createdBy", type: Number })
  @ToSwaggerAndInstace(CategoryDto)
  async createCategory(
    @Body() category: CreateCategoryDto,
    @GetParamsDecerator("createdBy") user: GetUserDto,
  ) {
    return await this.categoryService.createCategory(category, user.id);
  }

  @Get("/:id")
  @ApiOperation({ operationId: "getCategoryById" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(CategoryWithImageDto)
  async getVariantById(@Param() category: GetCategoryWithImageDto) {
    return category.context;
  }

  @Get()
  @ApiOperation({ operationId: "getAllCategories" })
  @ToSwaggerAndInstace(CategoryWithImageDto, true)
  async getAll() {
    return this.categoryService.getAll();
  }

  @Patch("/:id")
  @ApiBody({ type: UpdateCategoryDto })
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "updateCategory" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(CategoryWithImageDto)
  async updateCategory(
    @Param() category: GetCategoryDto,
    @Body() newCategory: UpdateCategoryDto,
  ) {
    return await this.categoryService.updateCategory(category.id, newCategory);
  }

  @Delete("/:id")
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "deleteCategory" })
  @ToSwaggerAndInstace(CategoryDto)
  async deleteCategory(@Param() category: GetCategoryDto) {
    return await this.categoryService.deleteCategory(category.id);
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
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
import { ToSwaggerAndInstace } from "../common/decorators/to-swagger-and-instace.decorator.js";
import { CreateVariantDto } from "./dto/request/create-variant.dto.js";
import { GetParamsDecerator } from "../common/decorators/get-params.decorator.js";
import { GetUserDto } from "../user/dto/request/get-user.dto.js";
import { VariantService } from "./variant.service.js";
import { GetProductDto } from "../products/dto/request/get-product.dto.js";
import { VariantDto } from "./dto/response/variant.dto.js";
import { GetVariantDto } from "./dto/request/get-variant.dto.js";
import { UpdateVariantDto } from "./dto/request/update-variant.dto.js";
import { UpdateProductDto } from "../products/dto/request/update-product.dto.js";

@Controller("variants")
export class VariantController {
  constructor(private readonly variantService: VariantService) {}
  @Post(":userId/:productId")
  @ApiBody({ type: CreateVariantDto })
  @ApiOperation({ operationId: "createVariant" })
  @ApiParam({ name: "userId", type: Number })
  @ApiParam({ name: "productId", type: Number })
  @ToSwaggerAndInstace(VariantDto)
  async createProduct(
    @Body() variant: CreateVariantDto,
    @GetParamsDecerator("userId") user: GetUserDto,
    @GetParamsDecerator("productId") product: GetProductDto,
  ) {
    return await this.variantService.createVariant(
      variant,
      user.id,
      product.id,
    );
  }

  @Get("/:id")
  @ApiOperation({ operationId: "getVariantById" })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(VariantDto)
  async getVariantById(@Param() variant: GetVariantDto) {
    return variant.context;
  }

  @Patch("/:id")
  @ApiBody({ type: UpdateVariantDto })
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "updateVariant" })
  @ApiBody({ type: UpdateVariantDto })
  @ApiParam({ name: "id", type: Number })
  @ToSwaggerAndInstace(VariantDto)
  async updateVariant(
    @Param() variant: GetVariantDto,
    @Body() newVariant: UpdateVariantDto,
  ) {
    return await this.variantService.updateVariante(variant.id, newVariant);
  }

  @Delete("/:id")
  @ApiParam({ name: "id", type: Number })
  @ApiOperation({ operationId: "deleteVariant" })
  @ToSwaggerAndInstace(VariantDto)
  async deleteVariant(@Param() variant: GetVariantDto) {
    return await this.variantService.deleteVariante(variant.id);
  }
}

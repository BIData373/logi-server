import { Module } from "@nestjs/common";
import { ProductController } from "./product.controller.js";
import { ProductService } from "./product.service.js";
import { entityExistsConstraint } from "../common/deceretors/entity-exsist.decorator.js";
@Module({
  controllers: [ProductController],
  providers: [ProductService, entityExistsConstraint],
})
export class ProductModule {}

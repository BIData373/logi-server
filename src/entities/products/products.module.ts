import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller.js";
import { ProductsService } from "./products.service.js";
import { entityExistsConstraint } from "../common/deceretors/entity-exsist.decorator.js";
@Module({
  controllers: [ProductsController],
  providers: [ProductsService, entityExistsConstraint],
})
export class ProductsModule {}

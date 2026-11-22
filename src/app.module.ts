import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { PrismaService } from "./prisma.service.js";
import { ProductService } from "./entities/products/product.service.js";
import { ImageService } from "./entities/images/image.service.js";
import { ImageController } from "./entities/images/image.controller.js";
import { ProductController } from "./entities/products/product.controller.js";
import { UserController } from "./entities/user/user.controller.js";
import { UserService } from "./entities/user/user.service.js";
import { entityExistsConstraint } from "./entities/common/deceretors/entity-exsist.decorator.js";
import { VariantModule } from "./entities/variant/variant.module.js";
import { VariantController } from "./entities/variant/variant.controller.js";
import { VariantService } from "./entities/variant/variant.service.js";

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ProductController,
    ImageController,
    VariantController,
  ],
  providers: [
    PrismaService,
    UserService,
    ProductService,
    ImageService,
    entityExistsConstraint,
    VariantService,
  ],
})
export class AppModule {}

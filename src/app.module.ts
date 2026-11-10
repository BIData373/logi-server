import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { PrismaService } from "./prisma.service.js";
import { ProductsService } from "./entities/products/products.service.js";
import { ImagesService } from "./entities/images/images.service.js";
import { ImagesController } from "./entities/images/images.controller.js";
import { ProductsController } from "./entities/products/products.controller.js";
import { UsersController } from "./entities/users/users.controller.js";
import { UsersService } from "./entities/users/users.service.js";
import { entityExistsConstraint } from "./entities/common/deceretors/entity-exsist.decorator.js";

@Module({
  imports: [],
  controllers: [
    AppController,
    UsersController,
    ProductsController,
    ImagesController,
  ],
  providers: [
    PrismaService,
    UsersService,
    ProductsService,
    ImagesService,
    entityExistsConstraint,
  ],
})
export class AppModule {}

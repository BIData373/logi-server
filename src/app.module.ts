import {
  Module,
  type MiddlewareConsumer,
  type NestModule,
} from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { entityExistsConstraint } from "./entities/common/decorators/entity-exsist.decorator.js";
import { ImageController } from "./entities/images/image.controller.js";
import { ImageService } from "./entities/images/image.service.js";
import { ProductController } from "./entities/products/product.controller.js";
import { ProductService } from "./entities/products/product.service.js";
import { UserController } from "./entities/user/user.controller.js";
import { UserService } from "./entities/user/user.service.js";
import { VariantController } from "./entities/variant/variant.controller.js";
import { VariantService } from "./entities/variant/variant.service.js";
import { PrismaService } from "./prisma.service.js";
import { OrderModule } from "./entities/order/order.module.js";
import { OrderController } from "./entities/order/order.controller.js";
import { OrderService } from "./entities/order/order.service.js";
import { OrderItemService } from "./entities/order-item/order-item.service.js";
import { OrderItemController } from "./entities/order-item/order-item.controller.js";
import { CartItemService } from "./entities/cart-item/cart-item.service.js";
import { CartItemController } from "./entities/cart-item/cart-item.controller.js";
import { AuthMiddleware } from "./entities/common/middleware/auth.middleware.js";

@Module({
  imports: [],
  controllers: [
    AppController,
    UserController,
    ProductController,
    ImageController,
    VariantController,
    OrderController,
    OrderItemController,
    CartItemController,
  ],
  providers: [
    PrismaService,
    UserService,
    ProductService,
    ImageService,
    entityExistsConstraint,
    VariantService,
    OrderService,
    OrderItemService,
    CartItemService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes("*");
  }
}

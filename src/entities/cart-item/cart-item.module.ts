import { Module } from "@nestjs/common";
import { CartItemController } from "./cart-item.controller";
import { CartItemService } from "./cart-item.service";

@Module({
  providers: [CartItemService],
  controllers: [CartItemController],
})
export class OrderItemModule {}

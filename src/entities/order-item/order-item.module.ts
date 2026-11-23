import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service.js';
import { OrderItemController } from './order-item.controller.js';

@Module({
  providers: [OrderItemService],
  controllers: [OrderItemController]
})
export class OrderItemModule {}

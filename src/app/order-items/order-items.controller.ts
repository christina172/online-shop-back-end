import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';

import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from 'src/domain/dtos/create-order-item.dto';
import { UpdateOrderItemDto } from 'src/domain/dtos/update-order-item.dto';

@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly orderItemsServce: OrderItemsService){}

  @Post()
  async create(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderItemsServce.create(createOrderItemDto);
  }

  @Get('/order/:orderId')
  async findByOrderId(@Param('orderId') orderId: string) {
    return this.orderItemsServce.findByOrderId(orderId);
  }

  @Patch('add_quantity/:orderItemId')
  async addQuantity(@Param('orderItemId') orderItemId: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemsServce.addQuantity(orderItemId, updateOrderItemDto);
  }

  @Patch('/update_quantity/:orderItemId')
  async updateQuantity(@Param('orderItemId') orderItemId: string, @Body() updateOrderItemDto: UpdateOrderItemDto) {
    return this.orderItemsServce.updateQuantity(orderItemId, updateOrderItemDto);
  }

  @Delete(':orderItemId')
  async delete(@Param('orderItemId') orderItemId: string) {
    return this.orderItemsServce.delete(orderItemId);
  }
}

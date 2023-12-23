import { Injectable } from '@nestjs/common';

import { OrderItem } from '@prisma/client';
import { OrderItemsRepo } from 'src/domain/repos/order-items.repo';

@Injectable()
export class OrderItemsService {
  constructor(private orderItemsRepo: OrderItemsRepo){}

  async create(orderItem: Pick<OrderItem, 'productId' | 'quantity' | 'orderId'>) {
    return this.orderItemsRepo.create(orderItem);
  }

  async findByOrderId(orderId: string) {
    return this.orderItemsRepo.findByOrderId(orderId);
  }

  async update(orderItemId: string, orderItem: Partial<OrderItem>) {
    return this.orderItemsRepo.update(orderItemId, orderItem);
  }

  async addQuantity(orderItemId: string, orderItem: Pick<OrderItem, 'quantity'>) {
    return this.orderItemsRepo.addQuantity(orderItemId, orderItem);
  }

  async updateQuantity(orderItemId: string, orderItem: Pick<OrderItem, 'quantity'>) {
    return this.orderItemsRepo.updateQuantity(orderItemId, orderItem);
  }

  async delete(orderItemId: string) {
    return this.orderItemsRepo.delete(orderItemId);
  }
}

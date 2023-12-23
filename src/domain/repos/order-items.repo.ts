import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/prisma/prisma.service';
import { OrderItem } from '@prisma/client';

@Injectable()
export class OrderItemsRepo {
  constructor(private readonly prisma: PrismaService) { }

  async create(orderItem: Pick<OrderItem, 'productId' | 'quantity' | 'orderId'>) {
    return this.prisma.orderItem.create({
      data: orderItem,
      include: {
        product: true
      }
    });
  }

  async findById(orderItemId: string) {
    return this.prisma.orderItem.findUnique({
      where: {
        id: orderItemId
      },
      include: {
        order: true
      }
    })
  }

  async findByOrderId(orderId: string) {
    return this.prisma.orderItem.findMany({
      where: {
        orderId: orderId
      },
      include: {
        product: true
      }
    })
  }

  async update(orderItemId: string, orderItem: Partial<OrderItem>) {
    return this.prisma.orderItem.update({
      where: { id: orderItemId },
      data: orderItem,
      include: {
        product: true
      }
    });
  }

  async addQuantity(orderItemId: string, orderItem: Pick<OrderItem, 'quantity'>) {
    return this.prisma.orderItem.update({
      where: { id: orderItemId },
      data: {
        quantity: {
          increment: orderItem.quantity
        }
      },
      include: {
        product: true
      }
    });
  }

  async updateQuantity(orderItemId: string, orderItem: Pick<OrderItem, 'quantity'>) {
    return this.prisma.orderItem.update({
      where: { id: orderItemId },
      data: orderItem,
      include: {
        product: true
      }
    });
  }

  async delete(orderItemId: string) {
    return this.prisma.orderItem.delete({ where: { id: orderItemId } });
  }
}
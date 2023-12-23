import { Injectable } from '@nestjs/common';
import { OrdersRepo } from 'src/domain/repos/orders.repo';

@Injectable()
export class OrdersService {
  constructor(private ordersRepo: OrdersRepo){}

  async create(userId: string) {
    return this.ordersRepo.create(userId);
  }

  async findAll() {
    return this.ordersRepo.findAll();
  }

  async findById(orderId: string) {
    return this.ordersRepo.findById(orderId);
  }

  async findUsersCart(userId: string) {
    return this.ordersRepo.findCartByUserId(userId);
  }

  async findUsersOrders(userId: string) {
    return this.ordersRepo.findOrdersByUserId(userId);
  }

  async placeAnOrder(orderId: string) {
    return this.ordersRepo.placeAnOrder(orderId);
  }

  async cancelAnOrder(orderId: string) {
    return this.ordersRepo.cancelAnOrder(orderId);
  }

  async delete(orderId: string) {
    return this.ordersRepo.delete(orderId);
  }
}

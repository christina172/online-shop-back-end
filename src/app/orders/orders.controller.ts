import { Controller, Get, Post, Patch, Delete, Param, NotFoundException, ConflictException } from '@nestjs/common';

import { CurrentUser } from 'src/libs/security/decorators/current-user.decorator';
import { UserDto } from 'src/domain/dtos/user.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService){}

  @Post()
  async create(@CurrentUser() user: UserDto) {
    return this.ordersService.create(user.sub);
  }

  @Get('/cart')
  async findUsersCart(@CurrentUser() user: UserDto) {
    const cart = await this.ordersService.findUsersCart(user.sub);
    // If the user doesn't have a cart, create it
    if (!cart) {
      const cart = await this.ordersService.create(user.sub);
      return cart;
    }
    return cart;
  }

  @Get('/user')
  async findUsersOrder(@CurrentUser() user: UserDto) {
    return this.ordersService.findUsersOrders(user.sub);
  }

  @Get(':orderId')
  async findById(@Param('orderId') orderId: string) {
    const order = await this.ordersService.findById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with the id of ${orderId} does not exist.`);
    }
    return order;
  }

  @Get()
  async findAll() {
    return this.ordersService.findAll();
  }

  // Or change to use userId (from req.user.sub) to search for cart and then change its status,
  // so that only user could place an order 
  @Patch(':orderId/place_order')
  async placeAnOrder(@Param('orderId') orderId: string) {
    return this.ordersService.placeAnOrder(orderId);
  }

  @Patch(':orderId/cancel_order')
  async cancelAnOrder(@Param('orderId') orderId: string) {
    const order = await this.ordersService.findById(orderId);
    if (!order) {
      throw new NotFoundException(`Order with the id of ${orderId} does not exist.`);
    }
    if (order.status === "CART" || order.status === "CANCELLED") {
      throw new ConflictException('Only a placed order can be cancelled.');
    }
    return this.ordersService.cancelAnOrder(orderId);
  }

  @Delete(':orderId')
  async delete(@Param('orderId') orderId: string) {
    return this.ordersService.delete(orderId);
  }  
}

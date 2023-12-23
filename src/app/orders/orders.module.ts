import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { ProductsRepo } from 'src/domain/repos/products.repo';
import { OrderItemsRepo } from 'src/domain/repos/order-items.repo';
import { OrdersRepo } from 'src/domain/repos/orders.repo';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';

@Module({
  providers: [
    OrdersService, 
    OrdersRepo,
    OrderItemsRepo,
    ProductsRepo
  ],
  controllers: [OrdersController],
  imports: [PrismaModule]
})
export class OrdersModule {}

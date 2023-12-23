import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/libs/prisma/prisma.module';
import {OrdersRepo} from 'src/domain/repos/orders.repo';
import { OrderItemsRepo } from 'src/domain/repos/order-items.repo';
import { OrderItemsService } from './order-items.service';
import { OrderItemsController } from './order-items.controller';

@Module({
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsRepo, OrdersRepo],
  imports: [PrismaModule]
})
export class OrderItemsModule {}

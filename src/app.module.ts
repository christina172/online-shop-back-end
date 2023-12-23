import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from './libs/prisma/prisma.module';
import { ProductsModule } from './app/products/products.module';
import { UsersModule } from './app/users/users.module';
import { OrdersModule } from './app/orders/orders.module';
import { OrderItemsModule } from './app/order-items/order-items.module';
import { AuthModule } from './app/auth/auth.module';

import { JwtAuthGuard } from 'src/libs/security/guards/jwt-auth.guard';

@Module({
  imports: [
    PrismaModule, 
    ProductsModule, 
    UsersModule, 
    OrdersModule, 
    OrderItemsModule, 
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}

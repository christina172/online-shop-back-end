import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { ProductsRepo } from 'src/domain/repos/products.repo';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  providers: [ProductsService, ProductsRepo],
  controllers: [ProductsController],
  imports: [PrismaModule]
})
export class ProductsModule {}

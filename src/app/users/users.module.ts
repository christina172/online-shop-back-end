import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/libs/prisma/prisma.module';
import { UsersRepo } from 'src/domain/repos/users.repo';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, UsersRepo],
  controllers: [UsersController],
  imports: [PrismaModule],
  exports: [UsersService]
})
export class UsersModule {}

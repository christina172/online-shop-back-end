import {
  ExecutionContext,
  createParamDecorator,
} from '@nestjs/common';
import { UserDto } from 'src/domain/dtos/user.dto';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserDto;
  },
);
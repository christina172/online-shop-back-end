import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from 'src/libs/security/decorators/public.decorator';
import { CurrentUser } from 'src/libs/security/decorators/current-user.decorator';
import { UserDto } from 'src/domain/dtos/user.dto';
import { LoginDto } from 'src/domain/dtos/login.dto';
import { RefreshTokenGuard } from 'src/libs/security/guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() { username, password }: LoginDto) {
    return this.authService.login(username, password);
  }

  @Get('logout')
  async logout(@CurrentUser() user: UserDto) {
    await this.authService.logout(user.sub);
    return;
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  async refreshTokens(@CurrentUser() user: UserDto) {
    const userId = user.sub;
    const refreshToken = user.refreshToken;
    return this.authService.refreshTokens(userId, refreshToken);
  }
}

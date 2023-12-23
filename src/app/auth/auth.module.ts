import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { UsersModule } from 'src/app/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from 'src/libs/security/jwt.strategy';
import { RefreshTokenStrategy } from 'src/libs/security/refresh-jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
    envFilePath: '.development.env'
    }),
    PassportModule,
    JwtModule.register({}),
    UsersModule
  ],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  controllers: [AuthController]
})
export class AuthModule {}

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UsersRepo } from 'src/domain/repos/users.repo';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersRepo: UsersRepo,
    private jwtService: JwtService
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersRepo.findByUsername(username);

    if (!user) {
      throw new NotFoundException(`No user found with username: ${username}`);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.getAccesToken(user.id, user.username),
      this.getAndSaveRefreshToken(user.id, user.username)
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async logout(userId: string) {
    return this.usersRepo.update(userId, { refreshToken: null });
  }

  async getAccesToken(userId: string, username: string) {
    const accessToken = await this.jwtService.signAsync(
      { username: username, sub: userId },
      {
        secret: process.env.SECRET,
        expiresIn: '15m',
      }
    );
    return accessToken;
  }

  async getAndSaveRefreshToken(userId: string, username: string) {
    const refreshToken = await this.jwtService.signAsync(
      { username: username, sub: userId },
      {
        secret: process.env.REFRESH_SECRET,
        expiresIn: '7d',
      }
    );
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 8);
    await this.usersRepo.update(userId, {
      refreshToken: hashedRefreshToken,
    });
    return refreshToken;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersRepo.findById(userId);
    if (!user) {
      throw new UnauthorizedException()
    };
    if (!user.refreshToken) {
      throw new UnauthorizedException('Refresh token is not present');
    };
    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken
    );
    if (!refreshTokenMatches) throw new UnauthorizedException('Refresh token is not valid');
    const [accessToken, newRefreshToken] = await Promise.all([
      this.getAccesToken(user.id, user.username),
      this.getAndSaveRefreshToken(user.id, user.username)
    ]);

    return {
      access_token: accessToken,
      refresh_token: newRefreshToken
    };
  }
}

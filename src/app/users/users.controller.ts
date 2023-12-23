import { Controller, Get, Post, Patch, Delete, Body, Param, NotFoundException } from '@nestjs/common';

import { Public } from 'src/libs/security/decorators/public.decorator';
import { CurrentUser } from 'src/libs/security/decorators/current-user.decorator';
import { UsersService } from './users.service';
import { UserEntity } from 'src/domain/entities/user.entity';
import { CreateUserDto } from 'src/domain/dtos/create-user.dto';
import { UpdateUserDto } from 'src/domain/dtos/update-user.dto';
import { UserDto } from 'src/domain/dtos/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/user')
  async findUser(@CurrentUser() user: UserDto) {
    return this.usersService.findById(user.sub);
  }

  // The response doesn't include the user's password and refreshToken
  @Get(':userId')
  async findById(@Param('userId') userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new NotFoundException(`User with the id of ${userId} does not exist.`);
    }
    return new UserEntity(user);
  }

  // The response doesn't include passwords and refreshTokens
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Patch('/update')
  async updateUser(@CurrentUser() user: UserDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.sub, updateUserDto);
  }

  // Delete this route?, so that only users themselves could update their info
  @Patch(':userId')
  async update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete('/delete')
  async deleteUser(@CurrentUser() user: UserDto) {
    return this.usersService.delete(user.sub);
  }

  // The response doesn't include the user's password and refreshToken
  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    return new UserEntity(await this.usersService.delete(userId));
  }
}

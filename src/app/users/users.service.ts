import { Injectable } from '@nestjs/common';
import { UsersRepo } from 'src/domain/repos/users.repo';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private usersRepo: UsersRepo){}

  async create(user: Pick<User, 'username' | 'name' | 'password'>) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return this.usersRepo.create({
      ...user,
      password: hashedPassword
    });
  }

  async findAll() {
    return this.usersRepo.findAll();
  }

  async findById(userId: string) {
    return this.usersRepo.findById(userId);
  }

  async findByUsername(username: string) {
    return this.usersRepo.findByUsername(username);
  }

  async update(userId: string, user: Partial<User>) {
    if (user.password) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      user.password = hashedPassword;
      user.refreshToken = null;
    }
    return this.usersRepo.update(userId, user);
  }

  async delete(userId: string) {
    return this.usersRepo.delete(userId);
  }
}

import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  id: string;

  username: string;
  
  name: string;

  @Exclude()
  password: string;

  @Exclude()
  refreshToken: string;
  
  createdAt: Date;

  updatedAt: Date;
}
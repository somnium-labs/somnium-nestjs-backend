import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User } from './user.schema';
import { OAuthProvider } from '../oauth/oauth.enum';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async findById(id: string) {
    return this.userModel.findById(id);
  }

  async findByProviderAndUserId(provider: OAuthProvider, userId: string) {
    return this.userModel.findOne({ provider, userId });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async update(id: string, user: Partial<User>) {
    return this.userModel.findByIdAndUpdate(id, user);
  }
}

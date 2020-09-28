import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User } from '../schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  public async addUser(user) {
    const addedUser = new this.userModel(user);
    return addedUser.save();
  }
  public async find() {
    const data = this.userModel.find().exec();
    return data;
  }
  public async deleteUser(id: string) {
    const deletedUser = await this.userModel.deleteOne({ _id: id });
    const data = await this.userModel.find().exec();
    return data;
  }
}

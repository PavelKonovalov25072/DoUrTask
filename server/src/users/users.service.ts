import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { Task } from 'src/tasks/tasks.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel('user') private readonly userModel: Model<User>,
    @InjectModel('task') private  taskModel: Model<Task>) {}
  async createUser(email: string, password: string) {
    const newUser = new this.userModel({
      email,
      password,
    });
    await newUser.save();
    return newUser;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({email});
    return user;
  }

  async getUser(userId: string): Promise<object | null> {
    let user = await this.userModel.findOne({ _id: userId });

    if (!user) { throw new NotFoundException("user not found")};

    let tasks = await this.taskModel.find({userId: user.id}).exec();

    return {
        "user id": user.id,
        "tasks": tasks
    }
}
}
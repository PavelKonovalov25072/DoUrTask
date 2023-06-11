import { Injectable } from '@nestjs/common';
import { Task } from './tasks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User } from 'src/users/users.schema';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel('user') private readonly userModel: Model<User>,
        @InjectModel('task') private  taskModel: Model<Task>) {}
      async create(title: string, body: string, date: Date, userId: string) {
        const newTask = new this.taskModel({
          title,
          body,
          date,
          userId
        });
        await newTask.save();
        return newTask;
      }

      async getAll(userId: string): Promise<Task[]> {
        return await this.taskModel.find({userId: userId}).exec();
      }

      async getByID(id: string): Promise<Task> {
        return await this.taskModel.findById(id).exec();
      }

      async update(id: ObjectId, title: string, body: string, date: Date, done: Boolean) {
        return await this.taskModel.updateOne({_id: id,}, {
          title: title,
          body: body,
          date: date,
          isItDone: done
        });
      }

      async delete(id: ObjectId) {
        return await this.taskModel.deleteOne({ _id: id });
      }
}

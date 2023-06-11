import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.schema';
import { TaskSchema } from './tasks.schema';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
  MongooseModule.forFeature([{ name: "task", schema: TaskSchema }])
],
  providers: [TasksService, UsersService],
  controllers: [TasksController]
})
export class TasksModule {}

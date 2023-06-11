import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { User } from 'src/users/users.schema';
import { TasksService } from './tasks.service';
import { Task } from './tasks.schema';
import { UserGuard } from 'src/users/users.guard';
import { ObjectId } from 'mongoose';
import { query } from 'express';

@Controller('/tasks')
export class TasksController {
    constructor (private readonly service: TasksService) {};

    @UseGuards(UserGuard)
    @Post()
    createTask(@Body('title') title: string, @Body('body') body: string, @Body('date') date: Date, @Req() req){
        return this.service.create(title, body, date, req.id);
    }

    @UseGuards(UserGuard)
    @Get()
    async getTasks(@Req() req, @Query('id') id: string) {
      if(id == undefined){
        return this.service.getAll(req.id);
      }
      return this.service.getByID(id);
    }

    @UseGuards(UserGuard)
    @Put()
    async update(@Query('id') id: ObjectId, @Body('title') title: string, @Body('body') body: string, @Body('date') date: Date, @Body('done') done: Boolean) {
      return this.service.update(id, title, body, date, done);
    }
  
    @UseGuards(UserGuard)
    @Delete()
    async delete(@Query('id') id: ObjectId) {
      return this.service.delete(id);
    }
}

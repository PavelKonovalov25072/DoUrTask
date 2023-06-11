import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserGuard } from './users.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(UserGuard)
  @Get('/me')
  async me(@Req() req) {
    return this.usersService.getUser(req.id);
  }
}
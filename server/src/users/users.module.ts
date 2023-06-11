import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from "./users.schema";
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { TasksModule } from 'src/tasks/tasks.module';
import { TaskSchema } from 'src/tasks/tasks.schema';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [UsersService, JwtService],
  controllers: [UsersController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }), 
    MongooseModule.forFeature([{ name: "user", schema: UserSchema }]),
    MongooseModule.forFeature([{ name: "task", schema: TaskSchema }]),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    TasksModule],
  exports: [UsersService]
})
export class UsersModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }), 
  MongooseModule.forRoot(process.env.MONGO_URI),
  UsersModule,
  AuthModule,
  TasksModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

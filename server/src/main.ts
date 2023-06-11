import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';


async function bootstrap() {
  const PORT = process.env.PORT || 5000
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(PORT, () => console.log(`Server started at port = ${PORT}`));
}
bootstrap();


import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieSession from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      secret: 'keyboard cat',
    }),
  );
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.HOST_CLIENT,
    credentials: true,
  });
  app.use(
    cookieSession({
      name: 'session',
      keys: ['secret-key'],
      maxAge: 24 * 60 * 60 * 1000,
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(Number(process.env.PORT));
}
bootstrap();

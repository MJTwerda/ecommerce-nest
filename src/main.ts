import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades adicionales automáticamente
    forbidNonWhitelisted: true, // Lanza un error si hay propiedades adicionales
  }));
  await app.listen(3000);
}
bootstrap();

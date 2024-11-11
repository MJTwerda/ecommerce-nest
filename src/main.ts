import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Elimina propiedades adicionales automáticamente
    forbidNonWhitelisted: true, // Lanza un error si hay propiedades adicionales
    // exceptionFactory(errors) {
    //   const customErrors = errors.map(error => {
    //     console.log({ error });
    //     return {
    //       property: error.property,
    //       constraints: error.constraints,
    //     }
    //   });
    //   return new BadRequestException({
    //     message: 'Se han detectado los siguientes errores. Mensaje personalizado',
    //     errors: customErrors
    //   })
    // },
  }));
  await app.listen(3000);
}
bootstrap();

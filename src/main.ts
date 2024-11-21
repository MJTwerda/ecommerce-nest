import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './commons/interceptors/customInterceptorResponse';
import { AllExceptionsFilter } from './commons/errorHandlers/allExceptionsFilter';
import { auth } from 'express-openid-connect';
import { config as auth0Config } from './config/auth0.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(auth(auth0Config)); // TODO: Para implementación de Auth0
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
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen(3000);
}
bootstrap();

import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './commons/interceptors/customInterceptorResponse';
import { AllExceptionsFilter } from './commons/errorHandlers/allExceptionsFilter';

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
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen(3000);
}
bootstrap();

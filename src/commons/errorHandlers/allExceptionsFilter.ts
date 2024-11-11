import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // Captura todas las excepciones
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Si la excepción es una instancia de HttpException, maneja el error con sus detalles
    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const excepResponse = exception instanceof HttpException ? exception.getResponse() : null;

    // Inicializa `error` y `messages` para asegurar el formato consistente
    let error = 'Internal Server Error';
    let messages: string[] = [];

    if (exception instanceof HttpException) {
      // Caso para HttpException
      error = exception.message;
      if (typeof excepResponse === 'string') {
        messages = [excepResponse];
      } else if (typeof excepResponse === 'object' && excepResponse !== null) {
        const excepObj = excepResponse as any;
        error = excepObj.error || error;
        messages = Array.isArray(excepObj.message) ? excepObj.message : [excepObj.message];
      }
    } else {
      // Caso para excepciones no controladas
      messages = [exception instanceof Error ? exception.message : 'An unknown error occurred'];
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(), //TODO: Se muestra con 3 hs de diferencia
      // path: request.url,
      error,
      messages,
    });
  }
}

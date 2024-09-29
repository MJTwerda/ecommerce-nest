import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }

    // Verificar que comience con "Basic"
    if (!authHeader.startsWith('Basic ')) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    if (authHeader) {
      const [email, password] = authHeader.split(':'); // Divide por el carácter ':'
      // Aquí puedes agregar la lógica para autenticar al usuario
      if (!email || !password) {
        throw new UnauthorizedException('Invalid authorization header content');
      }

      return true;
    };

    return false;

    // Extraer y validar el formato "email:password"
    // const base64Credentials = authHeader.split(' ')[1];
    // const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    // const [email, password] = credentials.split(':');

    // if (!email || !password) {
    //   throw new UnauthorizedException('Invalid authorization header content');
    // }

    // Aquí puedes implementar validaciones adicionales para el formato del email o la longitud de la password, si lo necesitas.

    // Adjuntar los valores de email y password al request para futuros usos
    // request.userCredentials = { email, password };

    // return true;
  };

};
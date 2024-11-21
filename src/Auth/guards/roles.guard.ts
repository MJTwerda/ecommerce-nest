import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AvailableRoles } from '../interfaces/roles.enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {};
  
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<AvailableRoles[]>(
      'roles', 
      [ 
        context.getHandler(),
        context.getClass(),
      ]
    );
    
    const { user } = context.switchToHttp().getRequest();
    
    const hasRoles = () =>
      requireRoles.some(role => user?.roles?.includes(role));
    
    const isValid = user && user.roles && hasRoles();

    if (!isValid) {
      throw new ForbiddenException({ error: "Invalid roles", message: "Permisos incorrectos." })
    };

    return true;
  }
} 
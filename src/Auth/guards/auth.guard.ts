import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AvailableRoles } from '../interfaces/roles.enums';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly jwtService: JwtService,
  ) { };

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization']?.split(' ')[1] || ''; // Bearer <token>

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    
    try {
      const secret = process.env.JWT_SECRET;
      const payload = await this.jwtService.verifyAsync(authHeader, { secret });
      payload.roles = [AvailableRoles.USER];

      request['user'] = payload;
      return true;

    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
};
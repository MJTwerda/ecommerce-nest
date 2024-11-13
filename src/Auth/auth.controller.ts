import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDto } from './dtos/auth-login-dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService) {};

  @Post('login')
  async login(
    @Body() loginCredentials: AuthLoginDto,
  ) {
    const user_found = await this.authService.login(loginCredentials);
    return { user_found }
  }
}
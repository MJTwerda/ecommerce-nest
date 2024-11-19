import { BadRequestException, Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthLoginDto } from './dtos/auth-login-dto';
import { AuthService } from './auth.service';
import { BaseUserDto } from "src/Users/dtos/base-user-dto";
import { UserCredentialsDto } from "src/Users/dtos/user-credentials.dto";

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService) {};

  @Post('login')
  async login(
    @Body() loginCredentials: AuthLoginDto,
  ) {
    const user_found = await this.authService.login(loginCredentials);
    return { user_found }
  };

  @Post('sign-up')
  @UsePipes(ValidationPipe)
  async signUp(
    @Body() newUser: BaseUserDto
  ) {
    const sign_up_user_id = await this.authService.signUp(newUser);
    return { sign_up_user_id };
  };

  @Post('sign-in')
  @UsePipes(ValidationPipe)
  async signIn(
    @Body() userCredentials: UserCredentialsDto
  ) {
    const access_token = await this.authService.signIn(
      userCredentials.email, 
      userCredentials.password
    );
    if (!access_token) {
      throw new BadRequestException({ error: "Invalid credentials", message: "Credenciales incorrectas" });
    }
    return { access_token };
  }
}
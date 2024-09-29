import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthLoginDto } from './dtos/auth-login-dto';
import { AuthService } from './auth.service';
import { Response } from "express";
import { INVALID_CREDENTIALS } from "./resources/validation-resources";

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService) {};

  @Post('login')
  login(
    @Body() loginCredentials: AuthLoginDto,
    @Res() response: Response 
  ) {
    const founded_user = this.authService.login(loginCredentials);

    if (!founded_user) {
      return response.status(400).send({ 
        error: "Bad Request", 
        message: [ INVALID_CREDENTIALS ] 
      });
    };

    return response.status(200).send(founded_user);
  }
}
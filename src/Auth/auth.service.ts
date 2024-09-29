import { Injectable } from "@nestjs/common";
import { CompleteUserDto } from "src/Users/dtos/complete-user-dto";
import { UsersService } from "src/Users/users.service";
import { AuthLoginDto } from "./dtos/auth-login-dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService
  ) {};

  login(loginCredentials: AuthLoginDto): Omit<CompleteUserDto, 'password'> | undefined {
    return this.usersService.findUserByCredentials(loginCredentials);
  }
}
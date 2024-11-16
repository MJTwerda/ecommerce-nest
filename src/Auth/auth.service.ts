import { Injectable } from "@nestjs/common";
import { CompleteUserDto } from "src/Users/dtos/complete-user-dto";
import { UsersService } from "src/Users/users.service";
import { AuthLoginDto } from "./dtos/auth-login-dto";
import * as bcrypt from 'bcrypt';
import { BaseUserDto } from "src/Users/dtos/base-user-dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
  ) {};

  async login(loginCredentials: AuthLoginDto): Promise<Omit<CompleteUserDto, 'password'> | undefined> {
    return await this.usersService.findUserByCredentials(loginCredentials);
  }

  async signUp(
    userDto: BaseUserDto
  ): Promise<boolean | string> {
    const user = await this.usersService.getUserByEmail(userDto.email);

    // if (user) throw new BadRequestException('An error has ocurred. Failed to sign up correctly.');
    if (user) return false;

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    if (!hashedPassword) return false;

    return await this.usersService.createNewUser({...userDto, password: hashedPassword})
  };

  async signIn(email: string, password: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) return false;

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return false;

    return user.id;
  };
}
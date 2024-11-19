import { BadRequestException, Injectable } from "@nestjs/common";
import { CompleteUserDto } from "src/Users/dtos/complete-user-dto";
import { UsersService } from "src/Users/users.service";
import { AuthLoginDto } from "./dtos/auth-login-dto";
import * as bcrypt from 'bcrypt';
import { BaseUserDto } from "src/Users/dtos/base-user-dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {};

  async login(loginCredentials: AuthLoginDto): Promise<Omit<CompleteUserDto, 'password' | 'validity_password'> | undefined> {
    return await this.usersService.findUserByCredentials(loginCredentials);
  }

  async signUp(
    userDto: BaseUserDto
  ): Promise<boolean | string> {
    const user = await this.usersService.getUserByEmail(userDto.email);

    // if (user) throw new BadRequestException('An error has ocurred. Failed to sign up correctly.');
    if (user) {
      throw new BadRequestException(
        { error: "An error has ocurred", message: "Error al registrar un usuario" } //TODO: Mejorar
      )
    };

    if (userDto.password !== userDto.validity_password) {
      throw new BadRequestException(
        { error: "Invalid passwords", message: "Las contraseñas no coinciden" } //TODO: Mejorar
      )
    };

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    if (!hashedPassword) return false;

    return await this.usersService.createNewUser({...userDto, password: hashedPassword})
  };

  async signIn(email: string, password: string): Promise<string | false> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new BadRequestException({ error: "Invalid credentials", message: "Credenciales incorrectas" })
    };

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException({ error: "Invalid credentials", message: "Credenciales incorrectas" })
    };

    const user_payload = { email: user.email, id: user.id, sub: user.id };

    const token = this.jwtService.sign(user_payload);

    return token;
  };
}
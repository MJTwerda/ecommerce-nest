import { Injectable } from "@nestjs/common";
import { CommonQueryDto } from "src/commons/dtos/common-query-dto";
import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
import { BaseUserDto } from "./dtos/base-user-dto";
import { UsersRepository } from "./users.repository";
import { CompleteUserDto } from './dtos/complete-user-dto';
import { AuthLoginDto } from "src/Auth/dtos/auth-login-dto";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {};

  async createNewUser(user: BaseUserDto): Promise<string> {
    return await this.usersRepository.createNewUser(user);
  };

  async getUsersList(query: CommonQueryDto): Promise<CommonPaginatedResponse<Omit<CompleteUserDto, 'password'>>> {
    return await this.usersRepository.getUsersList(query);
  };
  
  async getUserById(userId: string): Promise<Omit<CompleteUserDto, 'password'> | null> {
    return await this.usersRepository.getUserById(userId);
  };

  async updateUserInfo(updatedUser: CompleteUserDto): Promise<string | null> {
    return await this.usersRepository.updateUserInfo(updatedUser);
  };

  async deleteUserById(userId: string): Promise<string | null> {
    return await this.usersRepository.deleteUserById(userId);
  };

  async findUserByCredentials(loginCredentials: AuthLoginDto): Promise<Omit<CompleteUserDto, 'password'> | undefined> {
    return await this.usersRepository.findUserByCredentials(loginCredentials);
  }
};
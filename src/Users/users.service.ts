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

  getUsersList(query: CommonQueryDto): CommonPaginatedResponse<Omit<CompleteUserDto, 'password'>> {
    return this.usersRepository.getUsersList(query);
  };
  
  getUserById(userId: number): Omit<CompleteUserDto, 'password'> | undefined {
    return this.usersRepository.getUserById(userId);
  };

  createNewUser(user: BaseUserDto): number {
    return this.usersRepository.createNewUser(user);
  };

  updateUserInfo(updatedUser: CompleteUserDto): number | undefined {
    return this.usersRepository.updateUserInfo(updatedUser);
  };

  deleteUserById(userId: number): number | undefined {
    return this.usersRepository.deleteUserById(userId);
  };

  findUserByCredentials(loginCredentials: AuthLoginDto): Omit<CompleteUserDto, 'password'> | undefined {
    return this.usersRepository.findUserByCredentials(loginCredentials);
  }
};
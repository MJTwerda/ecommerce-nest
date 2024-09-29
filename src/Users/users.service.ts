import { Injectable } from "@nestjs/common";
import { CommonQueryDto } from "src/commons/dtos/common-query-dto";
import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
import { BaseUserDto } from "./dtos/base-user-dto";
import { User } from "./interfaces/users.interfaces";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository
  ) {};

  getUsersList(query: CommonQueryDto): CommonPaginatedResponse<Omit<User, 'password'>> {
    return this.usersRepository.getUsersList(query);
  };
  
  getUserById(userId: number): Omit<User, 'password'> | undefined {
    return this.usersRepository.getUserById(userId);
  };

  createNewUser(user: BaseUserDto): number {
    return this.usersRepository.createNewUser(user);
  };

  updateUserInfo(updatedUser: User): number | undefined {
    return this.usersRepository.updateUserInfo(updatedUser);
  };

  deleteUserById(userId: number): number | undefined {
    return this.usersRepository.deleteUserById(userId);
  };
};
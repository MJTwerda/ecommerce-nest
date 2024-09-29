import { Injectable } from "@nestjs/common";
import { User } from "./interfaces/users.interfaces";
import { BaseRepository } from '../commons/repositories/base-repository';
import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
import { CommonQueryDto } from "src/commons/dtos/common-query-dto";
import { BaseUserDto } from "./dtos/base-user-dto";
import { UpdateUserDto } from "./dtos/update-user-dto";

const MOCK_USERS: Array<UpdateUserDto> = [
  {
    id: 1,
    email: 'pZjvO@example.com',
    name: 'John Doe',
    password: '12345678',
    address: '123 Main St',
    phone: '123-456-7890',
    country: 'USA',
    city: 'New York',
  },
  {
    id: 2,
    email: 'IbQpC@example.com',
    name: 'Jane Dummy',
    password: '87654321',
    address: '456 Main St',
    phone: '123-456-7890',
    country: undefined,
    city: undefined
  }
]

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor() {
    super();
  };

  getUsersList(query: CommonQueryDto): CommonPaginatedResponse<Omit<User, 'password'>> { 
    const page = Number(query.page) || 1; // Valor por defecto de 1 si query.page es undefined o NaN
    const limit = Number(query.limit) || 5;

    const usersListPaginated = this.paginate( 
      MOCK_USERS, 
      page,
      limit
    );

    const userListWhitoutPassword = usersListPaginated.items.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword
    })

    return {
      ...usersListPaginated,
      items: userListWhitoutPassword
    }
  };

  getUserById(userId: number): Omit<User, 'password'> | undefined {
    const foundedUser = MOCK_USERS.find(user => user.id === userId);

    if (!foundedUser) {
      return undefined;
    }
  
    const { password, ...userWithoutPassword } = foundedUser;
    return userWithoutPassword;
  };

  createNewUser(user: BaseUserDto): number {
    const newUser = {...user, id: MOCK_USERS.length + 1};
    MOCK_USERS.push(newUser);
    return newUser.id;
  };

  updateUserInfo(updatedUser: User): number | undefined {
    const foundedUser = MOCK_USERS.find(user => user.id === updatedUser.id);
    
    if (!foundedUser) {
      return undefined;
    }

    Object.assign(foundedUser, updatedUser);
    return updatedUser.id
  };

  deleteUserById(userId: number): number | undefined {
    const index = MOCK_USERS.findIndex(user => user.id === userId);
  
    if (index === -1) {
      return undefined; // Usuario no encontrado
    }
  
    MOCK_USERS.splice(index, 1); // Se elimina el usuario en la posición 'index'
    return userId; 
  };
};
import { Injectable } from "@nestjs/common";
import { BaseRepository } from '../commons/repositories/base-repository';
import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
import { CommonQueryDto } from "src/commons/dtos/common-query-dto";
import { BaseUserDto } from "./dtos/base-user-dto";
import { CompleteUserDto } from "./dtos/complete-user-dto";
import { AuthLoginDto } from "src/Auth/dtos/auth-login-dto";
import { UsersEntity } from "./users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UsersRepository extends BaseRepository<UsersEntity> {
  constructor(
    @InjectRepository(UsersEntity) private readonly usersRepository: Repository<UsersEntity>,
    dataSource: DataSource
  ) {
    super(usersRepository.target, dataSource.createEntityManager());
  };
  
  async createNewUser(user: BaseUserDto): Promise<string> {
    const newUser = await this.usersRepository.save(user);
    return newUser.id;
  };

  async getUsersList(query: CommonQueryDto): Promise<CommonPaginatedResponse<Omit<CompleteUserDto, 'password'>>> { 
    const options = {}; // Puedes personalizar las opciones de la búsqueda aquí
    const page = Number(query.page) || 1; // Valor por defecto de 1 si query.page es undefined o NaN
    const limit = Number(query.limit) || 5;

    const usersListPaginated =  await this.paginate(options, page, limit);

    const userListWhitoutPassword = usersListPaginated.items.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword
    })

    return {
      ...usersListPaginated,
      items: userListWhitoutPassword
    }
  };

  // getUserById(userId: number): Omit<CompleteUserDto, 'password'> | undefined {
  //   const foundedUser = MOCK_USERS.find(user => user.id === userId);

  //   if (!foundedUser) {
  //     return undefined;
  //   }
  
  //   const { password, ...userWithoutPassword } = foundedUser;
  //   return userWithoutPassword;
  // };

  // updateUserInfo(updatedUser: CompleteUserDto): number | undefined {
  //   const foundedUser = MOCK_USERS.find(user => user.id === updatedUser.id);
    
  //   if (!foundedUser) {
  //     return undefined;
  //   }

  //   Object.assign(foundedUser, updatedUser);
  //   return updatedUser.id
  // };

  // deleteUserById(userId: number): number | undefined {
  //   const index = MOCK_USERS.findIndex(user => user.id === userId);
  
  //   if (index === -1) {
  //     return undefined; // Usuario no encontrado
  //   }
  
  //   MOCK_USERS.splice(index, 1); // Se elimina el usuario en la posición 'index'
  //   return userId; 
  // };

  // findUserByCredentials(loginCredentials: AuthLoginDto): Omit<CompleteUserDto, 'password'> | undefined {
  //   const foundedUser = MOCK_USERS.find(user => (
  //     user.email === loginCredentials.email && 
  //     user.password === loginCredentials.password
  //   ));

  //   if (!foundedUser) {
  //     return null;
  //   }

  //   const { password, ...userWithoutPassword } = foundedUser;
  //   return userWithoutPassword;
  // };
};

// ! Sin typeORM
// import { Injectable } from "@nestjs/common";
// import { BaseRepository } from '../commons/repositories/base-repository';
// import { CommonPaginatedResponse } from "src/commons/interfaces/common-query.interfaces";
// import { CommonQueryDto } from "src/commons/dtos/common-query-dto";
// import { BaseUserDto } from "./dtos/base-user-dto";
// import { CompleteUserDto } from "./dtos/complete-user-dto";
// import { AuthLoginDto } from "src/Auth/dtos/auth-login-dto";

// const MOCK_USERS: Array<CompleteUserDto> = [
//   {
//     id: 1,
//     email: 'pZjvO@example.com',
//     name: 'John Doe',
//     password: '12345678',
//     address: '123 Main St',
//     phone: '123-456-7890',
//     country: 'USA',
//     city: 'New York',
//   },
//   {
//     id: 2,
//     email: 'jane@example.com',
//     name: 'Jane Dummy',
//     password: '87654321',
//     address: '456 Main St',
//     phone: '123-456-7890',
//     country: undefined,
//     city: undefined
//   }
// ]

// @Injectable()
// export class UsersRepository extends BaseRepository<CompleteUserDto> {
//   constructor() {
//     super();
//   };

//   getUsersList(query: CommonQueryDto): CommonPaginatedResponse<Omit<CompleteUserDto, 'password'>> { 
//     const page = Number(query.page) || 1; // Valor por defecto de 1 si query.page es undefined o NaN
//     const limit = Number(query.limit) || 5;

//     const usersListPaginated = this.paginate( 
//       MOCK_USERS, 
//       page,
//       limit
//     );

//     const userListWhitoutPassword = usersListPaginated.items.map(user => {
//       const { password, ...userWithoutPassword } = user;
//       return userWithoutPassword
//     })

//     return {
//       ...usersListPaginated,
//       items: userListWhitoutPassword
//     }
//   };

//   getUserById(userId: number): Omit<CompleteUserDto, 'password'> | undefined {
//     const foundedUser = MOCK_USERS.find(user => user.id === userId);

//     if (!foundedUser) {
//       return undefined;
//     }
  
//     const { password, ...userWithoutPassword } = foundedUser;
//     return userWithoutPassword;
//   };

//   createNewUser(user: BaseUserDto): number {
//     const newUser = {...user, id: MOCK_USERS.length + 1};
//     MOCK_USERS.push(newUser);
//     return newUser.id;
//   };

//   updateUserInfo(updatedUser: CompleteUserDto): number | undefined {
//     const foundedUser = MOCK_USERS.find(user => user.id === updatedUser.id);
    
//     if (!foundedUser) {
//       return undefined;
//     }

//     Object.assign(foundedUser, updatedUser);
//     return updatedUser.id
//   };

//   deleteUserById(userId: number): number | undefined {
//     const index = MOCK_USERS.findIndex(user => user.id === userId);
  
//     if (index === -1) {
//       return undefined; // Usuario no encontrado
//     }
  
//     MOCK_USERS.splice(index, 1); // Se elimina el usuario en la posición 'index'
//     return userId; 
//   };

//   findUserByCredentials(loginCredentials: AuthLoginDto): Omit<CompleteUserDto, 'password'> | undefined {
//     const foundedUser = MOCK_USERS.find(user => (
//       user.email === loginCredentials.email && 
//       user.password === loginCredentials.password
//     ));

//     if (!foundedUser) {
//       return null;
//     }

//     const { password, ...userWithoutPassword } = foundedUser;
//     return userWithoutPassword;
//   };
// };
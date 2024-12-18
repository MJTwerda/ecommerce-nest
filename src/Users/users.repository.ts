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

  async getUsersList(query: CommonQueryDto): Promise<CommonPaginatedResponse<Omit<CompleteUserDto, 'password' | 'validity_password'>>> { 
    const options = {
      relations: [ 'orders' ]
    }; // Puedes personalizar las opciones de la búsqueda aquí
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

  async getUserById(userId: string): Promise<Omit<CompleteUserDto, 'password' | 'validity_password'> | null> {
    const founded_user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: [ 'orders' ]
    })

    if (!founded_user) {
      return null;
    };

    const { password, ...userWithoutPassword } = founded_user;
    return userWithoutPassword;
  };

  async getUserByEmail(email: string): Promise<CompleteUserDto | null> {
    const founded_user_dto = new CompleteUserDto();
    const founded_user = await this.usersRepository.findOne({
      where: { email }
    });
    
    if (!founded_user) {
      return null;
    };

    founded_user_dto.id = founded_user.id;
    founded_user_dto.email = founded_user.email;
    founded_user_dto.name = founded_user.name;
    founded_user_dto.address = founded_user.address;
    founded_user_dto.phone = founded_user.phone;
    founded_user_dto.country = founded_user.country;
    founded_user_dto.city = founded_user.city;
    founded_user_dto.password = founded_user.password;

    return founded_user_dto;
  }

  async updateUserInfo(updatedUser: CompleteUserDto): Promise<string | null> {
    const { password, ...updateData } = updatedUser; 

    // Actualización
    const result = await this.usersRepository.update(updatedUser.id, updateData);
    
    // Si 'affected' es 0, significa que no se encontró ningún usuario
    if (result.affected === 0) return null; 
    
    return updatedUser.id;
  };

  async deleteUserById(userId: string): Promise<string | null> {
    const foundedUser = await this.usersRepository.delete(userId);
    
    if (foundedUser.affected === 0) {
      return null;
    }

    return userId;
  };

  async findUserByCredentials(loginCredentials: AuthLoginDto): Promise<Omit<CompleteUserDto, 'password' | 'validity_password'> | undefined> {
    const foundedUser = await this.usersRepository.findOneBy({
      email: loginCredentials.email,
      password: loginCredentials.password
    })

    if (!foundedUser) {
      return null;
    }

    const { password, ...userWithoutPassword } = foundedUser;
    return userWithoutPassword;
  };
};
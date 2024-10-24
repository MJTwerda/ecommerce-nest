import { 
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe 
} from "@nestjs/common";
import { UsersService } from './users.service';
import { CommonQueryDto } from '../commons/dtos/common-query-dto';
import { Response } from "express";
import { BaseUserDto } from "./dtos/base-user-dto";
import { CompleteUserDto } from './dtos/complete-user-dto';
import { AuthGuard } from "src/Auth/guards/auth.guard";

@Controller('users')
export class UsersController { 
  constructor(
    private readonly usersService: UsersService
  ) {};

  @Post()
  @UsePipes(ValidationPipe)
  async createNewUser( 
    @Body() newUser: BaseUserDto, 
    @Res() response: Response
  ) {
    const new_user_id = await this.usersService.createNewUser(newUser);
    console.log({ new_user_id });

    if (!new_user_id) {
      return response.status(404).send(null);
    };

    return response.status(201).send({ new_user_id });
  };

  @Get()
  @UseGuards(AuthGuard)
  async getUsersList(
    @Query() query: CommonQueryDto,
    @Res() response: Response
  ) {
    const users_list = await this.usersService.getUsersList(query);
    return response.status(200).send(users_list);
  };

  @Get(':userId')
  @UseGuards(AuthGuard)
  async getUserById( 
    @Param('userId') userId: string, 
    @Res() response: Response
  ) {
    if (!userId) {
      return response.status(404).send(null);
    };

    const founded_user = await this.usersService.getUserById(userId);

    if (!founded_user) {
      return response.status(404).send(null); // TODO: Agregar respuesta
    };
    return response.status(200).send(founded_user);
  };

  @Put()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  async updateUser(
    @Body() updatedUser: CompleteUserDto, 
    @Res() response: Response
  ) {
    const updated_user_id = await this.usersService.updateUserInfo(updatedUser);

    if (!updated_user_id) {
      return response.status(404).send(null); // TODO: Agregar Respuesta
    };

    return response.status(200).send({ updated_user_id } );
  };

  @Delete(':userId')
  @UseGuards(AuthGuard)
  async deleteUserById(
    @Param('userId') userId, 
    @Res() response: Response 
  ) {
    if (!userId) {
      return response.status(400).send(null);
    };

    const deleted_user_id = await this.usersService.deleteUserById(userId);
    return response.status(201).send({ deleted_user_id });
  };
};
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

  @Get()
  @UseGuards(AuthGuard)
  getUsersList(
    @Query() query: CommonQueryDto,
    @Res() response: Response
  ) {
    const users_list = this.usersService.getUsersList(query);
    return response.status(200).send(users_list);
  };

  @Get(':userid')
  @UseGuards(AuthGuard)
  getUserById( 
    @Param('userId') userId: string, 
    @Res() response: Response
  ) {
    if (!userId) {
      return response.status(404).send(null);
    };

    const founded_user = this.usersService.getUserById(Number(userId));

    if (!founded_user) {
      return response.status(404).send(null);
    };
    return response.status(200).send(founded_user);
  };

  @Post()
  @UsePipes(ValidationPipe)
  createNewUser( 
    @Body() newUser: BaseUserDto, 
    @Res() response: Response
  ) {
    const new_user_id = this.usersService.createNewUser(newUser);

    if (!new_user_id) {
      return response.status(404).send(null);
    };

    return response.status(201).send({ new_user_id });
  };

  @Put()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  updateUser(
    @Body() updatedUser: CompleteUserDto, 
    @Res() response: Response
  ) {
    const updated_user_id = this.usersService.updateUserInfo(updatedUser);
    if (!updated_user_id) {
      return response.status(404).send(null);
    };

    return response.status(200).send({ updated_user_id } );
  };

  @Delete(':userId')
  @UseGuards(AuthGuard)
  @UsePipes(ParseIntPipe)
  deleteUserById(
    @Param('userId', ParseIntPipe) userId, 
    @Res() response: Response 
  ) {
    if (!userId) {
      return response.status(400).send(null);
    };

    const deleted_user_id = this.usersService.deleteUserById(userId);
    return response.status(201).send({ deleted_user_id });
  };
};
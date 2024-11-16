import { 
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseFilters,
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
import { AllExceptionsFilter } from "src/commons/errorHandlers/allExceptionsFilter";
import { HttpException } from '@nestjs/common';

@UseFilters(AllExceptionsFilter)
@Controller('users')
export class UsersController { 
  constructor(
    private readonly usersService: UsersService
  ) {};

  // @Post()
  // @UsePipes(ValidationPipe)
  // async createNewUser( 
  //   @Body() newUser: BaseUserDto, 
  // ) {
  //   const new_user_id = await this.usersService.createNewUser(newUser);
  //   return { new_user_id };
  // };

  @Get()
  @UseGuards(AuthGuard)
  async getUsersList(
    @Query() query: CommonQueryDto,
  ) {
    return await this.usersService.getUsersList(query);
  };

  @Get(':userId')
  @UseGuards(AuthGuard)
  async getUserById( 
    @Param('userId') userId: string, 
  ) {
    const user_found = await this.usersService.getUserById(userId);
    return { user_found };
  };

  @Put()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  async updateUser(
    @Body() updatedUser: CompleteUserDto, 
  ) {
    const user_id_updated = await this.usersService.updateUserInfo(updatedUser);
    return { user_id_updated };
  };

  @Delete(':userId')
  @UseGuards(AuthGuard)
  async deleteUserById(
    @Param('userId') userId: string, 
  ) {
    const user_id_deleted = await this.usersService.deleteUserById(userId);
    return { user_id_deleted };
  };
};
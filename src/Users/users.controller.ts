import { 
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe 
} from "@nestjs/common";
import { UsersService } from './users.service';
import { CommonQueryDto } from '../commons/dtos/common-query-dto';
import { CompleteUserDto } from './dtos/complete-user-dto';
import { AuthGuard } from "src/Auth/guards/auth.guard";
import { Roles } from "src/Auth/decorators/roles.decorator";
import { AvailableRoles } from "src/Auth/interfaces/roles.enums";
import { RolesGuard } from "src/Auth/guards/roles.guard";
import { Request } from "express";

// @UseFilters(AllExceptionsFilter)
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController { 
  constructor(
    private readonly usersService: UsersService
  ) {};

  // TODO: Para implementación de Auth0
  @Get('auth0/protected')
  getAuth0Protected(
    @Req() request: Request
  ) {
    console.log('auth0 PROTECTED!!!! ', request.oidc)
    return JSON.stringify(request.oidc.user)
  }

  @Get()
  // @UseGuards(AuthGuard)
  async getUsersList(
    @Query() query: CommonQueryDto,
  ) {
    return await this.usersService.getUsersList(query);
  };

  @Get(':userId')
  // @UseGuards(AuthGuard)
  async getUserById( 
    @Param('userId') userId: string, 
  ) {
    const user_found = await this.usersService.getUserById(userId);
    return { user_found };
  };

  @Put()
  // @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ forbidUnknownValues: true }))
  async updateUser(
    @Body() updatedUser: CompleteUserDto, 
  ) {
    const user_id_updated = await this.usersService.updateUserInfo(updatedUser);
    return { user_id_updated };
  };

  @Delete(':userId')
  @Roles(AvailableRoles.ADMIN)
  @UseGuards(RolesGuard)
  async deleteUserById(
    @Param('userId') userId: string, 
  ) {
    const user_id_deleted = await this.usersService.deleteUserById(userId);
    return { user_id_deleted };
  };
};
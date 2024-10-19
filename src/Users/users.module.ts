import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersController } from './users.controller';
import { UsersEntity } from "./users.entity";
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [ TypeOrmModule.forFeature([ UsersEntity ]) ],
  controllers: [ UsersController ],
  providers: [ UsersRepository, UsersService ], 
  exports: [ UsersService ]
})

export class UsersModule { };
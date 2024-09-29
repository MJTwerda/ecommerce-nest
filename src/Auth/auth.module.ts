import { Module } from "@nestjs/common";

import { AuthController } from "./auth.controller";
import { AuthRepository } from "./auth.repository";
import { AuthService } from "./auth.service";

import { UsersModule } from "src/Users/users.module";

@Module({
  imports: [ UsersModule ],
  controllers: [ AuthController ],
  providers: [ AuthService, AuthRepository ]
}) 
export class AuthModule { };
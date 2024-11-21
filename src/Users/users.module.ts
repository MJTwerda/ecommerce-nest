import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { requiresAuth } from "express-openid-connect";
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

export class UsersModule implements NestModule{ 
  // TODO: Para implementación de Auth0.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(requiresAuth()).forRoutes('users/auth0/protected')
  }
};
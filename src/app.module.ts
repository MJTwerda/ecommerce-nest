import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './Auth/auth.module';
import { ProductsModule } from './Products/products.module';
import { UsersModule } from './Users/users.module';

import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ typeOrmConfig ],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ ConfigService ],
      useFactory: (configService: ConfigService) => configService.get('typeorm'),
    }),
    AuthModule, 
    ProductsModule, 
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

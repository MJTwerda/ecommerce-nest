import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './Auth/auth.module';
import { ProductsModule } from './Products/products.module';
import { UsersModule } from './Users/users.module';

import typeOrmConfig from './config/typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersModule } from './Orders/orders.module';
import { OrdersDetailsModule } from './OrderDetails/ordersDetails.module';
import { CategoriesModule } from './Categories/categories.module';

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
    CategoriesModule,
    OrdersModule,
    OrdersDetailsModule,
    ProductsModule, 
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

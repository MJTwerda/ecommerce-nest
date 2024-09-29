import { Module } from '@nestjs/common';

import { AuthModule } from './Auth/auth.module';
import { ProductsModule } from './Products/products.module';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [ AuthModule, ProductsModule, UsersModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}

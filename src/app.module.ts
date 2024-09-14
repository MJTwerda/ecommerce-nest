import { Module } from '@nestjs/common';
import { ProductsModule } from './Products/products.module';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [ ProductsModule, UsersModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}

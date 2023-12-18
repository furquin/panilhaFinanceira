import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CategoryModule } from "./modules/category/category.module";
import { ExpensesModule } from "./modules/expenses/expenses.module";
import { UsersModule } from "./modules/users/users.module";

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true }), ExpensesModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

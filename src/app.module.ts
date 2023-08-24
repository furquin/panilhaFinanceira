import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { ExpensesModule } from "./expenses/expenses.module";
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [UsersModule, ConfigModule.forRoot({ isGlobal: true }), ExpensesModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

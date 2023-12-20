import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/category/category.module';
import { UsersModule } from './modules/users/users.module';
import { MovementModule } from './modules/movement/movement.module';
import { AuthModule } from './modules/auth/auth.module';
import { ACLModule } from './services/acl/acl.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './database/prisma.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './services/exception/handle-exception.catch';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    CategoryModule,
    MovementModule,
    AuthModule,
    ACLModule,
    JwtModule.register({ global: true }),
    PrismaModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}

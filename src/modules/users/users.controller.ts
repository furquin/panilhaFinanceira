import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { GuardRoute } from '../auth/auth.guard';
import { ApiBadRequestResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserPresenter } from './presenter/user.presenter';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @GuardRoute('user.create')
  create(@Body() createUserDto: CreateUserDto): Promise<UserPresenter> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @GuardRoute('user.read')
  findAll(): Promise<UserPresenter[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserPresenter> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<string> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.usersService.remove(+id);
  }
}

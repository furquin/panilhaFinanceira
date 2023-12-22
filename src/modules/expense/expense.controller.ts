import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Auth, GuardRoute } from '../auth/auth.guard';
import { AuthPresenter } from '../auth/presenter/auth.presenter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('expense')
@ApiTags('expense')
@ApiBearerAuth()

export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  @GuardRoute('expense.create')
  create(@Auth() auth: AuthPresenter, @Body() createExpenseDto: CreateExpenseDto) {
    return this.expenseService.create(auth, createExpenseDto);
  }

  @Get()
  @GuardRoute('expense.read')
  findAll(@Auth() auth: AuthPresenter) {
    return this.expenseService.findAll(auth);
  }

  @Get(':id')
  @GuardRoute('expense.read')
  findOne(@Auth() auth: AuthPresenter, @Param('id') id: string) {
    return this.expenseService.findOne(auth, +id);
  }

  @Patch(':id')
  @GuardRoute('expense.update')
  update(@Auth() auth: AuthPresenter, @Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.update(auth, +id, updateExpenseDto);
  }

  @Delete(':id')
  @GuardRoute('expense.delete')
  remove(@Auth() auth: AuthPresenter, @Param('id') id: string) {
    return this.expenseService.remove(auth, +id);
  }
}

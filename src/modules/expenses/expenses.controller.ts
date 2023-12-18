import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpensesService } from './expenses.service';
import { IFindExpense } from './interface/expense.interface';
import { IFiltersExpense } from './interface/filters-expense.interface';

@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly expensesService: ExpensesService
  ) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto): Promise<[{id: number, name: string, price: Decimal}]> {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  findAll(@Query() filters: IFiltersExpense): Promise<IFindExpense[]> {
    return this.expensesService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}

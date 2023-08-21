import { Injectable } from '@nestjs/common'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'
import { PrismaService } from '../database/prismaService'

@Injectable()
export class ExpensesService {
	constructor(private readonly prismaService: PrismaService,) {
   
  }
	async create(createExpenseDto: CreateExpenseDto) {
		for (let i = 0; i < createExpenseDto.recurrence; i += 1) {
			await this.prismaService.expenses.create({data: createExpenseDto})
		}
	}

	async findAll() {
		return await this.prismaService.expenses.findMany(
			{include: {user: true}}
		)
	}

	findOne(id: number) {
		return `This action returns a #${id} expense`
	}

	update(id: number, updateExpenseDto: UpdateExpenseDto) {
		return `This action updates a #${id} expense with ${updateExpenseDto}`
	}

	remove(id: number) {
		return `This action removes a #${id} expense`
	}
}

import { Injectable } from '@nestjs/common'
import { Decimal } from '@prisma/client/runtime/library'
import * as dayjs from 'dayjs'
import { PrismaService } from '../../database/prismaService'
import { CreateExpenseDto } from './dto/create-expense.dto'
import { UpdateExpenseDto } from './dto/update-expense.dto'
import { IFindExpense } from './interface/expense.interface'
import { IFiltersExpense } from './interface/filters-expense.interface'

@Injectable()
export class ExpensesService {
	constructor(private readonly prismaService: PrismaService,) {
   
  }
	async create(createExpenseDto: CreateExpenseDto): Promise<[{id:number, name: string, price: Decimal}]> {
		const expenses = []
		let monthId:number = createExpenseDto?.monthId ?? Number(dayjs().format('MM'))
		for (let i = 1; i <= createExpenseDto?.recurrences ?? 1; i += 1) {
			const { id, name, price} = await this.prismaService.expenses.create({data: { monthId, currentRecurrence:i, ...createExpenseDto}})
			monthId += 1
			expenses.push({ id, name, price})
		}
		return expenses as [{id:number, name: string, price: Decimal}]
	}

	async findAll(filters: IFiltersExpense): Promise<IFindExpense[]> {

		const options = {}

		if(filters.userId) options['userId'] = Number(filters.userId)
		if(filters.monthId) options['monthId'] = Number(filters.monthId)
		if(filters.categoryId) options['categoryId'] = Number(filters.categoryId)
		if(filters.name) options['name'] = { startsWith:filters.name, mode:'insensitive' }
		options['createdAt'] = {gte:dayjs(filters.de).startOf('day'), lte:dayjs(filters.ate).endOf('day')}
		
		return await this.prismaService.expenses.findMany({
			where: { ...options},
			include: {
				category: {	select: { id: true, name: true }},
				month: { select: { id:true, name: true }},
				user: { select: { id:true, name: true }}
		}})
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
